import React, { Component } from 'react'
import styles from './Calendar.css'
const http = require('http')

// stores user click input
var input = ''

// right click menun
var contextMenu

// for loading wheel
var loading

// decides whether or not to show "_ matches" for search bar
var showMatchesInSearch

// stuff for firebase syncing
var ref

// used in the UI display
const ListItem = ({ value }) => (
  <li id={value}>{value}</li>
)

// set to true when month is changing to ensure user doesn't try to change months before everything is ready
var monthChanging = false

// used to record which personal event is being right clicked on
var personalEventOfContextMenu = ''

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
      personalEventsToShow: [],
      selectedDay: window.d,
      selectedDayIndex: -1,
      selectedDayWeekOfCycle: 0,
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
    this.setPersonalEvents = this.setPersonalEvents.bind(this)
    this.changeMonth = this.changeMonth.bind(this)
    this.search = this.search.bind(this)
    this.addPersonalEvent = this.addPersonalEvent.bind(this)
    this.removePersonalEvent = this.removePersonalEvent.bind(this)
    this.changeSelectedSearchResult = this.changeSelectedSearchResult.bind(this)
    this.preloadAdjacentMonths = this.preloadAdjacentMonths.bind(this)
    
    // setup firebase syncing
    ref = props.database.ref('calendarEvents/' + btoa(props.userID))

    
  }
  
  // setup
  componentDidMount() {
    //console.log('component mount')
    let content = document.getElementById('content')
    loading = document.getElementById('loading')
    content.className = 'full vcNavbarParentCal'
    this.setEvents(this.state.calData[this.state.selectedDay-1])
    this.setPersonalEvents(this.state.selectedDay + '-' + (this.state.selectedMonth + 1) + '-' + this.state.selectedYear)
    this.highlightSelectedDay(this.state.selectedDay)
    contextMenu = document.getElementById('contextMenu')
    this.preloadAdjacentMonths(window.m, window.y)
    
    // implement firebase syncing (constantly check for updates)
    ref.on('value', (data) => {
      console.log('ref.on')
      if (data.val() != null) {
        localStorage.setItem('calPersonalEvents', atob(data.val().calendarEvents))
        this.setPersonalEvents(this.state.selectedDay + '-' + (this.state.selectedMonth + 1) + '-' + this.state.selectedYear)
      }
    })

    let mouseTimer

    function exec(e) {
      personalEventOfContextMenu = e.target.innerHTML
      contextMenu.style.visibility = 'visible'
      contextMenu.style.top = parseFloat(e.touches[0].pageY-74)+'px'
      if ((e.touches[0].pageX+137)>window.innerWidth) {
        console.log('too close to the right')
        contextMenu.style.left = parseFloat(e.touches[0].pageX-137)+'px'
      } else {
        contextMenu.style.left = e.touches[0].pageX+'px'
      }
      e.preventDefault()
    }

    function touchUp() {
      if (mouseTimer){
        window.clearTimeout(mouseTimer)
        console.log('released')
      }
    }

    document.getElementById('personalEventsList').addEventListener("touchstart", function(e) {
      console.log('hold down')
      touchUp()
      mouseTimer = window.setTimeout(exec(e),1500); //set timeout to fire in 1.5 seconds when the user presses mouse button down
    })
    document.getElementById('personalEventsList').addEventListener("touchleave", touchUp)
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
        
        const date = input + '-' + (this.state.selectedMonth + 1) + '-' + this.state.selectedYear
        this.setPersonalEvents(date)
      }
    }
  }
  
  // events is a JSON of { info: {}, items: {} }
  setEvents(events) {
    var eventsToAdd = []
    const items = events['items']
    //console.log(items)

    for (var i = 0; i < items.length; i++) {
      const thisEvent = items[i]

      switch (thisEvent['type']) {
        case 'school':     eventsToAdd.push((thisEvent['subject'] != '' ? thisEvent['subject'] + ': ' : '') + thisEvent['title']); break
        case 'assessment': eventsToAdd.push('(Assessment) ' + (thisEvent['assessment'] != '' ? thisEvent['assessment'] : thisEvent['title'])); break
        case 'moodle':     eventsToAdd.push('(Moodle) ' + (thisEvent['subject'] != '' ? thisEvent['subject'] + ': ' : '') + thisEvent['title']); break
        case 'personal':   eventsToAdd.push('(Personal) ' + thisEvent['title']); break
        default: break
      }
    }
    
    // if holidays, this will be '0'
    var weekOfCycle = events['info']['week'] + events['info']['weekType']
    if (weekOfCycle == '') { weekOfCycle = 0 }
    
    this.setState( ()=> ({
      eventsToShow: eventsToAdd,
      selectedDayWeekOfCycle: weekOfCycle
    }))
  }
  
  // date is 'DD-MM-YYYY' e.g. 1-1-2018
  setPersonalEvents(date) {
    if (localStorage.getItem('calPersonalEvents') != null) {
      const personalEvents = JSON.parse(localStorage.getItem('calPersonalEvents'))

      if (personalEvents[date] == null) {
        this.setState( ()=> ({
          personalEventsToShow: []
        }))
      } else {
        this.setState( ()=> ({
          personalEventsToShow: personalEvents[date]
        }))
      }
    }
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
        
        const selectedDate = '1-' + (curMonth + 1) + curYear
        this.setPersonalEvents(selectedDate)
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
        
        const selectedDate = '1-' + (curMonth + 1) + curYear
        this.setPersonalEvents(selectedDate)
        this.highlightSelectedDay(dayToSelect)
        window.diaryCal = this.state.calData
      })
      
    }
    
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
  
  // get the number of days for the month for UI e.g. 28, 29, 30, 31
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
  
  // called when user enters search term
  // waits for 500 ms for user to change input before starting the (lengthy) search
  
  onSearchClick() {
    console.log('onsearchclick')
    var searchwords = keywords.value
    showMatchesInSearch = false
    
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
    } else {
      this.setState( ()=> ({
        searchHits: []
      }))
    }
  }
  
  search() {
    console.log('search initiated')

    loading.style.visibility = 'visible'
    loading.style.display = 'block'

    const terms = keywords.value.split(' ')
    
    const token = localStorage.getItem('accessToken')
    const year = (new Date()).getFullYear()
    
    // make http request for entire year
    // 01-01 to 09-04
    // 10-04 to 18-07
    // 19-07 to 26-10
    // 27-10 to 31-12
    
    
    const cacheCheck = this.state.searchDataCache[year.toString()]
    
    // get data to search in
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
      
        // STANDARD EVENTS
        
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
        
        var allKeywordsFound = true
        // loop through each keyword
        for (var j = 0; j < terms.length; j++) {
          if (!searchCaseInsensitive(terms[j], events)) {
            allKeywordsFound = false
            break
          }
        }
        if (allKeywordsFound) {
          results.push(cal[i]['info']['date'])
        }
      }
      
      // PERSONAL EVENTS
      const personalEvents = JSON.parse(localStorage.getItem('calPersonalEvents'))
      if (personalEvents != null) {
        // loop through each date
        // two nested loops OK here because students are not likely to have a ton of events
        
        // loop through each date
        for (var key in Object.keys(personalEvents)) {
          const keyName = Object.keys(personalEvents)[key]
          const dayEvents = personalEvents[keyName]
          var matchFound = false
          // loop through each event in date
          for (var i = 0; i < dayEvents.length; i++) {
            for (var j = 0; j < terms.length; j++) {
              if (searchCaseInsensitive(dayEvents[i], terms[j])) {
                matchFound = true
                break
              }
            }
            if (matchFound) {
              const month = keyName.split('-')[1]
              const day = keyName.split('-')[0]
              const date = year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
              //console.log(date)
              results.push(date)
              break
            }
          }
        }
      }
        
      console.log('search done')
      
      loading.style.visibility = 'hidden'
      loading.style.display = 'block'
      showMatchesInSearch = true

      //console.log(results)
      this.setState( ()=> ({
        searchHits: results,
        searchResultIndex: 0
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
  
  // handles right click menu for personal events
  calContextMenu(e){
    personalEventOfContextMenu = e.target.innerHTML //you can refer to any DOM property
    contextMenu.style.visibility = 'visible'
    contextMenu.style.top = e.clientY+'px'
    contextMenu.style.left = e.clientX+'px'
    console.log(e.clientX,e.clientY)
    e.preventDefault()
  }
  
  // change is 1, 0 or -1
  changeSelectedSearchResult(change) {
    console.log('change sel result: ' + this.state.searchResultIndex + ', ' + change)
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
          this.setPersonalEvents(dayToSelect + '-' + (month + 1) + '-' + year)
          this.highlightSelectedDay(dayToSelect)
          
          window.diaryCal = this.state.calData
        })
        this.preloadAdjacentMonths(month, year)
      })
    })
  }
  
  /*  JSON structure:
      {
        1-1-2018: [Event 1, Event 2],
        31-1-2018: [Event 3, Event 4],
        ... etc.
      }
  */
  addPersonalEvent() {
    UIkit.dropdown(document.getElementById('calAddDropdown')).hide()
    var eventDate = this.state.selectedDay + '-' + (this.state.selectedMonth + 1) + '-' + this.state.selectedYear
    var eventName = personalEventName.value

    if (localStorage.getItem('calPersonalEvents') == null) {
      localStorage.setItem('calPersonalEvents', '{}')
    }
    
    var calPersonalEvents = JSON.parse(localStorage.getItem('calPersonalEvents'))
    //console.log(calPersonalEvents)
    // if date exists, merge new event with existing ones
    if (calPersonalEvents[eventDate] != null) {
    
      calPersonalEvents[eventDate].push(eventName)
      
    // otherwise create a new date field
    } else {
      calPersonalEvents[eventDate] = [eventName]
    }
    
    var personalEventsArray = this.state.personalEventsToShow
    personalEventsArray.push(eventName)
    
    this.setState( ()=> ({
      personalEventsToShow: personalEventsArray
    }))
    localStorage.setItem('calPersonalEvents', JSON.stringify(calPersonalEvents))
    
    // sync events with firebase
    ref.update({ calendarEvents: btoa(JSON.stringify(calPersonalEvents))})
    
  }
  
  removePersonalEvent() {
    var eventDate = this.state.selectedDay + '-' + (this.state.selectedMonth + 1) + '-' + this.state.selectedYear
    var eventName = personalEventOfContextMenu
    
    var personalEvents = JSON.parse(localStorage.getItem('calPersonalEvents'))
    var eventArrayForToday = personalEvents[eventDate] // ooo, that rhymed
    
    for (var i = 0; i < eventArrayForToday.length; i++) {
      if (eventArrayForToday[i] == eventName) {
        eventArrayForToday.splice(i, 1)
      }
    }
    
    // save changes
    personalEvents[eventDate] = eventArrayForToday
    localStorage.setItem('calPersonalEvents', JSON.stringify(personalEvents))
    personalEventOfContextMenu = ''
    
    // update changes in UI
    var statePersonalEvents = this.state.personalEventsToShow
    for (var i = 0; i < statePersonalEvents.length; i++) {
      if (statePersonalEvents[i] == eventName) {
        statePersonalEvents.splice(i, 1)
      }
    }
    
    this.setState( ()=> ({
        personalEventsToShow: statePersonalEvents
    }))
    
    // sync events with firebase
    ref.update({ calendarEvents: btoa(JSON.stringify(personalEvents))})
    
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
    

    let addDropdown
    if (window.isMobile) {addDropdown = 'left-bottom'}
    else {addDropdown = 'bottom-right'}
    
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
        <div id='contextMenu' className='contextMenu card' style={{visibility: 'hidden', minHeight: '50px',minWidth:'50px',position:'absolute',zIndex:1000}}>
          <ul className='uk-list'>
            <li onClick={this.removePersonalEvent.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='trash'/>Remove</li>
          </ul>
        </div>
        <div id='parentCalCard' className='two uk-animation-slide-top-small'>
          <div id='loading' style={{position: 'fixed', display: 'block',visibility:'hidden', width: '100%',height: '522px',top: '60px',left: '0', right: '0', bottom: '0', backgroundColor: 'rgba(0,0,0,0.3)', zIndex: '2', cursor: 'pointer', borderRadius:'5px'}}><div className='calLoadingParent'><div className='calLoadingChild uk-flex-center' uk-spinner="ratio: 4"/></div></div>
          <div id='aaa' className='uk-inline uk-width-1-1'>
            <div className="uk-margin uk-align-left">
                <div id='ccc' className="uk-search uk-search-default">
                    <span uk-search-icon=''></span>
                    <input id='keywords' className="uk-search-input" onInput={this.onSearchClick.bind(this)} type="search" placeholder="Search"/>
                </div>
                <button id='calPrev' onClick={this.prevSearchResult.bind(this)} className="uk-button uk-button-default"><a uk-icon="icon: chevron-left"></a></button>
                <button id='calNext' onClick={this.nextSearchResult.bind(this)} className="uk-button uk-button-default"><a uk-icon="icon: chevron-right"></a></button>
                <div id='calMatches' className='uk-text-muted uk-align-right'>{showMatchesInSearch ? this.state.searchHits.length + ' matches' : '' }</div>
            </div>
            
            <div id='calIcons' className="uk-align-right">
              <div className="uk-inline">
                <a uk-icon="icon: plus-circle" uk-tooltip='title: Add event for this day;pos:left'></a>
                <div id='calAddDropdown' uk-dropdown={"mode: click;pos: "+addDropdown}>
                  <p className='uk-text-left'>Add personal event</p>
                  <input id='personalEventName' className="uk-input" type="text" placeholder="Event"/>
                  <button onClick={this.addPersonalEvent.bind(this)} className='uk-margin-top uk-button uk-button-default'>Add</button>
                </div>
              </div>
              <a uk-icon="icon: info" uk-tooltip='title: Right click a personal event to remove it;pos:right'></a>
            </div>
          </div>
          <div className="uk-grid-collapse uk-grid uk-grid-match" uk-grid='true'>
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
                 <p className='uk-text-center uk-text-large uk-margin-top-none uk-heading-line'><span>Events {(this.state.selectedDayWeekOfCycle == '0') ? '' : 'for Week ' + this.state.selectedDayWeekOfCycle}</span></p>
                <p className='uk-text-center uk-text-large uk-margin-top-none'></p>
                <ul className="eventsList uk-list uk-list-divider">
                    { this.state.eventsToShow.map((item, i) => <ListItem key={i} value={item} />) }
            
                </ul>
                <p className='uk-text-center uk-text-large uk-margin-top-none'></p>
                <p className='uk-text-center uk-text-large uk-margin-top-none uk-heading-line'><span>Personal Events</span></p>
                <p className='uk-text-center uk-text-large uk-margin-top-none'></p>
                <ul style={{whiteSpace: 'pre-wrap',overflowWrap: 'break-word'}} id='personalEventsList' className="eventsList uk-list uk-list-divider">
                    { this.state.personalEventsToShow.map((item, i) => { return <li onContextMenu={this.calContextMenu.bind(this)} key={i}>{item}</li>})}
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
