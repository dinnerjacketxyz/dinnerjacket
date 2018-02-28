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
    
    // Get timetable data from SBHS API
    http.get('/getdata?url=timetable/timetable.json', (res) => {
      res.setEncoding('utf8')
      res.on('data', (body) => {
        timetableData = JSON.parse(body)
      })
    })
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
      let day = timetableData.days[`${i}`].periods
      outputA += this.generatePeriod(day)
    }
    //generates the second week
    for (let i = 6; i <= 10; i++) {
      let day = timetableData.days[`${i}`].periods
      outputB += this.generatePeriod(day)
    }
    //generates the third week
    for (let i = 11; i <= 15; i++) {
      let day = timetableData.days[`${i}`].periods
      outputC += this.generatePeriod(day)
    }
    this.displayWeek(outputA, outputB, outputC)
  }

  generatePeriod(day) {
    dayOutput = ''
    for (let u = 1; u <= 5; u++) {
      if (day[`${u}`] == undefined) {
        dayOutput += `<p>${u}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </p>`
      } else {
        dayOutput += `<p>${u}: ${day[`${u}`].title}&nbsp;&nbsp;${day[`${u}`].room}</p>`
      }
    }
    return dayOutput
  }

  initialise() {
    //clears variables so you can initialise multiple times
    outputA = ''
    outputB = ''
    outputC = ''
    //generates the timetable
    this.generateWeek()
    //Puts your name at the top
    let name = document.getElementById('name')
    name.innerHTML = `${timetableData.student.givenname}&nbsp;${timetableData.student.surname}`
  }

  render() {
    return (
      <div className='uk-flex-center uk-flex uk-margin-top'>
        <button onClick={this.initialise.bind(this)}>Test</button>
        <div className='uk-card uk-card-default uk-card-body uk-card-small uk-width-3-5'>
          <h2 id='name' className="uk-text-center uk-h2 uk-margin-small-bottom"></h2>
          
          <div className="uk-box-shadow-hover-small uk-padding-small uk-text-center">
            <div className='uk-column-1-5 uk-text-center uk-text-muted'>
              <p>MON A</p>
              <p>TUE A</p>
              <p>WED A</p>
              <p>THU A</p>
              <p>FRI A</p>
            </div>
            <div id='weekA' className='uk-column-1-5 uk-column-divider uk-width-shrink uk-text-center'>
              <p>1: ENG &nbsp;&nbsp; 201</p>
              <p>2: MAT &nbsp;&nbsp; 101</p>
              <p>3: ENG &nbsp;&nbsp; 201</p>
              <p>4: MAT &nbsp;&nbsp; 101</p>
              <p>5: </p>

              <p>1: ENG &nbsp;&nbsp; 201</p>
              <p>2: MAT &nbsp;&nbsp; 101</p>
              <p>3: ENG &nbsp;&nbsp; 201</p>
              <p>4: MAT &nbsp;&nbsp; 101</p>
              <p>5: </p>

              <p>1: ENG &nbsp;&nbsp; 201</p>
              <p>2: MAT &nbsp;&nbsp; 101</p>
              <p>3: ENG &nbsp;&nbsp; 201</p>
              <p>4: MAT &nbsp;&nbsp; 101</p>
              <p>5: </p>

              <p>1: ENG &nbsp;&nbsp; 201</p>
              <p>2: MAT &nbsp;&nbsp; 101</p>
              <p>3: ENG &nbsp;&nbsp; 201</p>
              <p>4: MAT &nbsp;&nbsp; 101</p>
              <p>5: </p>

              <p>1: ENG &nbsp;&nbsp; 201</p>
              <p>2: MAT &nbsp;&nbsp; 101</p>
              <p>3: ENG &nbsp;&nbsp; 201</p>
              <p>4: MAT &nbsp;&nbsp; 101</p>
              <p>5: </p>
            </div>
          </div>

          <div className="uk-box-shadow-hover-small uk-padding-small uk-width-shrink uk-text-center">
            <div className='uk-column-1-5 uk-text-center uk-text-muted'>
                <p>MON B</p>
                <p>TUE B</p>
                <p>WED B</p>
                <p>THU B</p>
                <p>FRI B</p>
            </div>
            <div id='weekB' className='uk-column-1-5 uk-column-divider uk-width-auto'>
              <p>1: &emsp; ENG &emsp; &emsp; 201</p>
              <p>2: &emsp; MAT &emsp; &emsp; 101</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; MAT &emsp; &emsp; 101</p>
              <p>5: &emsp;</p>

              <p>1: &emsp; MAT &emsp; &emsp; 101</p>
              <p>2: &emsp; </p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; MAT &emsp; &emsp; 101</p>
              <p>5: &emsp; ENG &emsp; &emsp; 201</p>

              <p>1: &emsp; ENG &emsp; &emsp; 201</p>
              <p>2: &emsp; MAT &emsp; &emsp; 101</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; </p>
              <p>5: &emsp; </p>

              <p>1: &emsp; MAT &emsp; &emsp; 101</p>
              <p>2: &emsp; ENG &emsp; &emsp; 201</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; ENG &emsp; &emsp; 201</p>
              <p>5: &emsp;</p>

              <p>1: &emsp; </p>
              <p>2: &emsp; ENG &emsp; &emsp; 201</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; MAT &emsp; &emsp; 101</p>
              <p>5: &emsp; MAT &emsp; &emsp; 101</p>
            </div>
          </div>

          <div className="uk-box-shadow-hover-small uk-padding-small uk-width-shrink uk-text-center">
            <div className='uk-column-1-5 uk-text-center uk-text-muted'>
              <p>MON C</p>
              <p>TUE C</p>
              <p>WED C</p>
              <p>THU C</p>
              <p>FRI C</p>
            </div>
            <div id='weekC' className='uk-column-1-5 uk-column-divider uk-width-auto'>
              <p>1: &emsp; ENG &emsp; &emsp; 201</p>
              <p>2: &emsp; MAT &emsp; &emsp; 101</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; MAT &emsp; &emsp; 101</p>
              <p>5: &emsp;</p>

              <p>1: &emsp; MAT &emsp; &emsp; 101</p>
              <p>2: &emsp; </p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; MAT &emsp; &emsp; 101</p>
              <p>5: &emsp; ENG &emsp; &emsp; 201</p>

              <p>1: &emsp; ENG &emsp; &emsp; 201</p>
              <p>2: &emsp; MAT &emsp; &emsp; 101</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; </p>
              <p>5: &emsp; </p>

              <p>1: &emsp; MAT &emsp; &emsp; 101</p>
              <p>2: &emsp; ENG &emsp; &emsp; 201</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; ENG &emsp; &emsp; 201</p>
              <p>5: &emsp;</p>

              <p>1: &emsp; </p>
              <p>2: &emsp; ENG &emsp; &emsp; 201</p>
              <p>3: &emsp; ENG &emsp; &emsp; 201</p>
              <p>4: &emsp; MAT &emsp; &emsp; 101</p>
              <p>5: &emsp; MAT &emsp; &emsp; 101</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Timetable
