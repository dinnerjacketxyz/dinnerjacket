import React, { Component } from 'react'
const http = require('http')
const css= require('./Timetable.css')

//Variables for the small timetable
let tabArray = ['MON', 'TUE', 'WED', 'THU', 'FRI','A','B','C']
let week = 'A' //decides what week to display by default
let day = 'MON' //decides what day to display by default

//Variables for the data of both timetables
let timetableData = '' //Raw api return

let html = []
let p = []

let subject = ''
let leave = ''
let posArray = []
let fadeArray = []
let subjectOnly = []

let fullTable
let smallTable

class Timetable extends Component {
  constructor(props) {
    super(props)
    //week = window.bells.weekType
    //day = window.bells.day.substring(0,3).toUpperCase()
    
    //(window.day, window.week)

    day = (window.day == undefined) ? window.bells.day.substring(0, 3).toUpperCase() : window.day
    week = (window.week == undefined) ? window.bells.weekType : window.week
  }

  highlightBigDay(week, day) {
    let temp = day.toLowerCase().substring(0,2) + week
    let dayHeading = document.getElementById(temp)
    dayHeading.className = 'currentDay'
  }

  componentDidMount() {
    let card = document.getElementById('vcNavbarCard')
    console.log(localStorage.getItem('forceSmallTable'))
    card.className = localStorage.getItem('forceSmallTable')


   this.initialise()
   let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
    this.highlightBigDay(week,day)
 }

 componentWillUnmount() {
  let content = document.getElementById('content')
  content.className = 'full'
 }

 //does pretty much everything for the big timetable
 generateTTable() {
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
             html[storageCounter] = `<td id='${u},${i-1}'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
           } else if (p[u][i].room == '') {
             html[storageCounter] = `<td id='${u},${i-1}'>${p[u][i].title}&nbsp;&nbsp;&nbsp;-&nbsp;</td>`
           } else {
             html[storageCounter] = `<td id='${u},${i-1}'>${p[u][i].title}&nbsp;&nbsp;${p[u][i].room}</td>`
           }
           storageCounter++
         }
       }

        //rotates the arrays 90 degrees
        let temp1 = this.rearrange(html.slice(0,25))
        let temp2 = this.rearrange(html.slice(25,50))
        let temp3 = this.rearrange(html.slice(50,75))

        html = temp1.concat(temp2)
        p = html.concat(temp3)
        
        this.distributor()
 }

 distributor(){
  let dist = 0
  for (let u = 0; u <= 74; u++){
    let divide = (u/5).toString()
    if (u>49) { dist = divide.slice(0,2)}
    else{dist = (divide[0])}
    let row = document.getElementById(`r${dist}`)
    row.innerHTML += p[u]
  }
 }

 rearrange(array) {
  let rearrangeCount = 0
  let returnArray = []
  for (let u = 0; u <= 4; u++) {
    for (let x = 0;x <= 4; x++) {
      returnArray[rearrangeCount] = array[x*5+u]
      rearrangeCount++
    }
  }
  return returnArray
 }

 initialise() {
   //clears variables so you can initialise multiple times
   timetableData = window.timetable
   html = []
   p = []
   //generates the timetable
   this.generateTTable()
   //Puts your name at the top
   let name = document.getElementById('ttableName')
   name.innerHTML = `${timetableData.student.givenname}&nbsp;${timetableData.student.surname}`
   //////(timetableData.subjects)
   this.activeTab()
   this.subjectOnly()
 }

 subjectOnly() {
  let temp1 = []
  for (let u = 1; u <= 15; u++) {
    let index = u-1
    temp1[index]= timetableData.days[u].periods
  }
  let storageCounter = 0
  for (let u = 0; u <= 14; u++) {
    for (let i = 1; i <= 5; i++) {
      if (temp1[u][i] == undefined) {
        subjectOnly[storageCounter] = ' '
      } else if (p[u][i].room == '') {
        subjectOnly[storageCounter] = temp1[u][i].title
      } else {
        subjectOnly[storageCounter] = temp1[u][i].title
      }
      storageCounter++
    }
  }
 }

 blankTab() {
   for (let x = 0;x<tabArray.length;x++) {
     let unactive = document.getElementById(tabArray[x])
     unactive.className = ''
   }
 }

 smallInput (e) {
   if (document.getElementById(e.target.innerHTML)!=null) {
    if(e.target.innerHTML.length == 1) {
       week = e.target.innerHTML
       window.week = week
     } else {
       day = e.target.innerHTML
       window.day = day
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

 bigInput(e){
    subject = e.target.innerHTML.slice(0,4)
    if (subject.slice(2,3)=='&'){subject = e.target.innerHTML.slice(0,2)}
    else if (subject.slice(3,4)=='&'){subject = e.target.innerHTML.slice(0,3)}
    else {subject=''}
 }

 subjectHighlight(){
  if (subject != '') {
    let start = 0
    let indexArray = []
    while (subjectOnly.indexOf(subject,start)!=-1) {
      //if (subjectOnly.indexOf(subject,start)!=-1) {}
      indexArray.push(subjectOnly.indexOf(subject,start))
      start = subjectOnly.indexOf(subject,start)+1
    }
    this.calcPos(indexArray)
  }
 }

 calcPos(array){
  let row = 0
  let day = 0
  for (let u = 0; u < array.length; u++){
    let day = this.specialRound(array[u])
    let row = array[u]%5
    posArray.push(day+','+row)
  }
  this.dispHighlight(posArray)
  fadeArray = posArray
  
  posArray = []
 }

 dispHighlight(array) {
  this.blankHighlight()
  for (let u = 0; u < array.length; u++){
    let highlight = document.getElementById(array[u])
    highlight.className = 'highlight'
  }
 }

 blankHighlight(){
  for (let u = 0; u <= 14; u++) {
    for (let i = 0; i <= 4; i++) {
      let highlight = document.getElementById(u+','+i)
      highlight.className = ''
    }
  }
 }

 specialRound(num){
  let divide = (num/5).toString()
  if (divide>10) { return divide.slice(0,2)}
  else{return (divide[0])}
 }

 fade(){
  setTimeout(function() { //TODO MAKE SURE THIS ONLY EXECUTES WHEN TIMETABLE IS OPEN
    for (let u = 0; u < fadeArray.length; u++){
      let highlight = document.getElementById(fadeArray[u])
      highlight.className = ''
     }
   }, 2000)
 }

  // <button onClick={this.initialise.bind(this)}>Test</button>

  render() {
   //this.initialise()
   return (
        <div id='vcNavbarCard'>
          <div id='fullTimetable' className='ttableCard card uk-animation-slide-top-small' onMouseLeave={this.fade.bind(this)}>
            <h3 className='uk-heading-line uk-text-center'>
              <span id='ttableName'/>
            </h3>
            <div className='uk-padding-top uk-text-center'>
              <table className="uk-table uk-table-small">
                <thead>
                  <tr>
                    <th id='moA'>MON A</th>
                    <th id='tuA'>TUE A</th>
                    <th id='weA'>WED A</th>
                    <th id='thA'>THU A</th>
                    <th id='frA'>FRI A</th>
                  </tr>
                </thead>
                <tbody id='wA' className='timetable' onMouseOver={this.subjectHighlight.bind(this)}>
                  <tr id='r0' onMouseOver={this.bigInput}></tr>
                  <tr id='r1' onMouseOver={this.bigInput}></tr>
                  <tr id='r2' onMouseOver={this.bigInput}></tr>
                  <tr id='r3' onMouseOver={this.bigInput}></tr>
                  <tr id='r4' onMouseOver={this.bigInput}></tr>
                </tbody>
              </table>
            </div>
            <hr/>
            <div className='uk-padding-top uk-text-center'>
              <table className="uk-table uk-table-small">
                  <thead>
                      <tr>
                          <th id='moB'>MON B</th>
                          <th id='tuB'>TUE B</th>
                          <th id='weB'>WED B</th>
                          <th id='thB'>THU B</th>
                          <th id='frB'>FRI B</th>
                      </tr>
                  </thead>
                  <tbody id='wB' className='timetable'onMouseOver={this.subjectHighlight.bind(this)}>
                    <tr id='r5' onMouseOver={this.bigInput}></tr>
                    <tr id='r6' onMouseOver={this.bigInput}></tr>
                    <tr id='r7' onMouseOver={this.bigInput}></tr>
                    <tr id='r8' onMouseOver={this.bigInput}></tr>
                    <tr id='r9' onMouseOver={this.bigInput}></tr>
                  </tbody>
              </table>
            </div>
            <hr/>
            <div className='uk-padding-top uk-text-center'>
              <table className="uk-table uk-table-small">
                  <thead>
                      <tr>
                          <th id='moC'>MON C</th>
                          <th id='tuC'>TUE C</th>
                          <th id='weC'>WED C</th>
                          <th id='thC'>THU C</th>
                          <th id='frC'>FRI C</th>
                      </tr>
                  </thead>
                  <tbody id='wC' className='timetable' onMouseOver={this.subjectHighlight.bind(this)} >
                    <tr id='r10' onMouseOver={this.bigInput}></tr>
                    <tr id='r11' onMouseOver={this.bigInput}></tr>
                    <tr id='r12' onMouseOver={this.bigInput}></tr>
                    <tr id='r13' onMouseOver={this.bigInput}></tr>
                    <tr id='r14' onMouseOver={this.bigInput}></tr>
                  </tbody>
              </table>
            </div>
            </div>
          
          <div id='smallTimetable' className='ttableCard card uk-animation-slide-top-small' onClick={this.activeTab.bind(this)}>
            <ul className='uk-flex-center uk-tab' onClick={this.smallInput}>
              <li id='A'><a>A</a></li>
              <li id='B'><a>B</a></li>
              <li id='C'><a>C</a></li>
            </ul>
            <ul className='uk-flex-center uk-tab' onClick={this.smallInput}>
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
