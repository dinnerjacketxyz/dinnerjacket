import React, { Component } from 'react'
import styles from './Calendar.css'
const http = require('http')
let input = ''
let contextMenu

const ListItem = ({ value }) => (
  <li id={value}>{value}</li>
);

// set to true when month is changing to ensure user doesn't try to change months before everything is ready
var monthChanging = false

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
      selectedDayWeekOfCycle: '',
      selectedMonth: window.m,
      selectedYear: window.y,
      days: this.setDaysForMonth(window.m, window.y),
      searchHits: [],
      searchTimer: null,
      searchResultIndex: 0,
      searchDataCache: {}
    }
    
    this.highlightSelectedDay = this.highlightSelectedDay.bind(this)
    this.setEvents = this.setEvents.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.search = this.search.bind(this)
    this.changeSelectedSearchResult = this.changeSelectedSearchResult.bind(this)
    this.preloadAdjacentMonths = this.preloadAdjacentMonths.bind(this)
  }
  
  // setup
  componentDidMount() {
    //console.log('component mount')
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParentCal'
    this.setEvents(this.state.calData[this.state.selectedDay-1])
    this.highlightSelectedDay(this.state.selectedDay)
    contextMenu = document.getElementById('contextMenu')
    this.preloadAdjacentMonths(window.m, window.y)
  }
 
  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'

    window.d = this.state.selectedDay
    window.m = this.state.selectedMonth
    window.y = this.state.selectedYear
  }
  
  preloadAdjacentMonths(month, year) {
    monthChanging = true
    const token = localStorage.getItem('accessToken')
    var from
    var to
    
    var pMonthLoaded = false
    var nMonthLoaded = false
    
    //console.log('preloading next month')
    
    const monthN = (month + 1) + 1
  
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
        }), ()=> {
          pMonthLoaded = true
          monthChanging = !(pMonthLoaded && nMonthLoaded)
        })
      })
    })

    //console.log('preloading prev month')
    
    const monthP = (month + 1) - 1
    
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
        }), ()=> {
          nMonthLoaded = true
          monthChanging = !(pMonthLoaded && nMonthLoaded)
        })
      })
    })
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
    
    // if holidays, this will be '0'
    const weekOfCycle = events['info']['week'] + events['info']['weekType']
    
    this.setState( ()=> ({
      eventsToShow: eventsToAdd,
      selectedDayWeekOfCycle: events['info']['week'] + events['info']['weekType']
    }))
  }
  
  prevMonth() {
    if (!monthChanging) {
      this.changeMonth(-1)
      monthChanging = true
    }
  }
  
  nextMonth() {
    if (!monthChanging) {
      this.changeMonth(1)
      monthChanging = true
    }
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
      monthChanging = false
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
  
  // waits for 500 ms for user to change input before starting the (lengthy) search
  onSearchClick() {
    var searchwords = keywords.value
    
    // remove punctuation from string
    searchwords = searchwords.replace(/[:",\[\]\{\}]/g, '')
    searchwords = searchwords.trim()
    
    if (searchwords != '') {
      if (this.state.searchTimer != null) {
        clearTimeout(this.state.searchTimer)
      }
      this.setState( ()=> ({
        searchTimer: setTimeout(this.search, 500)
      }))
    }
  }
  
  search() {
    console.log('search initiated')
    const terms = keywords.value.split(' ')
    
    const token = localStorage.getItem('accessToken')
    const year = (new Date()).getFullYear()
    // make http request for entire year
    // 01-01 to 09-04
    // 10-04 to 18-07
    // 19-07 to 26-10
    // 27-10 to 31-12
    
    
    const cacheCheck = this.state.searchDataCache[year.toString()]
    const promise = new Promise( function (resolve, reject) {
    
      // check if cached data exists so we don't need to download it again
      if (cacheCheck != null) {
        resolve(cacheCheck)
      } else {
      
        var cal = []
        http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=01-01-' + year + '&to=09-04-' + year, (res) => {
          res.setEncoding('utf8')
          let d = ''
          res.on('data', (body) => {
            d += body
          })
          res.on('end', () => {
            cal = JSON.parse(d)

            http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=10-04-' + year + '&to=18-07-' + year, (res) => {
              res.setEncoding('utf8')
              let d1 = ''
              res.on('data', (body) => {
                d1 += body
              })
              res.on('end', () => {
                cal = cal.concat(JSON.parse(d1))
                
                http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=19-07-' + year + '&to=26-10-' + year, (res) => {
                  res.setEncoding('utf8')
                  let d2 = ''
                  res.on('data', (body) => {
                    d2 += body
                  })
                  res.on('end', () => {
                    cal = cal.concat(JSON.parse(d2))
                    
                    http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=27-10-' + year + '&to=31-12-' + year, (res) => {
                      res.setEncoding('utf8')
                      let d3 = ''
                      res.on('data', (body) => {
                        d3 += body
                      })
                      res.on('end', () => {
                        cal = cal.concat(JSON.parse(d3))
                        resolve(cal)
                      })
                    })

                  })
                })
                
              })
            })
            
          })
        })
      }
    })
      
    
    var results = []
    
    function searchCaseInsensitive(searchTerm, searchString) {
      if (searchString.toUpperCase().includes(searchTerm.toUpperCase())) {
        return true
      } else {
        return false
      }
    }
    
    promise.then( (result) => {
      const cal = result
      
      // save event data for year for future searches
      var cache = this.state.searchDataCache
      if (cache[year.toString()] == null) {
        cache[year.toString()] = result
        this.setState( ()=> ({
          searchDataCache: cache
        }))
        console.log('search cache updated')
      }
      
      // loop through each day
      for (var i = 0; i < cal.length; i++) {
      
        // create a string to represent all the events of each day
        // if we were to search the whole JSON by each field this would be an O(n³) algorithm
        var events = JSON.stringify(cal[i]['items'])
        
        // remove field names from string
        const fieldNames = ['type', 'subtype', 'subject', 'title', 'time', 'description', 'data', 'index', 'user', 'activity', 'venue', 'displayVenue', 'start', 'end', 'notes', 'date', 'venueDisplay']
        for (var j = 0; j < fieldNames.length; j++) {
          const expression = new RegExp('"' + fieldNames[j] + '"', 'g')
          events = events.replace(expression, '')
        }
        // remove punctuation from string
        events = events.replace(/[:",\[\]\{\}]/g, '')
        
        // loop through each keyword
        for (var j = 0; j < terms.length; j++) {
          if (searchCaseInsensitive(terms[j], events)) {
            results.push(cal[i]['info']['date'])
            break
          }
        }
      }
      //console.log('search done')
      console.log(results)
      this.setState( ()=> ({
        searchHits: results
      }), ()=> {
        if (this.state.searchHits.length > 0) {
          this.changeSelectedSearchResult(0)
        }
      })
    })
    
  }
  
  nextSearchResult() {
    if (this.state.searchHits.length > 0) {
      this.changeSelectedSearchResult(1)
    }
  }
  
  prevSearchResult() {
    if (this.state.searchHits.length > 0) {
      this.changeSelectedSearchResult(-1)
    }
  }

  calContextMenu(e){
    console.log(e.target.innerHTML) //you can refer to any DOM property
    contextMenu.style.visibility = 'visible'
    contextMenu.style.top = e.clientY+'px'
    contextMenu.style.left = e.clientX+'px'
    e.preventDefault()
  }
  
  // change is 1, 0 or -1
  changeSelectedSearchResult(change) {
    var newIndex
    if (this.state.searchResultIndex == 0 && change == -1) {
      newIndex = this.state.searchHits.length - 1
    } else if (this.state.searchResultIndex == (this.state.searchHits.length - 1) && change == 1) {
      newIndex = 0
    } else {
      newIndex = this.state.searchResultIndex + change
    }
    
    this.setState( ()=> ({
      searchResultIndex: newIndex
    }))
    
    // jump to the next result
    
    // [YYYY, MM, DD]
    const resultDate = this.state.searchHits[newIndex].split('-')
    const month = Number(resultDate[1]) - 1
    const year = Number(resultDate[0])
    const token = localStorage.getItem('accessToken')
    
    // get data for the month to be jumped to
     
    // create parameters:   from=YYYY-MM-DD   to=YYYY-MM-DD
    var from = year + '-' + resultDate[1] + '-01'
    var to = year + '-' + resultDate[1] + '-' + (new Date(year, (resultDate[1] - 1), 0).getDate())

    // make http request
    http.get('/getdata?token=' + token + '&url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
      res.setEncoding('utf8')
      let d = ''
      res.on('data', (body) => {
        d += body
      })
      res.on('end', () => {
        this.setState( ()=> ({
          calData: JSON.parse(d),
          selectedMonth: month,
          selectedYear: year,
          days: this.setDaysForMonth(month, year)
        }), ()=> {
          window.m = month
          window.y = year
          
          const dayToSelect = Number(resultDate[2])
          this.setEvents(this.state.calData[dayToSelect-1])
          this.highlightSelectedDay(dayToSelect)
          
          window.diaryCal = this.state.calData
        })
        this.preloadAdjacentMonths(month, year)
      })
    })
  }
  
  render() {
    //console.log('render')
    /*under parent cal card
          <div id='aaa' className='uk-inline uk-width-1-1'>
            <div className="uk-margin uk-align-left">
                <form id='ccc' className="uk-search uk-search-default">
                    <span uk-search-icon=''></span>
                    <input id='keywords' className="uk-search-input" onInput={this.onSearchClick.bind(this)} type="search" placeholder="Search"/>
                </form>
                <button onClick={this.prevSearchResult.bind(this)} className="uk-button uk-button-default"><a uk-icon="icon: chevron-left"></a></button>
                <button onClick={this.nextSearchResult.bind(this)} className="uk-button uk-button-default"><a uk-icon="icon: chevron-right"></a></button>
            </div>
            
            <div className='uk-align-right' className='uk-text-muted'>{this.state.searchHits.length} matches</div>
          </div>
    */

    let renameThisVincent = (this.state.eventsToShow).map((item, i) => { 
      return <li onContextMenu={this.calContextMenu.bind(this)} key={i}>{item}</li> 
    })
    
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
        <div id='contextMenu' className='contextMenu card' style={{visibility: 'hidden', minHeight: '50px',minWidth:'50px',position:'absolute',zIndex:1000}}>
          <ul className='uk-list'>
            <li ><span className='uk-margin-right uk-icon' uk-icon='pencil'/>Rename</li>
            <li ><span className='uk-margin-right uk-icon' uk-icon='ban'/>Clear</li>
            <li ><span className='uk-margin-right uk-icon' uk-icon='trash'/>Remove</li>
          </ul>
        </div>
        <div id='parentCalCard' className='two uk-animation-slide-top-small'>
          <div id='aaa' className='uk-inline uk-width-1-1'>
            <div className="uk-margin uk-align-left">
                <div id='ccc' className="uk-search uk-search-default">
                    <span uk-search-icon=''></span>
                    <input id='keywords' className="uk-search-input" onInput={this.onSearchClick.bind(this)} type="search" placeholder="Search"/>
                </div>
                <button id='calPrev' onClick={this.prevSearchResult.bind(this)} className="uk-button uk-button-default"><a uk-icon="icon: chevron-left"></a></button>
                <button id='calNext' onClick={this.nextSearchResult.bind(this)} className="uk-button uk-button-default"><a uk-icon="icon: chevron-right"></a></button>
                <div className='uk-text-muted uk-align-right'>{this.state.searchHits.length} matches</div>
            </div>
            
            <div className="uk-align-right">
              <div className="uk-inline">
                <a uk-icon="icon: plus-circle" uk-tooltip='title: Add event today'></a>
                <div uk-dropdown="mode: click">
                  <p className='uk-text-left'>Add personal event</p>
                  <input className="uk-input" type="text" placeholder="Event"/>  
                  <button className='uk-margin-top uk-button uk-button-default'>Add</button>
                </div>
              </div>
              <a uk-icon="icon: info" uk-tooltip='title: Right click to remove personal events'></a>
            </div>
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
                <p className='uk-text-center uk-text-large uk-margin-top-none'>Events {(this.state.selectedDayWeekOfCycle == '0') ? '' : 'for Week ' + this.state.selectedDayWeekOfCycle}</p>
                <ul className="eventsList uk-list uk-list-divider">
                    { renameThisVincent }
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
