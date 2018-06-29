import React, { Component } from 'react'
import styles from './Calendar.css'
const http = require('http')
let input = ''

const ListItem = ({ value }) => (
  <li id={value}>{value}</li>
);

window.d = ''
window.m = ''
window.y = ''

class Calendar extends Component {
  constructor(props) {
    super(props)

    if (window.d === '') {
      window.d = new Date().getDate()
    }
    if (window.m === '') {
      window.m = new Date().getMonth()
    }
    if (window.y === '') {
      window.y = new Date().getFullYear()
    }
    
    this.setDaysForMonth = this.setDaysForMonth.bind(this)

    this.state = {
      calData: window.diaryCal,
      eventsToShow: [],
      selectedDay: window.d,
      selectedDayIndex: -1,
      selectedMonth: window.m,
      selectedYear: window.y,
      days: this.setDaysForMonth(window.m, window.y)
    }
    
    this.highlightSelectedDay = this.highlightSelectedDay.bind(this)
    this.setEvents = this.setEvents.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
  }
  
  // setup
  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParentCal'
    this.setDaysForMonth(this.state.selectedMonth, this.state.selectedYear)
    this.setEvents(this.state.calData[this.state.selectedDay-1])
    this.highlightSelectedDay(this.state.selectedDay)
  }
 
  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'

    window.d = this.state.selectedDay
    window.m = this.state.selectedMonth
    window.y = this.state.selectedYear
  }

  //this sub must process your click input - careful sometimes you can click on the ul element - the onclick returns the innerHTML of child nodes, but it can return any DOM property
  monthInput(e) {
    input = e.target.innerHTML
  }

  //this sub is simultaneously fired and can do your processing - good luck
  displayCal() {
    if (!isNaN(input)) {
      if (input != this.state.selectedDay) {
        this.highlightSelectedDay(input)
        this.setEvents(this.state.calData[input-1])
      }
    }
  }
  
  // events is a JSON of { info: {}, items: {} }
  setEvents(events) {
    var eventsToAdd = []
    const items = events['items']

    for (var i = 0; i < items.length; i++) {
      const thisEvent = items[i]

      switch (thisEvent['type']) {
        case 'school':     eventsToAdd.push((thisEvent['subject'] != '' ? thisEvent['subject'] + ': ' : '') + thisEvent['title']); break
        case 'assessment': eventsToAdd.push('(Assessment) ' + thisEvent['assessment']); break
        case 'moodle':     eventsToAdd.push('(Moodle) ' + (thisEvent['subject'] != '' ? thisEvent['subject'] + ': ' : '') + thisEvent['title']); break
        case 'personal':   eventsToAdd.push('(Personal) ' + thisEvent['title']); break
        default: break
      }
    }
  
    this.setState( ()=> ({
      eventsToShow: eventsToAdd
    }))
  }
  
  prevMonth() {
    this.changeMonth(-1)
  }
  
  nextMonth() {
    this.changeMonth(1)
  }
  
  // diff is either 1 or -1
  changeMonth(diff) {
  
    var curMonth = this.state.selectedMonth
    var curYear = this.state.selectedYear
    
    // back past January
    if ((curMonth == 0) && (diff == -1)) {
      curMonth = 11
      curYear -= 1
  
    // forward past December
    } else if ((curMonth == 11) && (diff == 1)) {
      curMonth = 0
      curYear += 1
    } else {
      curMonth += diff
    }
    let prev = document.getElementById(this.state.days[this.state.selectedDayIndex])
    prev.className = ''
    
    this.setState( ()=> ({
      selectedMonth: curMonth,
      selectedYear: curYear,
      selectedDayIndex: -1,
      days: this.setDaysForMonth(curMonth, curYear)
    }))
    
    
    // Get calendar data for the next month
    let promise1 = new Promise( function (resolve, reject) {
      
      const year = curYear
      const month = curMonth + 1
      
      // create parameters:   from=YYYY-MM-DD   to=YYYY-MM-DD
      var from = year + '-' + (month > 9 ? month : '0' + month) + '-01'
      var to = year + '-' + (month > 9 ? month : '0' + month) + '-' + (new Date(year, month, 0).getDate())
      
      // make http request
      const token = localStorage.getItem('accessToken')
      http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
        res.setEncoding('utf8')
        let d = ''
        res.on('data', (body) => {
          d += body
        })
        res.on('end', () => {
          resolve(JSON.parse(d))
        })
      })
    })
    
    // process data from http requests
    promise1.then( (result) => {
      this.setState( ()=> ({
        calData: result
      }))
      window.m = curMonth
      window.y = curYear
      
      let dayToSelect = 1
      if (window.m == new Date().getMonth() && window.y == new Date().getFullYear()) {
        dayToSelect = new Date().getDate()
      }

      this.setEvents(this.state.calData[dayToSelect-1])
      this.highlightSelectedDay(dayToSelect)
    })
    
  }
  
  // converts a number to a month e.g. 0 -> 'January', 1 -> 'February'
  monthNumToText(num) {
    const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return arr[num]
  }
  
  // highlights newDay on the calendar
  highlightSelectedDay(newDay) {
    window.d = parseInt(newDay)
    let days = this.state.days
    let prevDay = this.state.selectedDay
    
    // unselect selected day
    if (this.state.selectedDayIndex != -1) {
      let prev = document.getElementById(days[this.state.selectedDayIndex])
      prev.className = ''

      days[this.state.selectedDayIndex] = prevDay
      
    }
    
    // select new day
    for (var i = 0; i < days.length; i++) {
      if (days[i] == newDay) {
        let select = document.getElementById(newDay)
        select.className = 'active'
        
        this.setState( ()=> ({
          selectedDayIndex: i
        }))
        break
      }
    }

    this.setState( ()=> ({
      selectedDay: newDay,
      days: days
    }))
  }
  
  // get the number of days for the month for UI
  setDaysForMonth(month, year) {
    
    var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]

    switch (month + 1) {
    
      // 28/29 days
      case 2: if (year % 4 == 0) { days.push(29) }; break
      
      // 30 days
      case 4:
      case 6:
      case 9:
      case 11: days = days.concat([29, 30]); break
      
      // 31 days
      default: days = days.concat([29, 30, 31])
    }
    
    // offset first day so it starts on the correct day of week e.g. 1st of month starts on Friday or Tuesday
    const firstOfMonth = new Date(year, month, 1)
    for (var i=0; i < firstOfMonth.getDay(); i++) {
      days.unshift(' ')
    }
    
    return days
  }
  
  render() {
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
        <div className="uk-grid-collapse uk-grid two uk-grid-match" uk-grid='true'>
          <div  className='cal card uk-animation-slide-top-small uk-width-expand'>
            <div>
              <div className="month">      
                <ul>
                  <li onClick={this.prevMonth.bind(this)} className="prev">&#10094;</li>
                  <li onClick={this.nextMonth.bind(this)} className="next">&#10095;</li>
                  <li>
                    {this.monthNumToText(this.state.selectedMonth)}<br/>
                    <span>{this.state.selectedYear}</span>
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
                <ul className="days" onClick={this.monthInput}>
                  { (this.state.days).map((item, i) => <ListItem key={i} value={item} />) }
                </ul>
              </div>
            </div>
          </div>
          <div className='eventsBorder card uk-animation-slide-top-small uk-width-2-5@s'>
            <div className='events'>
              <p className='uk-text-center uk-text-large'>Calendar Events</p>
              <ul className="eventsList uk-list uk-list-striped">
                  { (this.state.eventsToShow).map((item, i) => <ListItem key={i} value={item} />) }
              </ul>
              {/*}<table className="uk-table uk-table-divider">
                  <thead>
                      <tr>
                          <th className="uk-table-shrink">Time</th>
                          <th className="uk-table-auto">Subject</th>
                          <th className="uk-table-auto">Title</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>Table Data</td>
                          <td>Table Data</td>
                          <td>Table Data</td>
                      </tr>
                      <tr>
                          <td>Table Data</td>
                          <td>Table Data</td>
                          <td>Table Data</td>
                      </tr>
                  </tbody>
              </table>*/}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

//add this and remove the days class
/*<div className="daysOverlay uk-inline"><div className="uk-position-center"><div uk-spinner="ratio: 1" className="uk-spinner uk-icon"></div></div></div> */

export default Calendar