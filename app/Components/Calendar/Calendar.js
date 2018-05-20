import React, { Component } from 'react'
import styles from './Calendar.css'
const http = require('http')

window.date = []
let date
let input = ''

const MONTHS = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
}

class Calendar extends Component {
  constructor(props) {
    super(props)
    date = new Date()

    if (window.date.length === 0) {
      window.date.push(date.getDate())
      window.date.push(date.getMonth())
      window.date.push(date.getFullYear())
    }

    this.state = {
      days: [],
      day: 0,
      month: '',
      year: 0,
      events: [],
      diaryCal: window.diaryCal
    }
  }

  componentDidMount() {
    this.changeMonth(0)
    input = window.date[0]
    this.displayCal()
  }

  setEvents(events) {
    let eventsToAdd = []
    let items = events.items

    for (let i = 0; i < items.length; i++) {
      let thisEvent = items[i]

      switch (thisEvent.type) {
        case 'school':     eventsToAdd.push((thisEvent['subject'] != '' ? thisEvent['subject'] + ': ' : '') + thisEvent['title']); break
        case 'assessment': eventsToAdd.push('(Assessment) ' + thisEvent['assessment']); break
        case 'moodle':     eventsToAdd.push('(Moodle) ' + (thisEvent['subject'] != '' ? thisEvent['subject'] + ': ' : '') + thisEvent['title']); break
        case 'personal':   eventsToAdd.push('(Personal) ' + thisEvent['title']); break
        default: break
      }
    }
  
    this.state.events = eventsToAdd
  }

  highlightSelectedDay(newDay) {
    let days = this.state.days
    window.date[0] = parseInt(newDay)
    let select = document.getElementById(newDay)

    for (let i = 0; i < days.length; i++) {
      if (days[i] == newDay) {
        select.className = 'active'  
      } else {
        select.className = ''
      }
    }

    let day = this.state.day
    this.setState({ day: window.date[0] })
  }

  changeYear(dir) {
    if (dir === 1) {
      window.date[2]++
    } else if (dir === -1) {
      window.date[2]--
    }

    let year = this.state.year
    this.setState({ year: window.date[2] })

    this.fillDates(date)

    if (dir !== 0) {
      this.getData()
    }
  }

  changeMonth(dir) {
    if (dir === 1) {
      if (window.date[1] == 11) {
        window.date[1] = 0
        window.date[2]++
      } else {
        window.date[1]++
      }
    } else if (dir === -1) {
      if (window.date[1] == 0) {
        window.date[1] = 11
        window.date[2]--
      } else {
        window.date[1]--
      }
    }

    let month = this.state.month
    this.setState({ month: MONTHS[window.date[1]] })
    let year = this.state.year
    this.setState({ year: window.date[2] })

    this.fillDates(date)

    if (dir !== 0) {
      this.getData()
    }
  }

  getData() {
    //data
    let promise1 = new Promise((resolve, reject) => {
      const YEAR = window.date[2]
      const MONTH = window.date[1] + 1

      let from = YEAR + '-' + (MONTH > 9 ? MONTH: '0' + MONTH) + '-01'
      let to = YEAR + '-' + (MONTH > 9 ? MONTH: '0' + MONTH) + '-' + (new Date(YEAR, MONTH, 0).getDate())

      const TOKEN = localStorage.getItem('accessToken')
      http.get('/getdata?token=' + TOKEN + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
        res.setEncoding('utf8')
        let data = ''
        res.on('data', (body) => {
          data += body
        })
        res.on('end', () => {
          resolve(JSON.parse(data))
        })
      })
    })

    promise1.then((result) => {
      this.state.diaryCal = result
    })

    let dayToSelect
    if (window.date[0] == undefined) {
      dayToSelect = 1
      if (window.date[1] == new Date().getMonth() && window.date[2] == new Date().getFullYear()) {
        dayToSelect = new Date().getDate()
      }
    } else {
      dayToSelect = window.date[0]
    }

    console.log(this.state.diaryCal)
    console.log(dayToSelect)
    this.setEvents(this.state.diaryCal[dayToSelect-1])
    this.highlightSelectedDay(dayToSelect)
  }

  fillDates(date) {
    let firstDay = new Date(window.date[2], window.date[1], 1).getDay()
    let prevLastDate
    if (window.date[1] == 0) {
      prevLastDate = new Date(window.date[2] - 1, 11, 0).getDate()
    } else {
      prevLastDate = new Date(window.date[2], window.date[1] - 1, 0).getDate()
    }

    let days = this.state.days
    let tempDays = []
    let monthLength = this.daysInMonth(window.date[1], window.date[2])
    for (let i = 0; i < firstDay; i++) {
      tempDays.push(prevLastDate - (firstDay - i))
    }
    for (let j = firstDay; j < firstDay + monthLength; j++) {
      tempDays.push(j-firstDay+1)
    }
    for (let k = firstDay + monthLength; k < 6 * 7; k++) {
      tempDays.push(k - firstDay - monthLength + 1)
    }

    this.setState({ days: tempDays })
  }

  daysInMonth(month, year) {
    let length = 0
    switch (month + 1) {
      // 28/29 days
      case 2: if (year % 4 == 0) { length = 29 } else { length = 28 }; break
        
      // 30 days
      case 4:
      case 6:
      case 9:
      case 11: length = 30; break
      
      // 31 days
      default: length = 31; break
    }

    return length
  }

  prevMonth() {
    this.changeMonth(-1)
  }

  nextMonth() {
    this.changeMonth(1)
  }

  prevYear() {
    this.changeYear(-1)
  }

  nextYear() {
    this.changeYear(1)
  }

  monthInput(e) {
    input = e.target.innerHTML
  }

  displayCal() {
    if (!isNaN(input)) {
      if (input != window.date[0]) {
        this.highlightSelectedDay(input)
        this.setEvents(this.state.diaryCal[input-1])
      }
    }
  }

  render() {
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
        <div className="uk-grid-collapse uk-grid two uk-grid-match" uk-grid='true'>
          <div  className='cal uk-card uk-card-default uk-animation-slide-top-small uk-width-expand'>
            <div>
              <p className="uk-float-left" onClick={this.prevYear.bind(this)}>{this.state.year-1}</p>
              <p className="uk-float-right" onClick={this.nextYear.bind(this)}>{this.state.year+1}</p>   
              <div className="month">
                <ul>
                  <li className="prev" onClick={this.prevMonth.bind(this)}>&#10094;</li>
                  <li className="next" onClick={this.nextMonth.bind(this)}>&#10095;</li>
                  <li id='month'>
                    {this.state.month}<br/>
                    <span id='year'>{this.state.year}</span>
                  </li>
                </ul>
              </div>
              <ul className="weekdays">
                <li>Su</li>
                <li>M</li>
                <li>Tu</li>
                <li>W</li>
                <li>Th</li>
                <li>F</li>
                <li>Sa</li>
              </ul>
              <div onClick={this.displayCal.bind(this)}>
                <ul className="days" onClick={this.monthInput.bind(this)}>
                  { (this.state.days).map((item, i) => <ListItem key={i} value={item} />) }
                </ul>
              </div>
            </div>
          </div>
          <div className='eventsBorder uk-card uk-card-default uk-card-body uk-animation-slide-top-small uk-width-2-5@s'>
            <div className='events'>
              <p className='uk-text-center uk-text-large'>Events</p>
              <ul className="eventsList uk-list uk-list-striped">
                { (this.state.events).map((item, i) => <ListItem key={i} value={item} />) }
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const ListItem = ({ value }) => (
  <li id={value}>{value}</li>
)

export default Calendar
