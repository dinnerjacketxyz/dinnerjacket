import React, { Component } from 'react'
const css = require('./Dashboard.css')
const http = require('http')

var timerRunning = false

class Dashboard extends Component {
  constructor(props) {
    super(props)
    localStorage.setItem('clicked','false')
    this.state = { htmlClasses: (<b></b>),
                   shouldUpdatetimetable: true,
                   schedule: '',
                   periods: '',
                   timer: 0,
                   nextClass: 'Loading' }

    this.updateTimetableDisplay = this.updateTimetableDisplay.bind(this)
    this.addMorningClass = this.addMorningClass.bind(this)
    this.getNextClass = this.getNextClass.bind(this)
  }
  
  // setup
  componentDidMount() {
    console.log('component mounted')
    // set up timer
    let ID = setInterval(this.timerTick.bind(this), 1000)
    timerRunning = true

    // save timer ID so we can remove the timer later
    this.setState({timerID: ID})
    
    // check if cached timetable out of date
    //console.log('checking timetable cache validity')
    let date = new Date()

    let cachedTimetableDate = new Date(localStorage.getItem('timetablePeriodsDate'))
    
    let timetableIsTodayBefore315 = ((date.getDay() === cachedTimetableDate.getDay()) && (date.getHours() < 15 || (date.getHours() === 15 && date.getMinutes() < 15)))

    let timetableIsForTheFuture = (date < cachedTimetableDate && !(date.getDay() === cachedTimetableDate.getDay))
    
    // check this is correct?
    if (!timetableIsTodayBefore315 && !timetableIsForTheFuture)  {
      localStorage.removeItem('timetableBells')
      localStorage.removeItem('timetablePeriods')
      localStorage.removeItem('timetablePeriodsDate')
      //console.log('timetable cache invalid')
    } /*else {
      //console.log('timetable cache valid')
    }*/
    
    // if cache empty then fill it
    if (localStorage.getItem('timetableBells') == undefined) {
      this.getAPIData = this.getAPIData.bind(this)
      this.getAPIData()
    }
    // initial update
    this.updateTimetableDisplay('')

    this.timerTick = this.timerTick.bind(this)
    this.processHTML = this.processHTML.bind(this)

    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
    
  }

  // deconstructor
  componentWillUnmount() {
  
    // remove timer after unmount
    clearInterval(this.state.timerID)
    timerRunning = false
  
    let content = document.getElementById('content')
    content.className = 'full'
  }
  
  // this is called each time the timer executes
  timerTick() {
    
    // this is called to update clases when the timer runs out
    function updateCountdown() {
      const date = new Date()
      const secDifference = Math.floor((this.state.nextClass.time.getTime() - date.getTime())/1000)
      this.setState( ()=> ({
        timer: secDifference
      }))
      this.render()
    }
    
    updateCountdown = updateCountdown.bind(this)
    // update display if timer runs out
    if (this.state.timer <= 0) {
      this.setState( ()=> ({
        nextClass: this.getNextClass()
      }), ()=> {
        console.log('check timer running')
        if (timerRunning) {
          updateCountdown()
        }
      })
      
    // otherwise, decrement timer
    } else {
      updateCountdown()
    }
  }
  
  getAPIData() {
    //console.log('getAPIData()')
    // Daily timetable
    http.get('/getdata?token=' + localStorage.getItem('accessToken') + '&url=timetable/daytimetable.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })
      
      res.on('end', () => {
        this.updateTimetableDisplay(JSON.parse(data))
        if (!timerRunning) {
          console.log('starting timer')
          let ID = setInterval(this.timerTick.bind(this), 1000)
          timerRunning = true
          this.setState({timerID: ID})
        }
      })
    })
  }

  // get default periods if not authenticated
  getDefaultPeriods(getTransitions) {
    let date = new Date()
    let returnData = []

    // 0 - Sun | 1 - Mon | 2 - Tue | 3 - Wed | 4 - Thu | 5 - Fri | 6 - Sat
    let day = date.getDay()

    // use next day if school day is over
    if (date.getHours() > 15 || (date.getHours() == 15 && date.getMinutes() >= 15)) {
      day += 1
    }

    switch (day) {

      // return periods for monday/tuesday
      case 6:
      case 7:
      case 1:
      case 2: return [{name: 'Period 1', teacher: '', room: '', time: '09:05', changed: []},
                      {name: 'Period 2', teacher: '', room: '', time: '10:10', changed: []},
                      {name: 'Lunch',    teacher: '', room: '', time: '11:10', changed: []},
                      {name: 'Period 3', teacher: '', room: '', time: '11:50', changed: []},
                      {name: 'Period 4', teacher: '', room: '', time: '12:55', changed: []},
                      {name: 'Recess',   teacher: '', room: '', time: '13:55', changed: []},
                      {name: 'Period 5', teacher: '', room: '', time: '14:15', changed: []}]

      // return periods for wednesday/thursday
      case 3:
      case 4: return [{name: 'Period 1', teacher: '', room: '', time: '09:05', changed: []},
                      {name: 'Period 2', teacher: '', room: '', time: '10:10', changed: []},
                      {name: 'Recess',   teacher: '', room: '', time: '11:10', changed: []},
                      {name: 'Period 3', teacher: '', room: '', time: '11:30', changed: []},
                      {name: 'Lunch',    teacher: '', room: '', time: '12:30', changed: []},
                      {name: 'Period 4', teacher: '', room: '', time: '13:10', changed: []},
                      {name: 'Period 5', teacher: '', room: '', time: '14:15', changed: []}]

      // return periods for friday
      case 5: return [{name: 'Period 1', teacher: '', room: '', time: '09:30', changed: []},
                      {name: 'Period 2', teacher: '', room: '', time: '10:30', changed: []},
                      {name: 'Recess',   teacher: '', room: '', time: '11:25', changed: []},
                      {name: 'Period 3', teacher: '', room: '', time: '11:45', changed: []},
                      {name: 'Lunch',    teacher: '', room: '', time: '12:40', changed: []},
                      {name: 'Period 4', teacher: '', room: '', time: '13:20', changed: []},
                      {name: 'Period 5', teacher: '', room: '', time: '14:20', changed: []}]

    }
  }

  getDefaultBells() {
    let date = new Date()
    let returnData = []

    // 0 - Sun // 1 - Mon // 2 - Tue // 3 - Wed // 4 - Thu // 5 - Fri // 6 - Sat
    let day = date.getDay()

    // use next day if school day is over
    if (date.getHours() > 15 || (date.getHours() == 15 && date.getMinutes() >= 15)) {
      if (day == 6) {
        day = 0
      } else {
        day += 1
      }
    }
    
    switch (day) {

      // return bells for monday/tuesday
      case 6:
      case 0:
      case 1:
      case 2: returnData = [{bell: 'Roll Call',  time: '09:00'},
                            {bell: 'Period 1',   time: '09:05'},
                            {bell: 'Transition', time: '10:05'},
                            {bell: 'Period 2',   time: '10:10'},
                            {bell: 'Lunch 1',    time: '11:10'},
                            {bell: 'Lunch 2',    time: '11:30'},
                            {bell: 'Period 3',   time: '11:50'},
                            {bell: 'Transition', time: '12:50'},
                            {bell: 'Period 4',   time: '12:55'},
                            {bell: 'Recess',     time: '13:55'},
                            {bell: 'Period 5',   time: '14:15'},
                            {bell: 'End of Day', time: '15:15'}]

      // return bells for wednesday/thursday
      case 3:
      case 4: returnData = [{bell: 'Roll Call',  time: '09:00'},
                            {bell: 'Period 1',   time: '09:05'},
                            {bell: 'Transition', time: '10:05'},
                            {bell: 'Period 2',   time: '10:10'},
                            {bell: 'Recess',     time: '11:10'},
                            {bell: 'Period 3',   time: '11:30'},
                            {bell: 'Lunch 1',    time: '12:30'},
                            {bell: 'Lunch 2',    time: '12:50'},
                            {bell: 'Period 4',   time: '13:10'},
                            {bell: 'Transition', time: '14:10'},
                            {bell: 'Period 5',   time: '14:15'},
                            {bell: 'End of Day', time: '15:15'}]

      // return bells for friday
      case 5: returnData = [{bell: 'Roll Call',  time: '09:25'},
                            {bell: 'Period 1',   time: '09:30'},
                            {bell: 'Transition', time: '10:25'},
                            {bell: 'Period 2',   time: '10:30'},
                            {bell: 'Recess',     time: '11:25'},
                            {bell: 'Period 3',   time: '11:45'},
                            {bell: 'Lunch 1',    time: '12:40'},
                            {bell: 'Lunch 2',    time: '13:00'},
                            {bell: 'Period 4',   time: '13:20'},
                            {bell: 'Transition', time: '14:15'},
                            {bell: 'Period 5',   time: '14:20'},
                            {bell: 'End of Day', time: '15:15'}]

    }
    return returnData
  }
  
  addMorningClass(timetable, periods, bells) {
    // add morning classes
    console.log('add morning class')
    const morningClasses = localStorage.getItem('morningClasses').split(',')
    if (morningClasses != undefined) {
      for (var i = 0; i < 15; i++) {
        // create dayname to compare with today
        var dayname = ''
        const thisDay = morningClasses[i].split('!')
        switch (thisDay[3]) {
          case 'MON': dayname += 'Monday '; break
          case 'TUE': dayname += 'Tuesday '; break
          case 'WED': dayname += 'Wednesday '; break
          case 'THU': dayname += 'Thursday '; break
          case 'FRI': dayname += 'Friday '; break
        }
        dayname += thisDay[2]
        
        // check if this morning class is for today
        if (dayname == timetable['timetable']['timetable']['dayname']) {
          // add to periods
          const studentYear = window.timetable['student']['year']
          const className = timetable['timetable']['subjects'][studentYear + thisDay[0]]['title']
          const fullClassName = timetable['timetable']['subjects'][studentYear + thisDay[0]]['subject']
          const teacherName = timetable['timetable']['subjects'][studentYear + thisDay[0]]['fullTeacher']
          const morningClass = { name: className,
                                 teacher: teacherName,
                                 room: thisDay[1],
                                 time: '08:00',
                                 fullName: fullClassName,
                                 changed: [] }
          periods.splice(0, 0, morningClass)
          
          // add to bells
          const morningClassBell = { bell: fullClassName,
                                     time: '08:00' }
          bells.splice(0, 0, morningClassBell)
          break
        }
      }
    }
  }

  // get the timetable for today
  getDailyTimetable(timetable) {
    console.log('Get daily timetable')
    let bells = this.getBelltimes(timetable)
    let periods = this.getClasses(timetable, bells)
    this.getChanges(periods, timetable)

    // Lunch is 5, Recess is 6
    const lunch = { name: 'Lunch',
                    teacher: '',
                    room: '',
                    time: bells[5][0],
                    changed: [(bells[5][1] ? 'bells' : [])] }

    const recess = { name: 'Recess',
                     teacher: '',
                     room: '',
                     time: bells[6][0],
                     changed: [(bells[6][1] ? 'bells' : [])] }
    
    // use routine to determine where to put lunch and recess
    let routine = timetable['timetable']['timetable']['routine']
    switch (routine) {
      // Monday, Tuesday
      case 'R1T2=3T4=5': periods.splice(2, 0, lunch); periods.splice(5, 0, recess); break
      // Wednesday, Thursday, Friday
      case 'R1T2=3=4T5': periods.splice(2, 0, recess); periods.splice(4, 0, lunch); break
      // Mon, Tue for Teacher?
      case 'R1T2BC3T4A5': periods.splice(2, 0, lunch); periods.splice(5, 0, recess); break
      // Wed, Thu, Fri for Teacher?
      case 'R1T2A3BC4T5': periods.splice(2, 0, recess); periods.splice(4, 0, lunch); break
      default: break
    }
    return periods
  }

  // get periods, rooms and teachers for today
  getClasses(daytimetable, bells) {
    let returnData = []

    let subjects = daytimetable['timetable']['subjects']

    // periods is a JSON, not an array - therefore it starts from '1'
    let periods = daytimetable['timetable']['timetable']['periods']
    
    // loop through periods to set data
    for (var i = 0; i < 5; i++) {
      let thisPeriod = periods[i+1]
      
      // not a free period
      if (thisPeriod !== undefined) {
        const name = thisPeriod['year'] + thisPeriod['title']

        // handles an API bug where the teacher name is empty
        let teacherName = thisPeriod['fullTeacher']
        if (teacherName == '' || teacherName == undefined) {
          teacherName = thisPeriod['teacher']
        }

        returnData[i] = { name: subjects[name]['title'],
                          teacher: teacherName,
                          room: thisPeriod['room'],
                          time: bells[i][0],
                          fullName: subjects[name]['subject'],
                          changed: [] }

      // free period
      } else {
        returnData[i] = { name: 'Period ' + (i+1),
                          teacher: '',
                          room: '' ,
                          time: bells[i][0],
                          changed: [] }
      }
      // so we know later if a bell was changed
      if (bells[i][1]) {
        returnData[i].changed.push('bells')
      }
      //console.log(returnData[i])
    }
    console.log('Getclasses')
    return returnData
  }

  // get belltimes for today
  // the return value is an ARRAY of Array of [String, Boolean] - indexed from 0
  getBelltimes(daytimetable) {
    let bells = daytimetable['bells']
    let returnVar = []
    const numBells = Object.keys(bells).length

    // get name and time for each bell
    for (var i = 0; i < numBells; i++) {
      let thisBell = bells[i]

      switch (thisBell['bell']) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5': returnVar[(thisBell['bell'] - 1)] = [thisBell['time'], (thisBell['special'])]; break
      case 'Lunch 1': returnVar[5] = [thisBell['time'], (thisBell['special'])]; break;
      case 'Recess': returnVar[6] = [thisBell['time'], (thisBell['special'])]; break;
      }
    }
    return returnVar
  }

  // Get room and teacher changes for today and push them to the periods array
  getChanges(periods, timetable) {

    const roomVariations = timetable['roomVariations']
  
    if (timetable['roomVariations'] !== undefined) {
    
      const numVariations = Object.keys(roomVariations).length
      
      for (var i = 0; i < numVariations; i++) {
        const periodNo = Object.keys(roomVariations)[i]
        periods[periodNo-1].room = roomVariations[periodNo]['roomTo']
        periods[periodNo-1].changed.push('room')
      }
    }

    const classVariations = timetable['classVariations']
    if (timetable['classVariations'] !== undefined) {

      const numVariations = Object.keys(classVariations).length

      for (var i = 0; i < numVariations; i++) {
        const periodNo = Object.keys(classVariations)[i]
        
        // nocover = no teacher -> study period
        if (classVariations[periodNo]['type'] === 'nocover') {
          periods[periodNo-1] = { name: periods[periodNo-1].name,
                                teacher: '',
                                room: '',
                                time: periods[periodNo-1].time,
                                changed: periods[periodNo-1].changed }
          periods[periodNo-1].changed.push('noclass')
        
        // casual teacher
        } else {
          periods[periodNo-1].teacher = classVariations[periodNo]['casualSurname']
          periods[periodNo-1].changed.push('teacher')
        }
      }
    }
  }

  // create the HTML for displaying classes
  processHTML(periods) {
    //console.log(periods)
    const numPeriods = Object.keys(periods).length
    
    // these change the
    const nameTextClass = 'lead '
    const teacherTextClass = 'meta '
    const roomTextClass = 'room '

    for (var i = 0; i < numPeriods; i++) {

      let thisPeriod = periods[i]
      
      const noClass = thisPeriod.changed.includes('noclass')
      const roomChange = thisPeriod.changed.includes('room')
      const teacherChange = thisPeriod.changed.includes('teacher')
      const bellChange = thisPeriod.changed.includes('bells')


      // Lunch, recess or study periods
      if (thisPeriod.room === '') {
      
        thisPeriod.name = (<dd className={nameTextClass + 'uk-text-muted ' + (noClass ? 'uk-text-primary' : '')}>{thisPeriod.name}</dd>)
        thisPeriod.teacher = (<dd className={teacherTextClass + 'uk-text-primary'}> {(noClass ? 'no teacher' : '')}</dd>)
        thisPeriod.room = (<td className={roomTextClass + 'uk-text-muted ' + (bellChange ? 'uk-text-primary' : '')}>{thisPeriod.time}</td>)
      
      // normal periods
      } else {

        thisPeriod.name = (<dd className={nameTextClass + (noClass ? 'uk-text-primary' : '')}>{thisPeriod.name}</dd>)
        
        thisPeriod.teacher = (<dd className={teacherTextClass}>at <span className={teacherTextClass + ((bellChange) ? 'uk-text-primary' : '')}>{thisPeriod.time}</span> with <span className={teacherTextClass + ((teacherChange) ? 'uk-text-primary' : '')}>{thisPeriod.teacher}</span></dd>)
      
        thisPeriod.room = (<td className={roomTextClass + (roomChange ? 'uk-text-primary' : '')}>{thisPeriod.room}</td>)
      }
    }
    
    // adjust how many periods need to be shown
    const PeriodItem = ({ value }) => (
                        <tr>
                          <td className='uk-text-left'>
                            {periods[value].name}
                            {periods[value].teacher}
                          </td>
                          {periods[value].room}
                        </tr>
                      )
    var periodArr = [0, 1, 2, 3, 4, 5, 6]
    if (periods.length == 8) {
      periodArr.push(7)
    }
    
    return (<div className='uk-flex uk-flex-center'>
            <table className='dashTable uk-table-hover uk-table-small'>
              <tbody>
                { (periodArr).map((item, i) => <PeriodItem key={i} value={item} />) }
              </tbody>
            </table>
            <h1> </h1>
          </div>)
  }

  // process the HTML to render timetable to screen
  // also process the timer display
  updateTimetableDisplay(timetable) {
    //console.log('updateTimetableDisplay()')
    let schedule
    let periods
    let date = new Date()

    // if timetable exists and is current (i.e. it is not past 3:15pm), use the timetable periods
    // nested if's are used for readability
    if (timetable != '') {
      console.log('loading fresh periods')
      let timetableDate = new Date(timetable['date'])

      let timetableIsTodayBefore315 = ((date.getDay() === timetableDate.getDay()) && (date.getHours() < 15 || (date.getHours() === 15 && date.getMinutes() < 15)))

      let timetableIsForTheFuture = (date < timetableDate && !(date.getDay() === timetableDate.getDay))

      if (timetableIsTodayBefore315 || timetableIsForTheFuture) {

        periods = this.getDailyTimetable(timetable)
        let bells = timetable['bells']
        if (localStorage.getItem('morningClasses') != null) {
          this.addMorningClass(timetable, periods, bells)
        }
        schedule = this.getSchedule(periods, timetableDate, bells)
        localStorage.setItem('timetableBells', JSON.stringify(bells))
        localStorage.setItem('timetablePeriods', JSON.stringify(periods))
        localStorage.setItem('timetablePeriodsDate', timetable['date'])
      }
    
    // check for cached timetable data
    } else if (localStorage.getItem('timetablePeriods') != undefined) {
      console.log('loading cached periods')
      periods = JSON.parse(localStorage.getItem('timetablePeriods'))
      let bells = JSON.parse(localStorage.getItem('timetableBells'))
      let timetableDate = localStorage.getItem('timetablePeriodsDate')
      schedule = this.getSchedule(periods, timetableDate, bells)
      
    } else {
      
      console.log('loading default periods')
      periods = this.getDefaultPeriods()

      // the next school date
      let nextDate = new Date()

      // advance day by one if school is over
      if (nextDate.getHours() > 15 || (nextDate.getHours() === 15 && nextDate.getMinutes() >= 15)) {
        nextDate = new Date(nextDate.getTime() + (1000 * 60 * 60 * 24))
        nextDate.setHours(0)
      }

      // if next day is saturday or sunday, advance to monday
      if (nextDate.getDay === 6) {
        nextDate = new Date(nextDate.getTime() + (1000 * 60 * 60 * 24 * 2)) // +2 days, since Saturday
      } else if (nextDate.getDay === 0) {
        nextDate = new Date(nextDate.getTime() + (1000 * 60 * 60 * 24))
      }
      schedule = this.getSchedule(this.getDefaultPeriods(), nextDate, this.getDefaultBells())
    }
    
    if (schedule === undefined) {
      console.log('schedule undefined')
    } else {
      console.log('schedule made')
    }
    this.setState( ()=> ({
      htmlClasses: this.processHTML(periods),
      schedule: schedule
    }), () => {
      this.setState( ()=> ({
        nextClass: this.getNextClass()
      }), () => {
        this.timerTick()
        const secDifference = Math.floor((this.state.nextClass.time.getTime() - date.getTime())/1000)
        this.setState( ()=> ({
          timer: secDifference
        }))
        this.render()
      })
    })
    
    // is this needed?
    this.render()
  }

  // returns next class (or next bell)
  getNextClass() {
    //console.log('getNextClass()')
    // get date
    let date = new Date()
    let schedule = this.state.schedule
    
    for (var i=0; i<schedule.length; i++) {
      if (schedule[i].time > date) {
        return schedule[i]
      }
    }
    
    // if loop finishes, it is past 3:15, get new timetable data
    console.log('getNextClass(): loop ended - 3:15')
    
    clearInterval(this.state.timerID)
    timerRunning = false
    this.getAPIData()
    return {name: 'Loading', time: date}
  }

  // gets schedule of periods for timer, including class names (assumes timetable is valid)
  getSchedule(periods, dateOfPeriods, bells) {
    console.log('getSchedule()')
    let returnVar = []
    let periodsCopy = [].concat(periods)

    // remove any non-period time blocks
    for (var i = 0; i < periodsCopy.length; i++) {
      if (periodsCopy[i].name.startsWith('Recess') || periodsCopy[i].name.startsWith('Lunch')) {
        periodsCopy.splice(i, 1)
      }
    }

    // create array of {name: (full name), time: (date)} of all bells
    for (var i=0; i < bells.length; i++) {

      let name = bells[i]['bell']
      let time = new Date(dateOfPeriods)
      time.setHours(bells[i]['time'].substring(0, 2))
      time.setMinutes(bells[i]['time'].substring(3, 5))

      // if number, i.e. period 1, 2, 3...
      if (!isNaN(name)) {

        let nameToUse = periodsCopy[name-1].name
        if (periodsCopy[name-1].fullName !== undefined) {
          nameToUse = periodsCopy[name-1].fullName
        }
        returnVar[i] = {name: nameToUse, time: time}

      // if rollcall
      } else if (name === 'R') {
        returnVar[i] = {name: 'Roll Call', time: time}

      // Recess, Lunch 1/2, Transition
      } else {
        returnVar[i] = {name: name, time: time}
      }
    }
    return returnVar
  }

  // convert seconds into display e.g. '01:59:59'
  formatTime(time) {

    let seconds = time % 60
    let minutes = Math.floor(time/60) % 60
    let hours = Math.floor((time/60)/60)

    // pad with zeroes
    if (hours < 10) {
     hours = '0' + hours
    }
    if (minutes < 10) {
     minutes = '0' + minutes
    }
    if (seconds < 10) {
     seconds = '0' + seconds
    }

    let formattedString = ''
    if (hours !== '00') {
      formattedString += hours + ':'
    }
    formattedString += minutes + ':' + seconds
    return formattedString
  }

  // checks if there is school tomorrow
  isWeekend() {
    // 0 - Sun // 1 - Mon // 2 - Tue // 3 - Wed // 4 - Thu // 5 - Fri // 6 - Sat
    let date = new Date
    let day = date.getDay()
    // Sat, Sun
    if (day === 6 || day === 0) {
      return true
    }
    // friday afternoon
    if (day === 5 && (date.getHours() > 15 || (date.getHours() == 15 && date.getMinutes() >= 15))) {
      return true
    }
    return false
  }

  render() {
    // get timer
    const timeLeft = this.formatTime(this.state.timer)
    // for whatever reason React keeps changing JSON fields from 'string' to 'object', so this changes them back
    let nextClass = this.state.nextClass.name
    if (typeof(this.state.nextClass.name) === 'object') {
      nextClass = nextClass.props.children
    }
    
    return (
        <div className='vcNavbarCard'>
          <div className='uk-animation-slide-top-small dashCard card'>
            <h4 className='nextClass'>{nextClass}</h4>
            <p className='in'>in</p>
            <h1 className='uk-heading-line countdown'><span>{timeLeft}</span></h1>
            {this.state.htmlClasses}
          </div>
        </div>
    )
  }
}

export default Dashboard
