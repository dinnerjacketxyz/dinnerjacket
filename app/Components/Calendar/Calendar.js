import React, { Component } from 'react'
const css = require('./Calendar.css')
const http = require('http')
let input = ''

const ListItem = ({ value }) => (
  <li>{value}</li>
);

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      calData: window.diaryCal,
      eventsToShow: [],
      selectedDay: (new Date()).getDate(),
      selectedDayIndex: -1,
      selectedMonth: (new Date()).getMonth(),
      selectedYear: (new Date()).getFullYear(),
      days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
    }
    this.setDaysForMonth = this.setDaysForMonth.bind(this)
    this.highlightSelectedDay = this.highlightSelectedDay.bind(this)
    this.setEvents = this.setEvents.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
  }
  
  // setup
  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
    this.setDaysForMonth((new Date()).getMonth(), (new Date()).getFullYear())
    this.setEvents(this.state.calData[this.state.selectedDay-1])
    this.highlightSelectedDay(this.state.selectedDay)
  }
 
  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
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

    this.setDaysForMonth(curMonth, curYear)
    
    // Get calendar data for the next month
    let promise1 = new Promise( function (resolve, reject) {
      
      const year = curYear
      const month = curMonth + 1
      
      // create parameters:   from=YYYY-MM-DD   to=YYYY-MM-DD
      var from = year + '-' + (month > 9 ? month : '0' + month) + '-01'
      var to = year + '-' + (month > 9 ? month : '0' + month) + '-' + (new Date(year, month, 0).getDate())
      
      // make http request
      http.get('/getdata?url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
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
        selectedMonth: curMonth,
        selectedYear: curYear,
        selectedDayIndex: -1,
        calData: result
      }))
      
      this.setEvents(this.state.calData[0])
      this.highlightSelectedDay(1)
    })
    
  }
  
  // converts a number to a month e.g. 0 -> 'January', 1 -> 'February'
  monthNumToText(num) {
    const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return arr[num]
  }
  
  // highlights newDay on the calendar
  highlightSelectedDay(newDay) {
    let days = this.state.days
    let prevDay = this.state.selectedDay
    
    // unselect selected day
    if (this.state.selectedDayIndex != -1) {
      days[this.state.selectedDayIndex] = prevDay
    }
    
    // select new day
    for (var i = 0; i < days.length; i++) {
      if (days[i] == newDay) {
        days[i] = (<span className="active">{newDay}</span>)
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
      days.unshift('')
    }
    
    this.setState( ()=> ({
      days: days
    }))
  }
  
  render() {
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
        <div className="uk-grid-collapse uk-child-width-expand@s uk-grid two uk-margin-top" uk-grid='true'>
          <div className='cal uk-card uk-card-default uk-animation-slide-top-small'>
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
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <p className='uk-text-center uk-text-large'>Calendar Events</p>
            <ul className="events uk-list uk-list-striped">
                { (this.state.eventsToShow).map((item, i) => <ListItem key={i} value={item} />) }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar
