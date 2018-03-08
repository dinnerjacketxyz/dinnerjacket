import React, { Component } from 'react'
const http = require('http')

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
        dayOutput += `<p>&nbsp;</p>`
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
    this.generateClassList()
    this.generateStudentInfo()
  }

  generateClassList() {
    let classList = ''
    let z = 1
    while (timetableData.subjects[z] != -1) {
      //console.log(timetableData.subjects[z])
      if (timetableData.subjects[z]!=-1) {
        classList += `<p>${timetableData.subjects[z].title}</p>`
      }
      z++
    }
    let list = document.getElementById('classList')
    list.innerHTML = classList
  }

  generateStudentInfo() {
    let adviser = timetableData.subjects[17]
    let info = ''
    info =
    `<p>${timetableData.subjects[15].title}</p>
     <p>Student Adviser: ${timetableData.subjects[17].fullTeacher}</p>
     <p>ID: ${timetableData.student.studentId}</p>`
    if (timetableData.student.BoSNumber != 0) {
      info += `<p>BOS: ${timetableData.student.BoSNumber}</p>`
    }
    let studentInfo = document.getElementById('studentInfo')
    studentInfo.innerHTML = info
  }

  // <button onClick={this.initialise.bind(this)}>Test</button>

  render() {
    //this.initialise()
    return (
      <div className='uk-flex uk-flex-center uk-margin-top'>
        <div className='uk-column-1-1@m'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <h3 id='name' className='uk-text-center uk-h3 uk-margin-small-bottom uk-text-bold'></h3>
            <div className='uk-box-shadow-hover-small uk-padding-small uk-text-center'>
              <div className='uk-column-1-5 uk-column-divider uk-text-muted uk-margin-small-left uk-margin-small-right'>
                <p>MON A</p>
                <p>TUE A</p>
                <p>WED A</p>
                <p>THU A</p>
                <p>FRI A</p>
              </div>
              <div id='weekA' className='uk-column-1-5 uk-column-divider uk-margin-small-left uk-margin-small-right'>
              </div>
            </div>

            <div className='uk-box-shadow-hover-small uk-padding-small uk-text-center'>
              <div className='uk-column-1-5 uk-column-divider uk-text-muted uk-margin-small-left uk-margin-small-right'>
                  <p>MON B</p>
                  <p>TUE B</p>
                  <p>WED B</p>
                  <p>THU B</p>
                  <p>FRI B</p>
              </div>
              <div id='weekB' className='uk-column-1-5 uk-column-divider uk-margin-small-left uk-margin-small-right'>
              </div>
            </div>

            <div className='uk-box-shadow-hover-small uk-padding-small uk-text-center'>
              <div className='uk-column-1-5 uk-column-divider uk-text-muted uk-margin-small-left uk-margin-small-right'>
                <p>MON C</p>
                <p>TUE C</p>
                <p>WED C</p>
                <p>THU C</p>
                <p>FRI C</p>
              </div>
              <div id='weekC' className='uk-column-1-5 uk-column-divider uk-margin-small-left uk-margin-small-right'>
              </div>
            </div>
            <div className='uk-grid uk-child-width-1-2'>
              <div className=''>
                <h3 className='uk-card-title uk-text-center uk-margin-small-bottom uk-text-bold'>Classes</h3>
                <div className='noBreak uk-text-center' id='classList'></div>
              </div>
              <div>
                <h3 className='uk-card-title uk-text-center uk-margin-small-bottom uk-text-bold'>Student Information</h3>
                <div id='studentInfo' className='uk-text-center'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Timetable
