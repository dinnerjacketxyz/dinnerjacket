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
      prevMonthData: '',
      nextMonthData: '',
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
    //console.log('component mount')
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParentCal'
    this.setEvents(this.state.calData[this.state.selectedDay-1])
    this.highlightSelectedDay(this.state.selectedDay)
    
    // preload data for prev and next months
    
    const curMonth = window.m
    const year = window.y
    const token = localStorage.getItem('accessToken')
    var from
    var to
    
    
    //console.log('preloading next month')
    
    const monthN = (curMonth + 1) + 1
  
    // create parameters:   from=YYYY-MM-DD   to=YYYY-MM-DD
    from = year + '-' + (monthN > 9 ? monthN : '0' + monthN) + '-01'
    to = year + '-' + (monthN > 9 ? monthN : '0' + monthN) + '-' + (new Date(year, monthN, 0).getDate())
  
    // make http request
    http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
      res.setEncoding('utf8')
      let d = ''
      res.on('data', (body) => {
        d += body
      })
      res.on('end', () => {
        this.setState( ()=> ({
          nextMonthData: JSON.parse(d)
        }))
      })
    })

    //console.log('preloading prev month')
    
    const monthP = (curMonth + 1) - 1
    
    // create parameters:   from=YYYY-MM-DD   to=YYYY-MM-DD
    from = year + '-' + (monthP > 9 ? monthP : '0' + monthP) + '-01'
    to = year + '-' + (monthP > 9 ? monthP : '0' + monthP) + '-' + (new Date(year, monthP, 0).getDate())
    
    // make http request
    http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
      res.setEncoding('utf8')
      let d = ''
      res.on('data', (body) => {
        d += body
      })
      res.on('end', () => {
        this.setState( ()=> ({
          prevMonthData: JSON.parse(d)
        }))
      })
    })
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
    //console.log('changeMonth()')
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
    
    //console.log('Switching to ' + (curMonth+1))
    
    // Next month
    if ((diff == 1) && this.state.nextMonthData != '') {
      //console.log('preloading data from nextMonth')
      //console.log(this.state.nextMonthData)
      this.setState( ()=> ({
        prevMonthData: this.state.calData,
        calData: this.state.nextMonthData,
        nextMonthData: '',
        selectedMonth: curMonth,
        selectedYear: curYear,
        selectedDayIndex: -1,
        days: this.setDaysForMonth(curMonth, curYear)
      }), ()=> {
        window.m = curMonth
        window.y = curYear
        
        let dayToSelect = 1
        if (window.m == new Date().getMonth() && window.y == new Date().getFullYear()) {
          dayToSelect = new Date().getDate()
        }
        this.setEvents(this.state.calData[dayToSelect-1])
        this.highlightSelectedDay(dayToSelect)
        
        window.diaryCal = this.state.calData
      })
      
    // Prev month
    } else if ((diff == -1) && this.state.prevMonthData != '') {
      //console.log('preloading data from prevMonth')
      //console.log(this.state.prevMonthData)
      
      this.setState( ()=> ({
        nextMonthData: this.state.calData,
        calData: this.state.prevMonthData,
        prevMonthData: '',
        selectedMonth: curMonth,
        selectedYear: curYear,
        selectedDayIndex: -1,
        days: this.setDaysForMonth(curMonth, curYear)
      }), ()=> {
        window.m = curMonth
        window.y = curYear
        
        let dayToSelect = 1
        if (window.m == new Date().getMonth() && window.y == new Date().getFullYear()) {
          dayToSelect = new Date().getDate()
        }
        this.setEvents(this.state.calData[dayToSelect-1])
        this.highlightSelectedDay(dayToSelect)
        window.diaryCal = this.state.calData
      })
      
    // if preloaded data isn't available for some reason
    } else {
      /*
      // Get calendar data for the next month to be displayed
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
      
        // cache used calendar data
        if (diff == 1) {
          //console.log('caching used data into prevMonth')
          this.setState( ()=> ({
            prevMonthData: this.state.calData
          }))
        } else if (diff == -1){
          //console.log('caching used data into nextMonth')
          this.setState( ()=> ({
            nextMonthData: this.state.calData
          }))
        }
        
        this.setState( ()=> ({
          calData: result,
          selectedMonth: curMonth,
          selectedYear: curYear,
          selectedDayIndex: -1,
          days: this.setDaysForMonth(curMonth, curYear)
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
      */
    }
    
    
    // diff == 1, preload next month and store the month that was switched away from
    
    // preload data for prev and next months
    // Get calendar data for the next month to be displayed
    
    let promise1 = new Promise( function (resolve, reject) {
      const year = curYear
      const token = localStorage.getItem('accessToken')
      var from
      var to
      
      if (diff == 1) {
        //console.log('preloading next month')
        
        const monthN = (curMonth + 1) + 1
      
        // create parameters:   from=YYYY-MM-DD   to=YYYY-MM-DD
        from = year + '-' + (monthN > 9 ? monthN : '0' + monthN) + '-01'
        to = year + '-' + (monthN > 9 ? monthN : '0' + monthN) + '-' + (new Date(year, monthN, 0).getDate())
      
        // make http request
        
        http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
          res.setEncoding('utf8')
          let d = ''
          res.on('data', (body) => {
            d += body
          })
          res.on('end', () => {
            resolve([1, JSON.parse(d)])
          })
        })

      } else if (diff == -1) {
      
        //console.log('preloading prev month')
        
        const monthP = (curMonth + 1) - 1
        
        // create parameters:   from=YYYY-MM-DD   to=YYYY-MM-DD
        from = year + '-' + (monthP > 9 ? monthP : '0' + monthP) + '-01'
        to = year + '-' + (monthP > 9 ? monthP : '0' + monthP) + '-' + (new Date(year, monthP, 0).getDate())
        
        // make http request
        http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
          res.setEncoding('utf8')
          let d = ''
          res.on('data', (body) => {
            d += body
          })
          res.on('end', () => {
          
            
            resolve([-1, JSON.parse(d)])
          })
        })
      }
    })
    
    promise1.then( (result) => {
      if (result[0] == 1) {
        this.setState( ()=> ({
          nextMonthData: result[1]
        }))
      } else {
        this.setState( ()=> ({
          prevMonthData: result[1]
        }))
      }
      
      window.m = curMonth
      window.y = curYear
      
      let dayToSelect = 1
      if (window.m == new Date().getMonth() && window.y == new Date().getFullYear()) {
        dayToSelect = new Date().getDate()
      }
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
  
    //console.log('getting days for: ' + (month +1))
    
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
    //console.log('render')
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
        <div id='parentCalCard' className='two uk-animation-slide-top-small'>
          <div id='aaa' className='uk-inline uk-width-1-1'>
            <div className="uk-margin uk-align-left">
                <form id='ccc' className="uk-search uk-search-default">
                    <span uk-search-icon=''></span>
                    <input id='bbb' className="uk-search-input" type="search" placeholder="Search"/>
                </form>
                <button className="uk-button uk-button-default"><a uk-icon="icon: chevron-left"></a></button>
                <button className="uk-button uk-button-default"><a uk-icon="icon: chevron-right"></a></button>
            </div>
            
            <div className='uk-align-right' className='uk-text-muted'>x matches</div>
          </div>
          <div className="uk-grid-collapse uk-grid  uk-grid-match" uk-grid='true'>
            <div className='cal card uk-width-expand'>
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
            <div className='eventsBorder card uk-width-2-5@s'>
              <div className='events'>
                <p className='uk-text-center uk-text-large uk-margin-top-none'>Events</p>
                <ul className="eventsList uk-list uk-list-divider">
                    { (this.state.eventsToShow).map((item, i) => <ListItem key={i} value={item} />) }
                </ul>
              </div>
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
