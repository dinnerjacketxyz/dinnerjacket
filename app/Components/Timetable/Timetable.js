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

let finalA = []//
let finalB = []// Formatted for html display
let finalC = []//

let html = []
let p = []

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

 displayWeek(weekA,weekB,weekC) {
   let A = document.getElementById('weekA')
   A.innerHTML = weekA
   let B = document.getElementById('weekB')
   B.innerHTML = weekB
   let C = document.getElementById('weekC')
   C.innerHTML = weekC
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
             html[storageCounter] = `<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
           } else if (p[u][i].room == '') {
             html[storageCounter] = `<td>${p[u][i].title}&nbsp;&nbsp;&nbsp;-&nbsp;</td>`
           } else {
             html[storageCounter] = `<td>${p[u][i].title}&nbsp;&nbsp;${p[u][i].room}</td>`
           }
           storageCounter++
         }
       }

       //sorts any array of 75 into three arrays of 25
        storageCounter = -1
        for (let u = 0; u <= 74; u++) {
          storageCounter++
          if (u<25) {finalA[storageCounter] = html[u]} 
          else if (u<50) {finalB[storageCounter] = html[u]} 
          else if (u<75) {finalC[storageCounter] = html[u]}
          if (storageCounter == 24){storageCounter = -1}
        }

        //rotates the arrays 90 degrees
        outputA = this.rearrange(finalA)
        outputB = this.rearrange(finalB)
        outputC = this.rearrange(finalC)

        //adds table rows at the center of the array
       for (let u =1; u<=4; u++) {
         let insertIndex = u*6-1
         outputA.splice(insertIndex,0,'</tr><tr>')
         outputB.splice(insertIndex,0,'</tr><tr>')
         outputC.splice(insertIndex,0,'</tr><tr>')
       }

       //adds the table rows on the ends and joins the arrays
       finalA = this.finalStep(outputA)
       finalB = this.finalStep(outputB)
       finalC = this.finalStep(outputC)

       this.displayWeek(finalA, finalB, finalC)
 }

 finalStep(array){
  array.unshift('<tr>')
  array.push('</tr>')
  array = array.join()
  array = array.replace(/,/g,"")
  return array
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
   outputA = []
   outputB = []
   outputC = []
   finalA = []
   finalB = []
   finalC = []
   p = []
   //generates the timetable
   this.generateTTable()
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

