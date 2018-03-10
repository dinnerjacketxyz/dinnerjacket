import React, { Component } from 'react'
const http = require('http')
const css= require('./Timetable.css')

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
  }


  // <button onClick={this.initialise.bind(this)}>Test</button>

  render() {
    //this.initialise()
    return (
        <div className='uk-flex uk-flex-center'>
          <div className='uk-card uk-card-default uk-width-xlarge uk-card-body uk-animation-slide-top-small uk-margin-top miniFill'>
            <h3 className='uk-text-center uk-margin-small-bottom uk-heading-line'>
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
        </div>
    )
  }
}

export default Timetable
