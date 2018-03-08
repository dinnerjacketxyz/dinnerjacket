import React, { Component } from 'react'
const css = require('./Dashboard')
const http = require('http')

class Dashboard extends Component {
  constructor(props) {
    super(props)
    
    this.state = { htmlClasses: (<b></b>),
                   shouldUpdatetimetable: true,
                   schedule: '',
                   timer: 0,
                   nextClass: 'Loading' }
    
    //let periods = this.getDailyTimetable(this.state.timetable)
    //this.state.htmlClasses = this.processHTML(periods)
    
    this.updateTimetableDisplay = this.updateTimetableDisplay.bind(this)
    this.getNextClass = this.getNextClass.bind(this)
  }

  // get timetable data from API
  getAPIData() {
  
    // returns daily notices, see auth.js for usage info
    let promise = new Promise( function (resolve, reject) {
      http.get('/getdata?url=timetable/daytimetable.json', (res) => {
        
        res.setEncoding('utf8')
        
        let returnData = ''
        
        res.on('data', function (body) {
          returnData += body
        })
        
        res.on('end', function(){
          resolve(returnData)
        })
      })
    })
    
    promise.then(function(result) {
      this.updateTimetableDisplay(result)
      this.timerTick()
    }.bind(this))
    
  }
  
  // get default periods if not authenticated
  getDefaultPeriods(getTransitions) {
    let date = new Date()
    let returnData = []
    
    // 0 - Sun // 1 - Mon // 2 - Tue // 3 - Wed // 4 - Thu // 5 - Fri // 6 - Sat
    let day = date.getDay()
    
    // use next day if school day is over
    if (date.getHours() > 15 || (date.getHours() == 15 && date.getMinutes() >= 15)) {
      day += 1
    }
    
    switch (day) {
    
      // return monday/tuesday
      case 6:
      case 7:
      case 1:
      case 2: return [{name: 'Period 1', teacher: '', room: '', time: '09:05'},
                      {name: 'Period 2', teacher: '', room: '', time: '10:10'},
                      {name: 'Lunch',    teacher: '', room: '', time: '11:10'},
                      {name: 'Period 3', teacher: '', room: '', time: '11:50'},
                      {name: 'Period 4', teacher: '', room: '', time: '12:55'},
                      {name: 'Recess',   teacher: '', room: '', time: '13:55'},
                      {name: 'Period 5', teacher: '', room: '', time: '14:15'}]

      // return wed/thu
      case 3:
      case 4: return [{name: 'Period 1', teacher: '', room: '', time: '09:05'},
                      {name: 'Period 2', teacher: '', room: '', time: '10:10'},
                      {name: 'Recess',   teacher: '', room: '', time: '11:10'},
                      {name: 'Period 3', teacher: '', room: '', time: '11:30'},
                      {name: 'Lunch',    teacher: '', room: '', time: '12:30'},
                      {name: 'Period 4', teacher: '', room: '', time: '13:10'},
                      {name: 'Period 5', teacher: '', room: '', time: '14:15'}]
        
      // return friday
      case 5: return [{name: 'Period 1', teacher: '', room: '', time: '09:30'},
                      {name: 'Period 2', teacher: '', room: '', time: '10:30'},
                      {name: 'Recess',   teacher: '', room: '', time: '11:25'},
                      {name: 'Period 3', teacher: '', room: '', time: '11:45'},
                      {name: 'Lunch',    teacher: '', room: '', time: '12:40'},
                      {name: 'Period 4', teacher: '', room: '', time: '13:20'},
                      {name: 'Period 5', teacher: '', room: '', time: '14:20'}]

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
    
      // return monday/tuesday
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

      // return wed/thu
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
        
      // return friday
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
    
    let daytimetable = timetable
    
    let bells = this.getBelltimes(daytimetable)
    
    let periods = this.getClasses(daytimetable, bells)
    
    this.getChanges(periods, daytimetable)
    
    let routine = daytimetable['timetable']['timetable']['routine']
    
    // Lunch is 5, Recess is 6
    const lunch = { name: 'Lunch',
                    teacher: '',
                    room: '',
                    time: bells[5],
                    changed: [] }

    const recess = { name: 'Recess',
                     teacher: '',
                     room: '',
                     time: bells[6],
                     changed: [] }
    
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
    
    // periods is a JSON, not an array - starts from '1'
    let periods = daytimetable['timetable']['timetable']['periods']
    for (var i=0; i<5; i++) {
      let thisPeriod = periods[i+1]
      if (thisPeriod !== undefined) {
        const name = thisPeriod['year'] + thisPeriod['title']
        
        // handle any bugs with the API
        let teacherName = thisPeriod['fullTeacher']
        if (teacherName === '') {
          teacherName = thisPeriod['teacher']
        }
        
        returnData[i] = { name: subjects[name]['title'],
                          teacher: teacherName,
                          room: thisPeriod['room'],
                          time: bells[i][0],
                          fullName: subjects[name]['subject'],
                          changed: [] }
        
      } else {
        returnData[i] = { name: 'Period ' + (i+1),
                          teacher: '',
                          room: '' ,
                          time: bells[i][0],
                          changed: [] }
      }
      
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
    for (var i=0; i<numBells; i++) {
      let thisBell = bells[i]
      
      switch (thisBell['bell']) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5': returnVar[(thisBell['bell'] - 1)] = [thisBell['time'], (thisBell['reasonShort'] === '')]; break
      case 'Lunch 1': returnVar[5] = [thisBell['time'], (thisBell['reasonShort'] === '')]; break;
      case 'Recess': returnVar[6] = [thisBell['time'], (thisBell['reasonShort'] === '')]; break;
      }
    }
    return returnVar
  }
  
  // get room and teacher changes for today
  getChanges(periods, timetable) {
  
    // Get room variations - change in rooms
    const roomVariations = timetable['roomVariations']
    console.log(roomVariations)
    // TODO: Needs testing
    if (timetable['roomVariations'] !== undefined) {
      const numVariations = Object.keys(roomVariations).length
      for (var i=0; i<numVariations; i++) {
        const periodNo = Object.keys(roomVariations)[i]
        periods[periodNo-1].room = roomVariations[i]['roomTo']
        periods[periodNo-1].changed.push('room')
      }
    }
    
    // Get class variations - change in teachers
    const classVariations = timetable['classVariations']
    if (timetable['classVariations'] !== undefined) {
    
      // get number of variations (changed periods)
      const numVariations = Object.keys(classVariations).length
      
      // iterate through all variations
      for (var i=0; i<numVariations; i++) {
        const periodNo = Object.keys(classVariations)[i]
        // nocover = study period
        if (classVariations[periodNo]['type'] === 'nocover') {
          periods[periodNo-1] = { name: periods[periodNo-1].name,
                                teacher: '',
                                room: '',
                                time: periods[periodNo-1].time}
          periods[periodNo-1].changed.push('noclass')
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
    
    const nameTextClass = 'uk-text-middle uk-text-lead '
    const teacherTextClass = 'uk-text-meta uk-text-top uk-text-left '
    const roomTextClass = 'uk-text-middle uk-table-shrink uk-text-lead '
    
    for (var i=0; i<numPeriods; i++) {
      
      let thisPeriod = periods[i]
      
      const noClass = thisPeriod.changed.includes('noclass')
      const roomChange = thisPeriod.changed.includes('room')
      const teacherChange = thisPeriod.changed.includes('teacher')
      const bellChange = thisPeriod.changed.includes('bells')
  
      
      // Lunch, recess or study periods
      if (thisPeriod.room === '') {

        thisPeriod.name = (<dd className={nameTextClass + 'uk-text-muted ' + (noClass ? 'uk-text-primary' : '')}>{thisPeriod.name}</dd>)
        thisPeriod.teacher = (<dd> </dd>)
        thisPeriod.room = (<td className={roomTextClass + 'uk-text-muted ' + (bellChange ? 'uk-text-primary' : '')}>{thisPeriod.time}</td>)
        
      // normal periods
      } else {
        
        thisPeriod.name = (<dd className={nameTextClass + (noClass ? 'uk-text-primary' : '')}>{thisPeriod.name}</dd>)
        thisPeriod.teacher = (<dd className={teacherTextClass + ((teacherChange || bellChange) ? 'uk-text-primary' : '')}>at {thisPeriod.time} with {thisPeriod.teacher}</dd>)
        thisPeriod.room = (<td className={roomTextClass + (roomChange ? 'uk-text-primary' : '')}>{thisPeriod.room}</td>)
      }
      
    }
    
    return (<div className='uk-flex uk-flex-center'>
            <table className='uk-table uk-table-hover uk-table-small uk-width-4-5@s'>
              <tbody>
                <tr>
                  <td className='uk-text-lead uk-text-left'>
                    {periods[0].name}
                    {periods[0].teacher}
                  </td>
                  {periods[0].room}
                </tr>
            
                <tr>
                  <td className='uk-text-lead uk-text-left'>
                    {periods[1].name}
                    {periods[1].teacher}
                  </td>
                  {periods[1].room}
                </tr>
            
                <tr>
                  <td className='uk-text-lead uk-text-left'>
                    {periods[2].name}
                    {periods[2].teacher}
                  </td>
                  {periods[2].room}
                </tr>
            
                <tr>
                  <td className='uk-text-lead uk-text-left'>
                    {periods[3].name}
                    {periods[3].teacher}
                  </td>
                  {periods[3].room}
                </tr>
            
                <tr>
                  <td className='uk-text-lead uk-text-left'>
                    {periods[4].name}
                    {periods[4].teacher}
                  </td>
                  {periods[4].room}
                </tr>
            
                <tr>
                  <td className='uk-text-lead uk-text-left'>
                    {periods[5].name}
                    {periods[5].teacher}
                  </td>
                  {periods[5].room}
                </tr>
            
                <tr>
                  <td className='uk-text-lead uk-text-left'>
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
    
    
    
    // if timetable exists and is current (i.e. it is not past 3:15pm), use the timetable periods
    // nested if's are used for readability
    if (timetable !== '') {
    
      let timetableDate = new Date(JSON.parse(timetable)['date'])
      
      let timetableIsTodayBefore315 = ((date.getDay() === timetableDate.getDay()) && (date.getHours() < 15 || (date.getHours() === 15 && date.getMinutes() < 15)))
      
      let timetableIsForTheFuture = (date < timetableDate && !(date.getDay() === timetableDate.getDay))
      
      if (timetableIsTodayBefore315 || timetableIsForTheFuture) {
      
        periods = this.getDailyTimetable(JSON.parse(timetable))
        let dateOfPeriods = new Date(JSON.parse(timetable)['date'])
        let bells = JSON.parse(timetable)['bells']
        schedule = this.getSchedule(periods, dateOfPeriods, bells)
      }
      // otherwise, use default periods
    } else {
    
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
    }))
    
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
    
    // remove any non-period classes
    for (var i=0; i < periodsCopy.length; i++) {
    
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
      <div className='uk-flex uk-flex-center uk-text-center uk-margin-left uk-margin-right uk-margin-top'>
        <div className='uk-card uk-card-default uk-card-body uk-card large uk-width-1-4@xxl uk-width-1-3@xl uk-width-2-5@l uk-width-1-2@m uk-width-2-3@s uk-width-3-5@xs '>
        
          <h3 className='uk-h3'><b>{nextClass}</b></h3>
          <p> in </p>
          <h1 className='uk-heading-line'><span>{timeLeft}</span></h1>
          <p> <br/> </p>
          {this.state.htmlClasses}
        </div>
      </div>
    )
  }
  
  // this is called each time the timer executes
  timerTick() {
    const date = new Date()

    if (this.state.timer <= 0) {
      let nextClass = this.getNextClass()

      this.setState( ()=> ({
        nextClass: nextClass
      }))
    }
    
    const secDifference = Math.floor((this.state.nextClass.time.getTime() - date.getTime())/1000)
    this.setState( ()=> ({
      timer: secDifference
    }))
    
    this.render()
  }
  
  componentDidMount() {
    // set up timer

    let ID = setInterval(this.timerTick.bind(this), 1000)

    // save timer ID so we can remove the timer later
    this.setState({timerID: ID})
    
    // get API data here
    this.getAPIData = this.getAPIData.bind(this)
    this.getAPIData()

  }
  
  componentWillUnmount() {
    // remove timer after unmount
    clearInterval(this.state.timerID)
  }
}

export default Dashboard

// Old timer code that relies on Javascript timers (inaccurate)
      /*if (this.state.timer === 0) {
        let nextClass = this.getNextClass()
       
        // setup countdown for next class
        const date = new Date()
        const secDifference = Math.floor((nextClass.time.getTime() - date.getTime())/1000)
        this.setState( ()=> ({
          timer: secDifference,
          nextClass: nextClass.name
        }))
      } else {
        this.setState( ()=> ({
          timer: this.state.timer - 1
        }))
      }*/
