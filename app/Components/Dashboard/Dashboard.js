import React, { Component } from 'react'
const css = require('./Dashboard.css')
const http = require('http')

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
    this.getNextClass = this.getNextClass.bind(this)
  }
  
  // setup
  componentDidMount() {
  
    // set up timer
    let ID = setInterval(this.timerTick.bind(this), 1000)

    // save timer ID so we can remove the timer later
    this.setState({timerID: ID})

    // get API data here
    this.updateTimetableDisplay(window.dashboard)

    this.timerTick = this.timerTick.bind(this)
    this.processHTML = this.processHTML.bind(this)

    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
    
    // Daily timetable
    http.get('/getdata?token=' + localStorage.getItem('accessToken') + '&url=timetable/daytimetable.json', (res) => {
      res.setEncoding('utf8')
      let data = ''
      res.on('data', (body) => {
        data += body
      })
      
      res.on('end', () => {
        console.log('new timetable data received')
        let timetable = JSON.parse(data)
        window.dashboard = timetable
        this.updateTimetableDisplay(timetable)
      })
    })
  }

  // deconstructor
  componentWillUnmount() {
  
    // remove timer after unmount
    clearInterval(this.state.timerID)

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
        updateCountdown()
      })
      
    // otherwise, decrement timer
    } else {
      updateCountdown()
    }
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
      day += 1
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

  // get the timetable for today
  getDailyTimetable(timetable) {

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
      // Monday, Tuesday, Friday
      case 'R1T2=3T4=5': periods.splice(2, 0, lunch); periods.splice(5, 0, recess); break
      // Wednesday, Thursdays
      case 'R1T2=3=4T5': periods.splice(2, 0, recess); periods.splice(4, 0, lunch); break
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
        if (teacherName == '') {
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
    }
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

    return (<div className='uk-flex uk-flex-center'>
            <table className='dashTable uk-table-hover uk-table-small'>
              <tbody>
                <tr>
                  <td className='uk-text-left'>
                    {periods[0].name}
                    {periods[0].teacher}
                  </td>
                  {periods[0].room}
                </tr>
                <tr>
                  <td className='uk-text-left'>
                    {periods[1].name}
                    {periods[1].teacher}
                  </td>
                  {periods[1].room}
                </tr>
                <tr>
                  <td className='uk-text-left'>
                    {periods[2].name}
                    {periods[2].teacher}
                  </td>
                  {periods[2].room}
                </tr>
                <tr>
                  <td className='uk-text-left'>
                    {periods[3].name}
                    {periods[3].teacher}
                  </td>
                  {periods[3].room}
                </tr>
                <tr>
                  <td className='uk-text-left'>
                    {periods[4].name}
                    {periods[4].teacher}
                  </td>
                  {periods[4].room}
                </tr>
                <tr>
                  <td className='uk-text-left'>
                    {periods[5].name}
                    {periods[5].teacher}
                  </td>
                  {periods[5].room}
                </tr>
                <tr>
                  <td className='uk-text-left'>
                    {periods[6].name}
                    {periods[6].teacher}
                  </td>
                  {periods[6].room}
                </tr>
              </tbody>
            </table>
            <h1> </h1>
          </div>)
  }

  // process the HTML to render timetable to screen
  // also process the timer display
  updateTimetableDisplay(timetable) {
    let schedule
    let periods
    let date = new Date()
    
    let y = date.getFullYear()
    let m = (date.getMonth()+1).toString()
    let d = date.getDate().toString()
    
    let today = y + '-' + (m.length == 1 ? '0' + m : m) + '-' + (d.length == 1 ? '0' + d : d)
    
    // check if cached timetable out of date
    if (new Date(localStorage.getItem('timetablePeriodsDate')) < new Date(today)) {
      console.log(new Date(localStorage.getItem('timetablePeriodsDate')))
      console.log(new Date(today))
      localStorage.removeItem('timetableBells')
      localStorage.removeItem('timetablePeriods')
      localStorage.removeItem('timetablePeriodsDate')
    }

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
    
    this.setState( ()=> ({
      htmlClasses: this.processHTML(periods),
      schedule: schedule
    }), () => {
      this.timerTick()
    })
    
    // is this needed?
    this.render()
  }

  // returns next class (or next bell)
  getNextClass() {
    // get date
    let date = new Date()
    let schedule = this.state.schedule

    for (var i=0; i<schedule.length; i++) {
      if (schedule[i].time > date) {
        return schedule[i]
      }
    }
  }

  // gets schedule of periods for timer, including class names (assumes timetable is valid)
  getSchedule(periods, dateOfPeriods, bells) {
    let returnVar = []
    let periodsCopy = periods.slice(0)

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
          <div className='uk-animation-slide-top-small dashCard'>
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
