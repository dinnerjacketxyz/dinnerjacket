import React, { Component } from 'react'
const http = require('http')
const css= require('./Timetable.css')

//Variables for the small timetable
let tabArray = ['MON', 'TUE', 'WED', 'THU', 'FRI','A','B','C']
let week = 'A' //decides what week to display by default
let day = 'MON' //decides what day to display by default

//Variables for the data of both timetables
let timetableData = '' //Raw api return
let outputA = [] //
let outputB = [] // Formatted for html display, in order of the top down, left to right
let outputC = [] //
let dayOutput = ''

let p = []
let final = []
let weekArray = []

class Timetable extends Component {
  constructor(props) {
    super(props)
    week = window.bells.weekType
    day = window.bells.day.substring(0,3).toUpperCase()
    console.log(week,day)
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

  //does pretty much everything for the big timetable
  generateWeek() {
        //goes through all fifteen days of the cycle and adds specifically the period data
        //indexed from one to fifteen because that's how the periods are index by the api
        for (let u = 1; u <= 15; u++) {
          let index = u-1
          p[index]= timetableData.days[u].periods
        }
        
        //counts the raw number of times the next look has iterated, so that every period gets its own index in the final array
        let storageCounter = 0
    
        //Puts the periods into html form
        //Goes through all fifteen days, this time it only has to deal with js indexing
        for (let u = 0; u <= 14; u++) {
          //Goes through all five periods of that day and puts it html form depending on its content
          for (let i = 1; i <= 5; i++) {
            if (p[u][i] == undefined) {
              final[storageCounter] = `<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
            } else if (p[u][i].room == '') {
              final[storageCounter] = `<td>${p[u][i].title}&nbsp;&nbsp;&nbsp;-&nbsp;</td>`
            } else {
              final[storageCounter] = `<td>${p[u][i].title}&nbsp;&nbsp;${p[u][i].room}</td>`
            }
            storageCounter++
          }
        }

        let multiple = 0
        let difference = 0
        let count = 0
        storageCounter = 0
        let periodCounter = 1
        //puts the rows in the right order and into output for weeks
        for (let u = 0; u <= 75; u++) {
          let sortNum = multiple*5+difference
          if (periodCounter<=25) {
            outputA[storageCounter] = final[sortNum]
          } else if (periodCounter<=50) {
            outputB[storageCounter] = final[sortNum]
          } else if (periodCounter<=75) {
            outputC[storageCounter] = final[sortNum]
          }
          multiple++
          periodCounter++
          count++
          storageCounter++
          if (count==5) {
            count=0
            multiple=0
            difference++
          }
          if (storageCounter == 25) {
            storageCounter = 0
          }
        }

        let end = false
        for (let u =1; u<=4; u++) {
          let insertIndex = u*6-1
          console.log(insertIndex)
          outputA.splice(insertIndex,0,'</tr><tr>')
          outputB.splice(insertIndex,0,'</tr><tr>')
          outputC.splice(insertIndex,0,'</tr><tr>')
        }

        outputA.unshift('<tr>')
        outputA.push('</tr>')
        outputA = outputA.join()
        outputA = outputA.replace(/,/g,"")
        let A = document.getElementById('weekA')
        A.innerHTML = outputA

        outputB.unshift('<tr>')
        outputB.push('</tr>')
        outputB = outputB.join()
        outputB = outputB.replace(/,/g,"")
        let B = document.getElementById('weekB')
        B.innerHTML = outputB

        outputC.unshift('<tr>')
        outputC.push('</tr>')
        outputC = outputC.join()
        outputC = outputC.replace(/,/g,"")
        let C = document.getElementById('weekC')
        C.innerHTML = outputC
  }

  initialise() {
    //clears variables so you can initialise multiple times
    timetableData = window.timetable

    //generates the timetable
    this.generateWeek()
    //Puts your name at the top
    let name = document.getElementById('name')
    name.innerHTML = `${timetableData.student.givenname}&nbsp;${timetableData.student.surname}`
    ////console.log(timetableData.subjects)
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
            <div className='uk-box-shadow-hover-small uk-padding-top uk-text-center'>
              <table className="uk-table uk-table-small">
                  <thead>
                      <tr>
                          <th>MON A</th>
                          <th>TUE A</th>
                          <th>WED A</th>
                          <th>THU A</th>
                          <th>FRI A</th>
                      </tr>
                  </thead>
                  <tbody className='timetable' id='weekA'>
                  </tbody>
              </table>
            </div>
            <hr/>
            <div className='uk-box-shadow-hover-small uk-padding-top uk-text-center'>
              <table className="uk-table uk-table-small">
                  <thead>
                      <tr>
                          <th>MON B</th>
                          <th>TUE B</th>
                          <th>WED B</th>
                          <th>THU B</th>
                          <th>FRI B</th>
                      </tr>
                  </thead>
                  <tbody className='timetable' id='weekB'>
                  </tbody>
              </table>
            </div>
            <hr/>
            <div className='uk-box-shadow-hover-small uk-padding-top uk-text-center'>
              <table className="uk-table uk-table-small">
                  <thead>
                      <tr>
                          <th>MON C</th>
                          <th>TUE C</th>
                          <th>WED C</th>
                          <th>THU C</th>
                          <th>FRI C</th>
                      </tr>
                  </thead>
                  <tbody className='timetable' id='weekC'>
                  </tbody>
              </table>
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
