import React, { Component } from 'react'
const http = require('http')
const css= require('./Timetable.css')

let tabArray = ['MON', 'TUE', 'WED', 'THU', 'FRI','A','B','C']
let week = 'A'
let day = 'MON'

let timetableData = ''
let outputA = ''
let outputB = ''
let outputC = ''
let dayOutput = ''


class Timetable extends Component {
  constructor(props) {
    super(props)

  }

  componentDidMount() {
    this.initialise()
  }

  displayWeek(outputA, outputB, outputC) {
    let A = document.getElementById('weekA')
    A.innerHTML = outputA
    let B = document.getElementById('weekB')
    B.innerHTML = outputB
    let C = document.getElementById('weekC')
    C.innerHTML = outputC
  }

  generateWeek() {
    //generates the first week
    for (let i = 1; i <= 5; i++) {
      let day = timetableData.days[i].periods
      outputA += this.generatePeriod(day)
    }
    //generates the second week
    for (let i = 6; i <= 10; i++) {
      let day = timetableData.days[i].periods
      outputB += this.generatePeriod(day)
    }
    //generates the third week
    for (let i = 11; i <= 15; i++) {
      let day = timetableData.days[i].periods
      outputC += this.generatePeriod(day)
    }
    this.displayWeek(outputA, outputB, outputC)
  }

  generatePeriod(day) {
    dayOutput = ''
    for (let u = 1; u <= 5; u++) {
      if (day[`${u}`] == undefined) {
        dayOutput += `<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>`
      } else if (day[`${u}`].room == '') {
        dayOutput += `<p>${day[`${u}`].title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>`
      } else {
        dayOutput += `<p>${day[`${u}`].title}&nbsp;&nbsp;${day[`${u}`].room}</p>`
      }
    }
    return dayOutput
  }

  initialise() {
    //clears variables so you can initialise multiple times
    timetableData = window.timetable

    outputA = ''
    outputB = ''
    outputC = ''
    //generates the timetable
    this.generateWeek()
    //Puts your name at the top
    let name = document.getElementById('name')
    name.innerHTML = `${timetableData.student.givenname}&nbsp;${timetableData.student.surname}`
    //console.log(timetableData.subjects)
    this.activeTab()
  }

  blankTab() {
    for (let x = 0;x<tabArray.length;x++) {
      let unactive = document.getElementById(tabArray[x])
      unactive.className = ''
    }
  }

  input (e) {
    if (document.getElementById(e.target.innerHTML)!=null) {
      if(e.target.innerHTML.length == 1) {
        week = e.target.innerHTML
      } else {
        day = e.target.innerHTML
      }
    }
  }

  activeTab() {
    if (document.getElementById(day)!=null && document.getElementById(week)!=null) {
      this.blankTab()
      let activeDay = document.getElementById(day)
      let activeWeek = document.getElementById(week)
      activeDay.className = 'uk-active'
      activeWeek.className = 'uk-active'
      this.displaySmall()
    }
  }

  displaySmall() {
    let dayNum = tabArray.indexOf(`${day}`)
    if (week == 'A') {
      dayNum += 1
    } else if (week == 'B') {
      dayNum += 6
    } else if (week === 'C') {
      dayNum += 11
    }

    let smallOutput = ''
    let smallDay = timetableData.days[dayNum].periods

    for (let u = 1; u <= 5; u++) {
      if (smallDay[`${u}`] == undefined) {
        smallOutput += `<tr><td>-</td><td>-</td></tr>`
      } else if (smallDay[`${u}`].room == '') {
        smallOutput += `<tr><td>${smallDay[`${u}`].title}</td><td>-</td></tr>`
      } else {
        smallOutput += `<tr><td>${smallDay[`${u}`].title}</td><td>${smallDay[`${u}`].room}</td></tr>`
      }
    }
    let small = document.getElementById('smallTable')
    small.innerHTML = smallOutput
  }

  // <button onClick={this.initialise.bind(this)}>Test</button>

  render() {
    //this.initialise()
    return (
        <div className='uk-flex uk-flex-center'>
          <div id='fullTimetable' className='uk-card uk-card-default uk-width-xlarge uk-card-body uk-animation-slide-top-small uk-margin-top miniFill'>
            <h3 className='uk-heading-line uk-text-center'>
              <span id='name'/>
            </h3>
            <div className='uk-box-shadow-hover-small uk-padding-small uk-text-center'>
              <div className='uk-column-1-5 uk-text-muted uk-margin-small-left uk-margin-small-right'>
                <p>MON A</p>
                <p>TUE A</p>
                <p>WED A</p>
                <p>THU A</p>
                <p>FRI A</p>
              </div>
              <div id='weekA' className='uk-column-1-5 uk-margin-small-left uk-margin-small-right timetable'>
              </div>
            </div>
            <hr/>
            <div className='uk-box-shadow-hover-small uk-padding-small uk-text-center'>
              <div className='uk-column-1-5 uk-text-muted uk-margin-small-left uk-margin-small-right'>
                  <p>MON B</p>
                  <p>TUE B</p>
                  <p>WED B</p>
                  <p>THU B</p>
                  <p>FRI B</p>
              </div>
              <div id='weekB' className='uk-column-1-5 uk-margin-small-left uk-margin-small-right timetable'>
              </div>
            </div>
            <hr/>
            <div className='uk-box-shadow-hover-small uk-padding-small uk-text-center'>
              <div className='uk-column-1-5 uk-text-muted uk-margin-small-left uk-margin-small-right'>
                <p>MON C</p>
                <p>TUE C</p>
                <p>WED C</p>
                <p>THU C</p>
                <p>FRI C</p>
              </div>
              <div id='weekC' className='uk-column-1-5 uk-margin-small-left uk-margin-small-right timetable'>
              </div>
            </div>
          </div>
          <div id='smallTimetable' className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small uk-margin-top miniFill' onClick={this.activeTab.bind(this)}>
            <ul className='uk-flex-center uk-tab' onClick={this.input}>
              <li id='A'><a>A</a></li>
              <li id='B'><a>B</a></li>
              <li id='C'><a>C</a></li>
            </ul>
            <ul className='uk-flex-center uk-tab' onClick={this.input}>
              <li id='MON'><a>MON</a></li>
              <li id='TUE'><a>TUE</a></li>
              <li id='WED'><a>WED</a></li>
              <li id='THU'><a>THU</a></li>
              <li id='FRI'><a>FRI</a></li>
            </ul>
            <table className='uk-table uk-table-hover timetable uk-text-center'>
              <tbody id='smallTable'></tbody>
            </table>
          </div>
        </div>
    )
  }
}

export default Timetable
