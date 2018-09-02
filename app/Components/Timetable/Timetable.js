import React, { Component } from 'react'
const http = require('http')
const css = require('./Timetable.css')

//Variables for the small timetable
let tabArray = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'A', 'B', 'C']
let week = 'A' //decides what week to display by default
let day = 'MON' //decides what day to display by default

//Variables for the data of both timetables
let timetableData = '' //Raw api return

let tempArray1 = []
let finalArray = []

let subject = ''
let leave = ''
let posArray = []
let fadeArray = []
let mcFadeArr = []
let subjectOnly = []
let tempSO = []
let uniqueSubjects = []

let fullTable
let smallTable

let remArr = []
let mcNum = 0
let mcArr = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '',]

let validRoom = ['101', '102', '103', '104', '105', '106', '107', '108',
  '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215',
  '301', '302', '303', '304',
  '401', '402', '403', '404',
  '501', '502', '503', '504', '505', '506', '507',
  '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611',
  '701', '702', '703', '704', '705',
  '801', '802',
  '900', '901', '902', '903',
  'MPW', 'JLB', 'SLB'
]

class Timetable extends Component {
  /**
   * React lifecycle function that runs before code is mounted. 
   */
  constructor(props) {
    super(props)
    //inputs the current day and week
    day = (window.day == undefined) ? window.bells.day.substring(0, 3).toUpperCase() : window.day
    week = (window.week == undefined) ? window.bells.weekType : window.week

    timetableData = window.timetable
  }

  /**
   * React lifecycle function that runs after the code is mounted. 
   */
  componentDidMount() {
    //Generates a timetable array used globally
    this.generateTTableArray()

    //Distributes the timetable array to the correct table rows on the full size timetable
    this.distributor(finalArray)

    //Displays the user's name
    this.displayName()

    //Reads the settings (dynamic, force full, or force small)
    this.readTTableDisplaySettings()

    //Vertically centers the timetable card
    this.verticallyCenter()

    //Initialises the morning class
    this.readMorningClass()
    this.displayMorningClass()

    //Highlights the current day of school on both timetables
    this.currentDayFTTable(week, day)
    this.selectTabSTTable()
  }

  /**
   * Reads timetable display settings from local storage
   */
  readTTableDisplaySettings() {
    //Chooses what media rules apply to the timetable based on user settings.
    let card = document.getElementById('vcNavbarCard')
    if (localStorage.getItem('forceSmallTable') !== undefined
      && localStorage.getItem('forceSmallTable') !== null
      && localStorage.getItem('forceSmallTable') !== 'true'
      && localStorage.getItem('forceSmallTable') !== 'false') {
      //if the user settings exists and is not from a past version use it
      card.className = localStorage.getItem('forceSmallTable')
    } else {
      //if the user settings is invalid set the default
      localStorage.setItem('forceSmallTable', 'Dynamic')
      card.className = 'Dynamic'
    }
  }

  /**
   * Reads morning classes from local storage
   */
  readMorningClass() {
    if (localStorage.getItem('morningClasses') != null
    && localStorage.getItem('morningClasses') != undefined
    && localStorage.getItem('morningClasses') != 'undefined') {
      //defines a morning class array if valid morning classes stored are valid
      mcArr = localStorage.getItem('morningClasses').split(',')
    }
  }

  /**
   * Adds css that vertically centers the timetable
   */
  verticallyCenter() {
    //HTML required to vertically center the timetable
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
  }

  /**
   * Displays the users name
   */
  displayName() {
    //Puts your name at the top
    let name = document.getElementById('ttableName')
    name.innerHTML = `${timetableData.student.givenname}&nbsp;${timetableData.student.surname}`
  }

  /**
   * React lifecycle function that runs when the code is about to be unmounted. 
   * Makes sure the HTML does not vertically center the next mounted page.
   */
  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  /**
   * Highlights the current day in the three week timetable cycle
   * @param {string} week - The current week (A, B or C)
   * @param {string} day - The current day (MON, TUE, etc.)
   */
  currentDayFTTable(week, day) {
    let temp = day.toLowerCase().substring(0, 2) + week
    let dayHeading = document.getElementById(temp)
    dayHeading.className = 'currentDay'
  }

  /**
   * Selects the current day of school in the small timetable
   */
  selectTabSTTable() {
    if (document.getElementById(day) != null && document.getElementById(week) != null) {
      this.blankTab()
      let activeDay = document.getElementById(day)
      let activeWeek = document.getElementById(week)
      activeDay.className = 'uk-active'
      activeWeek.className = 'uk-active'
      this.displaySmall()
    }
  }

  /**
   * Generates a timetable array used globally
   */
  generateTTableArray() {
    //Goes through all fifteen days of the cycle and adds specifically the period data
    //indexed from one to fifteen because that's how the periods are index by the api

    for (let u = 1; u <= 15; u++) {

      let index = u - 1
      finalArray[index] = timetableData.days[u].periods
      tempSO[index] = timetableData.days[u].periods
    }

    //Counts the raw number of times the next look has iterated, so that every period gets its own index in the final array
    let storageCounter = 0

    //Puts the periods into html form
    //Goes through all fifteen days, this time it only has to deal with js indexing
    for (let u = 0; u <= 14; u++) {
      //Goes through all five periods of that day and puts it html form depending on its content
      for (let i = 1; i <= 5; i++) {
        if (finalArray[u][i] == undefined) {
          tempArray1[storageCounter] = `<td id='${u},${i - 1}'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>`
          subjectOnly[storageCounter] = ' '
        } else if (finalArray[u][i].room == '') {
          tempArray1[storageCounter] = `<td id='${u},${i - 1}'>${finalArray[u][i].title}&nbsp;&nbsp;&nbsp;-&nbsp;</td>`
          subjectOnly[storageCounter] = tempSO[u][i].title
        } else {
          tempArray1[storageCounter] = `<td id='${u},${i - 1}'>${finalArray[u][i].title}&nbsp;&nbsp;${finalArray[u][i].room}</td>`
          subjectOnly[storageCounter] = tempSO[u][i].title
        }
        storageCounter++
      }
    }

    //Rotates the arrays 90 degrees
    let temp1 = this.rotate90(tempArray1.slice(0, 25))
    let temp2 = this.rotate90(tempArray1.slice(25, 50))
    let temp3 = this.rotate90(tempArray1.slice(50, 75))

    //Joins the arrays together
    tempArray1 = temp1.concat(temp2)
    finalArray = tempArray1.concat(temp3)
  }

  /**
    * Rotates a 5x5 array array 90 degrees clockwise.
    * @param {array} array - A 5x5 array of one week
    * @returns {array} - The new rotated array 
    */
  rotate90(array) {
    let rearrangeCount = 0
    let returnArray = []
    for (let u = 0; u <= 4; u++) {
      for (let x = 0; x <= 4; x++) {
        returnArray[rearrangeCount] = array[x * 5 + u]
        rearrangeCount++
      }
    }
    return returnArray
  }

  /**
   * Rotates a 5x5 array array 90 degrees clockwise.
   * @param {array} finalArray - the final array of periods in html form to be outputted
   */
  distributor(array) {
    //The 'id' variable is set to the correct row id for the periods to be placed in
    for (let u = 0; u <= 74; u++) {
      let id = this.specialRound(u)
      let row = document.getElementById(`row${id}`)
      row.innerHTML += array[u]
    }
  }

  //Divides numbers from 0-75 by 5 and returns the whole number (e.g. input: 9.6; ouput: 9)
  specialRound(num) {
    let divide = (num / 5).toString()
    if (num > 49) {
      return divide.slice(0, 2)
    }
    else {
      return (divide[0])
    }
  }

  blankTab() {
    for (let x = 0; x < tabArray.length; x++) {
      let unactive = document.getElementById(tabArray[x])
      unactive.className = ''
    }
  }

  smallInput(e) {
    if (document.getElementById(e.target.innerHTML) != null) {
      if (e.target.innerHTML.length == 1) {
        week = e.target.innerHTML
        window.week = week
      } else {
        day = e.target.innerHTML
        window.day = day
      }
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

    let xyzz = dayNum - 1

    let smallOutput = ''
    let smallDay = timetableData.days[dayNum].periods

    let x = mcArr[xyzz].split('!')
    if (x != '') {
      smallOutput += `<tr><td class='periodIndicator'>0</td><td>${x[0]}</td><td>${x[1]}</td></tr>`
    }

    for (let u = 1; u <= 5; u++) {
      if (smallDay[`${u}`] == undefined) {
        smallOutput += `<tr><td class='periodIndicator'>${u}</td><td>-</td><td>-</td></tr>`
      } else if (smallDay[`${u}`].room == '') {
        smallOutput += `<tr><td class='periodIndicator'>${u}</td><td>${smallDay[`${u}`].title}</td><td>-</td></tr>`
      } else {
        smallOutput += `<tr><td class='periodIndicator'>${u}</td><td>${smallDay[`${u}`].title}</td><td>${smallDay[`${u}`].room}</td></tr>`
      }
    }

    let small = document.getElementById('smallTable')
    small.innerHTML = smallOutput
  }

  bigInput(e) {
    subject = e.target.innerHTML.slice(0, 4)

    if (subject.slice(2, 3) == '&') {
      subject = e.target.innerHTML.slice(0, 2)
    } else if (subject.slice(3, 4) == '&') {
      subject = e.target.innerHTML.slice(0, 3)
    }
    else {
      subject = ''
    }
  }

  subjectHighlight() {
    if (subject != '') {
      let start = 0
      let indexArray = []
      let relevant = []

      while (subjectOnly.indexOf(subject, start) != -1) {
        indexArray.push(subjectOnly.indexOf(subject, start))
        start = subjectOnly.indexOf(subject, start) + 1
      }

      for (let i = 0; i < mcArr.length; i++) {
        if (subject == mcArr[i].split('!')[0]) {
          relevant.push(mcArr[i])
        }
      }

      this.highlightMC(relevant)
      this.calcPos(indexArray)
    }
  }

  highlightMC(array) {
    this.mcBlank()
    for (let i = 0; i < array.length; i++) {
      if (array[i] != '') {
        let temp = array[i].split('!')
        let temp2 = ''
        if (temp[2] == 'A') {
          temp2 = '-1'
        } else if (temp[2] == 'B') {
          temp2 = '-2'
        } else if (temp[2] == 'C') {
          temp2 = '-3'
        }
        let day = document.getElementById(`${tabArray.indexOf(`${temp[3]}`)},${temp2}`)
        mcFadeArr.push(`${tabArray.indexOf(`${temp[3]}`)},${temp2}`)
        day.className = 'highlight'
      }
    }
  }

  mcBlank() {
    for (let u = -1; u > -4; u -= 1) {
      for (let i = 0; i <= 4; i++) {
        let highlight = document.getElementById(i + ',' + u)
        highlight.className = ''
      }
    }
  }

  calcPos(array) {
    let row = 0
    let day = 0
    for (let u = 0; u < array.length; u++) {
      let day = this.specialRound(array[u])
      let row = array[u] % 5
      posArray.push(day + ',' + row)
    }
    this.dispHighlight(posArray)
    fadeArray = posArray

    posArray = []
  }

  dispHighlight(array) {
    this.blankHighlight()
    for (let u = 0; u < array.length; u++) {
      let highlight = document.getElementById(array[u])
      highlight.className = 'highlight'
    }
  }

  blankHighlight() {
    for (let u = 0; u <= 14; u++) {
      for (let i = 0; i <= 4; i++) {
        let highlight = document.getElementById(u + ',' + i)
        highlight.className = ''
      }
    }
  }



  fade() {
    setTimeout(function () { //TODO MAKE SURE THIS ONLY EXECUTES WHEN TIMETABLE IS OPEN
      for (let u = 0; u < fadeArray.length; u++) {
        let highlight = document.getElementById(fadeArray[u])
        highlight.className = ''
      }
      for (let u = 0; u < mcFadeArr.length; u++) {
        let highlight = document.getElementById(mcFadeArr[u])
        highlight.className = ''
      }
    }, 1000)
  }

  initForm() {
    let temp = []

    for (let u = 0; u <= 25; u++) {
      if (subjectOnly[u] != ' ') {
        temp.push(subjectOnly[u])
      }
    }

    for (let i = 0; i < temp.length; i++) {
      if (uniqueSubjects.indexOf(temp[i]) == -1) {
        uniqueSubjects.push(temp[i])
      }
    }

    let options = ''
    for (let v = 0; v < uniqueSubjects.length; v++) {
      options += '<option>' + uniqueSubjects[v] + '</option>'
    }

    let dropdown = document.getElementById('acSubject')
    let dropdown1 = document.getElementById('acSubject2')
    dropdown1.innerHTML = options
    dropdown.innerHTML = options
  }

  processForm() {
    let room = document.getElementById('acRoom')
    let subject = document.getElementById('acSubject')
    let day = document.getElementById('acDay')
    let week = document.getElementById('acWeek')
    let repeat = document.getElementById('acRepeat')
    let button = document.getElementById('acAdd')

    let room2 = document.getElementById('acRoom2')
    let subject2 = document.getElementById('acSubject2')
    let day2 = document.getElementById('acDay2')
    let week2 = document.getElementById('acWeek2')
    let repeat2 = document.getElementById('acRepeat2')
    let button2 = document.getElementById('acAdd2')

    let temp = document.getElementById('vcNavbarCard')

    let width = window.innerWidth
    let height = window.innerHeight
    console.log('process form')
    if ((temp.className == 'Default' && width <= 530 || height <= 750) || (temp.className == 'Small')) {
      if (button2.getAttribute('disabled') != true) {
        if (repeat2.checked == false) {
          let dayNum = tabArray.indexOf(`${day2.value}`)

          if (week2.value == 'B') {
            dayNum += 5
          } else if (week2.value === 'C') {
            dayNum += 10
          }

          mcArr[dayNum] = subject2.value + '!' + room2.value + '!' + week2.value + '!' + day2.value
        } else {
          let temp = tabArray.indexOf(`${day2.value}`)
          mcArr[temp] = subject2.value + '!' + room2.value + '!' + 'A' + '!' + day2.value
          mcArr[temp + 5] = subject2.value + '!' + room2.value + '!' + 'B' + '!' + day2.value
          mcArr[temp + 10] = subject2.value + '!' + room2.value + '!' + 'C' + '!' + day2.value
        }
      } else {
        setTimeout(this.displayTooltip(button.parentNode), 2000)
        console.log('display tooltip')
      }
    } else {
      if (button.getAttribute('disabled') != true) {
        if (repeat.checked == false) {
          let dayNum = tabArray.indexOf(`${day.value}`)

          if (week.value == 'B') {
            dayNum += 5
          } else if (week.value === 'C') {
            dayNum += 10
          }
          mcArr[dayNum] = subject.value + '!' + room.value + '!' + week.value + '!' + day.value
        } else {
          let temp = tabArray.indexOf(`${day.value}`)
          mcArr[temp] = subject.value + '!' + room.value + '!' + 'A' + '!' + day.value
          mcArr[temp + 5] = subject.value + '!' + room.value + '!' + 'B' + '!' + day.value
          mcArr[temp + 10] = subject.value + '!' + room.value + '!' + 'C' + '!' + day.value
        }
      } else {
        setTimeout(this.displayTooltip(button.parentNode), 2000)
        console.log('display tooltip')
      }
    }

    localStorage.setItem('morningClasses', mcArr)
    localStorage.removeItem('timetableBells')
    localStorage.removeItem('timetablePeriods')
    localStorage.removeItem('timetablePeriodsDate')

    this.displayMorningClass()
  }

  displayMorningClass() {
    let count = 0
    for (let i = 0; i < mcArr.length; i++) {
      if (mcArr[i] != '') {
        let temp = mcArr[i].split('!')
        let temp2 = ''
        if (temp[2] == 'A') {
          temp2 = '-1'
        } else if (temp[2] == 'B') {
          temp2 = '-2'
        } else if (temp[2] == 'C') {
          temp2 = '-3'
        }
        let day = document.getElementById(`${tabArray.indexOf(`${temp[3]}`)},${temp2}`)
        day.innerHTML = temp[0] + '&nbsp;&nbsp;' + temp[1]
      } else {
        count++
      }
    }
    let day = document.getElementById('zeroIndicator1')
    let day1 = document.getElementById('zeroIndicator2')
    let day2 = document.getElementById('zeroIndicator3')
    if (count == 15) {
      day.innerHTML = ''
      day1.innerHTML = ''
      day2.innerHTML = ''
    } else {
      day.innerHTML = '0'
      day1.innerHTML = '0'
      day2.innerHTML = '0'
    }
  }

  repeatCheckbox() {
    let week = document.getElementById('acWeek')
    let repeat = document.getElementById('acRepeat')
    if (repeat.checked == true) {
      week.setAttribute('disabled', true)
    } else {
      week.removeAttribute('disabled')
    }
  }

  verifyRoom() {
    let room = document.getElementById('acRoom')
    let button = document.getElementById('acAdd')

    let room2 = document.getElementById('acRoom2')
    let button2 = document.getElementById('acAdd2')

    let temp = document.getElementById('vcNavbarCard')
    let width = window.innerWidth
    let height = window.innerHeight

    if ((temp.className == 'Default' && width <= 530 || height <= 750) || (temp.className == 'Small')) {
      if (room2.value.length == 3 && validRoom.indexOf(room2.value) != -1) {
        button2.removeAttribute('disabled')
        //button2.className = 'uk-button uk-button-primary'
      } else {
        button2.setAttribute('disabled', true)
        //button2.className = 'uk-button uk-button-danger'
      }
    } else {
      if (room.value.length == 3 && validRoom.indexOf(room.value) != -1) {
        button.removeAttribute('disabled')
        //button.className = 'uk-button uk-button-primary'
        //button.parentNode.removeAttribute('uk-tooltip')
      } else {
        button.setAttribute('disabled', true)
        //button.className = 'uk-button uk-button-danger'
        //setTimeout(this.displayTooltip(button.parentNode), 2000)
      }
    }
  }

  displayTooltip(element) {
    console.log('display tooltip')
    element.setAttribute('uk-tooltip','title: Enter a valid room')
    UIkit.tooltip(element).show()
    setTimeout(function () {UIkit.tooltip(element).hide()}, 10000)
  }

  initRemove() {
    let counter = 0
    let body = ''
    let body2 = ''
    for (let i = 0; i < mcArr.length; i++) {
      if (mcArr[i] != '') {
        let temp = mcArr[i].split('!')
        body += (`<tr><td><input id='remove${counter}'  class='uk-checkbox' type='checkbox'/></td><td>${temp[3]} ${temp[2]}</td><td>${temp[0]} ${temp[1]}</td></tr>`)
        body2 += (`<tr><td><input id='remove${counter}2'  class='uk-checkbox' type='checkbox'/></td><td>${temp[3]} ${temp[2]}</td><td>${temp[0]} ${temp[1]}</td></tr>`)
        remArr.push(mcArr[i])
        counter++
      }
    }
    mcNum = counter
    let div = document.getElementById('rmTableDiv')
    let p = document.getElementById('noText')
    let div2 = document.getElementById('rmTableDiv2')
    let p2 = document.getElementById('noText2')
    if (body == '') {
      div.hidden = true
      p.hidden = false
      div2.hidden = true
      p2.hidden = false
    } else {
      p.hidden = true
      div.hidden = false
      p2.hidden = true
      div2.hidden = false
      let addTo = document.getElementById('removeBody')
      let addTo2 = document.getElementById('removeBody2')
      addTo.innerHTML = body
      addTo2.innerHTML = body2
    }
    this.initSelectAll()
  }

  processRem() {
    let tempArr = []
    for (let i = 0; i < mcNum; i++) {
      let temp = document.getElementById('remove' + i)
      tempArr.push(i)
      if (temp.checked) {
        let temp1 = remArr[i].split('!')
        let temp2 = ''
        if (temp1[2] == 'A') {
          temp2 = '-1'
        } else if (temp1[2] == 'B') {
          temp2 = '-2'
        } else if (temp1[2] == 'C') {
          temp2 = '-3'
        }
        let remove = document.getElementById(`${tabArray.indexOf(`${temp1[3]}`)},${temp2}`)
        remove.innerHTML = ''
        mcArr[mcArr.indexOf(remArr[i])] = ''
      }
    }
    localStorage.setItem('morningClasses', mcArr)
    localStorage.removeItem('timetableBells')
    localStorage.removeItem('timetablePeriods')
    localStorage.removeItem('timetablePeriodsDate')

    remArr.splice(tempArr[0], tempArr.length)
    this.initRemove()
    this.displayMorningClass()
  }

  initSelectAll() {
    let button = document.getElementById('btnSelectall')
    button.innerText = this.ifChecked()
  }

  selectAll() {
    let button = document.getElementById('btnSelectall')
    let button2 = document.getElementById('btnSelectall2')
    if (this.ifChecked() == 'SELECT ALL') {
      button.innerText = 'Deselect all'
      button2.innerText = 'Deselect all'
      this.changeCheckbox(true)
    } else {
      button.innerText = 'Select all'
      button2.innerText = 'Select all'
      this.changeCheckbox(false)
    }
  }

  ifChecked() {
    let falseCount = 0
    let trueCount = 0
    for (let i = 0; i < mcNum; i++) {
      let temp = document.getElementById('remove' + i)
      if (temp.checked == false) {
        falseCount++
      } else {
        trueCount++
      }
    }
    if (trueCount == mcNum) {
      return 'DESELECT ALL'
    } else if (falseCount == mcNum) {
      return 'SELECT ALL'
    } else {
      return 'SELECT ALL'
    }
  }

  changeCheckbox(bool) {
    for (let i = 0; i < mcNum; i++) {
      let temp = document.getElementById('remove' + i)
      let temp2 = document.getElementById('remove' + i + '2')
      temp.checked = bool
      temp2.checked = bool
    }
  }

  render() {
    return (
      <div id='vcNavbarCard'>
        <div id='fullTimetable' className='ttableCard card uk-animation-slide-top-small' onMouseLeave={this.fade.bind(this)}>
          <h3 className='uk-heading-line uk-text-center'>
            <span id='ttableName' />
          </h3>
          <div className='uk-padding-top uk-text-center'>
            <table className='uk-table uk-table-small'>
              <thead>
                <tr>
                  <th id=''></th>
                  <th id='moA'>MON A</th>
                  <th id='tuA'>TUE A</th>
                  <th id='weA'>WED A</th>
                  <th id='thA'>THU A</th>
                  <th id='frA'>FRI A</th>
                </tr>
              </thead>
              <tbody id='wA' className='timetable' onMouseOver={this.subjectHighlight.bind(this)}>
                <tr id='r-1' onMouseOver={this.bigInput}>
                  <td id='zeroIndicator1' className='periodIndicator'></td>
                  <td id='0,-1' className=''></td>
                  <td id='1,-1' className=''></td>
                  <td id='2,-1' className=''></td>
                  <td id='3,-1' className=''></td>
                  <td id='4,-1' className=''></td>
                </tr>
                <tr id='row0' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>1</td></tr>
                <tr id='row1' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>2</td></tr>
                <tr id='row2' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>3</td></tr>
                <tr id='row3' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>4</td></tr>
                <tr id='row4' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>5</td></tr>
              </tbody>
            </table>
          </div>

          <hr />

          <div className='uk-padding-top uk-text-center'>
            <table className='uk-table uk-table-small'>
              <thead>
                <tr>
                  <th id=''></th>
                  <th id='moB'>MON B</th>
                  <th id='tuB'>TUE B</th>
                  <th id='weB'>WED B</th>
                  <th id='thB'>THU B</th>
                  <th id='frB'>FRI B</th>
                </tr>
              </thead>
              <tbody id='wB' className='timetable' onMouseOver={this.subjectHighlight.bind(this)}>
                <tr id='r-2' onMouseOver={this.bigInput}>
                  <td id='zeroIndicator2' className='periodIndicator'></td>
                  <td id='0,-2' className=''></td>
                  <td id='1,-2' className=''></td>
                  <td id='2,-2' className=''></td>
                  <td id='3,-2' className=''></td>
                  <td id='4,-2' className=''></td>
                </tr>
                <tr id='row5' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>1</td></tr>
                <tr id='row6' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>2</td></tr>
                <tr id='row7' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>3</td></tr>
                <tr id='row8' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>4</td></tr>
                <tr id='row9' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>5</td></tr>
              </tbody>
            </table>
          </div>

          <hr />

          <div className='uk-padding-top uk-text-center'>
            <table className='uk-table uk-table-small'>
              <thead>
                <tr>
                  <th id=''></th>
                  <th id='moC'>MON C</th>
                  <th id='tuC'>TUE C</th>
                  <th id='weC'>WED C</th>
                  <th id='thC'>THU C</th>
                  <th id='frC'>FRI C</th>
                </tr>
              </thead>
              <tbody id='wC' className='timetable' onMouseOver={this.subjectHighlight.bind(this)} >
                <tr id='r-3' onMouseOver={this.bigInput}>
                  <td id='zeroIndicator3' className='periodIndicator'>0</td>
                  <td id='0,-3' className=''></td>
                  <td id='1,-3' className=''></td>
                  <td id='2,-3' className=''></td>
                  <td id='3,-3' className=''></td>
                  <td id='4,-3' className=''></td>
                </tr>
                <tr id='row10' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>1</td></tr>
                <tr id='row11' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>2</td></tr>
                <tr id='row12' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>3</td></tr>
                <tr id='row13' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>4</td></tr>
                <tr id='row14' onMouseOver={this.bigInput}><td id='' className='periodIndicator'>5</td></tr>
              </tbody>
            </table>
          </div>

          <div className='uk-align-left uk-inline addMC'>
            <a className='addMC' onClick={this.initForm.bind(this)} uk-icon='plus-circle' uk-tooltip='title: Add morning classes; pos: bottom-left;'></a>
            <div uk-dropdown='mode: click;pos: top-left'>
              <p className='uk-align-left uk-margin-bottom-small'>Subject</p>
              <select id='acSubject' className='uk-select'>
              </select>

              <hr />

              <div>
                <p className='uk-align-left uk-margin-bottom-small'>Room</p>
                <a id='ttableInfo' uk-icon='info' className='uk-align-right' uk-tooltip='title: You can include locations such as the Junior and Senior Library (JLB,SLB), and Moore Park West (MPW).; pos: top; delay: 500'></a>
              </div>
              <input onChange={this.verifyRoom.bind(this)} id='acRoom' className='uk-input' type='text' placeholder='Room' maxLength='3' />

              <hr />

              <p className='uk-align-left uk-margin-bottom-small'>Weekday</p>
              <select id='acDay' className='uk-select'>
                <option>MON</option>
                <option>TUE</option>
                <option>WED</option>
                <option>THU</option>
                <option>FRI</option>
              </select>

              <hr />

              <p className='uk-align-left uk-margin-bottom-small'>Week</p>
              <select id='acWeek' className='uk-select'>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>

              <label><input id='acRepeat' className='uk-checkbox' type='checkbox' onChange={this.repeatCheckbox.bind(this)} /> Every week</label>
              <div className='uk-margin-top' onClick={this.processForm.bind(this)}>
                <button id='acAdd' className='uk-button uk-button-default ' disabled='true'>Add</button>
              </div>
            </div>
          </div>
          <div className='uk-align-right uk-inline removeMC'>
            <a className='removeMC' uk-icon='minus-circle' onClick={this.initRemove.bind(this)} uk-tooltip='title: Remove morning classes; pos: bottom-right;'></a>
            <div id='rmDropDiv' uk-dropdown='mode: click;pos: top-right'>
              <p id='noText' hidden='true'>No morning classes</p>
              <div id='rmTableDiv' className='uk-overflow-auto'>
                <a id='btnSelectall' onClick={this.selectAll.bind(this)} className='uk-button uk-button-default uk-margin-bottom'>Select all</a>
                <table className='uk-table uk-table-hover uk-table-middle uk-table-divider'>
                  <thead>
                    <tr>
                      <th className='uk-table-shrink'></th>
                      <th>Date</th>
                      <th>Class</th>
                    </tr>
                  </thead>
                  <tbody id='removeBody'>
                  </tbody>
                </table>
                <div className='uk-margin-top' onClick={this.processRem.bind(this)}>
                  <button id='rmcButton' className='uk-button uk-button-default'>Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id='smallTimetable' className='ttableCard card uk-animation-slide-top-small' onClick={this.selectTabSTTable.bind(this)}>
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
          <div id='addMC' className='uk-align-left uk-inline addMC'>
            <a className='addMC' onClick={this.initForm.bind(this)} uk-icon='plus-circle' uk-tooltip='title: Add morning classes; pos: bottom-left;'></a>
            <div uk-dropdown='mode: click;pos: right'>
              <p className='uk-align-left uk-margin-bottom-small'>Subject</p>
              <select id='acSubject2' className='uk-select'>
              </select>

              <hr />

              <div>
                <p className='uk-align-left uk-margin-bottom-small'>Room</p>
                <a id='ttableInfo' uk-icon='info' className='uk-align-right' uk-tooltip='title: You can include locations such as the Junior and Senior Library (JLB,SLB), and Moore Park West (MPW).; pos: top; delay: 500'></a>
              </div>
              <input onChange={this.verifyRoom.bind(this)} id='acRoom2' className='uk-input' type='text' placeholder='Room' maxLength='3' />

              <hr />

              <p className='uk-align-left uk-margin-bottom-small'>Weekday</p>
              <select id='acDay2' className='uk-select'>
                <option>MON</option>
                <option>TUE</option>
                <option>WED</option>
                <option>THU</option>
                <option>FRI</option>
              </select>

              <hr />

              <p className='uk-align-left uk-margin-bottom-small'>Week</p>
              <select id='acWeek2' className='uk-select'>
                <option>A</option>
                <option>B</option>
                <option>C</option>
              </select>

              <label><input id='acRepeat2' className='uk-checkbox' type='checkbox' onChange={this.repeatCheckbox.bind(this)} /> Every week</label>
              <div className='uk-margin-top' onClick={this.processForm.bind(this)}>
                <button id='acAdd2' className='uk-button uk-button-default' disabled='true'>Add</button>
              </div>
            </div>
          </div>
          <div id='removeMC' className='uk-align-right uk-inline removeMC'>
            <a className='removeMC' uk-icon='minus-circle' onClick={this.initRemove.bind(this)} uk-tooltip='title: Remove morning classes; pos: bottom-right;'></a>
            <div id='rmDropDiv' uk-dropdown='mode: click;pos: left'>
              <p id='noText2' hidden='true'>No morning classes</p>
              <div id='rmTableDiv2' >
                <a id='btnSelectall2' onClick={this.selectAll.bind(this)} className='uk-button uk-button-default uk-margin-bottom'>Select all</a>
                <table className='uk-table uk-table-hover uk-table-middle uk-table-divider'>
                  <thead>
                    <tr>
                      <th className='uk-table-shrink'></th>
                      <th>Date</th>
                      <th>Class</th>
                    </tr>
                  </thead>
                  <tbody id='removeBody2'>
                  </tbody>
                </table>
                <div className='uk-margin-top' onClick={this.processRem.bind(this)}>
                  <button id='rmcButton' className='uk-button uk-button-default'>Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Timetable