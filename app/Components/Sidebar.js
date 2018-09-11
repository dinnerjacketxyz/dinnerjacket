import React, { Component } from 'react'
const http = require('http')

const firebase = require('firebase')
// fb -> firebase file in which firebase is defined
const fb = require('../fb')(firebase)
const database = firebase.database()

const MONTHS = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 'September', 
  'October', 'November', 'December'
]

let userID

// Reference to firebase database
let ref

/**
 * Reminders
 * Sidebar component that appears on the left side of the app
 */
class Sidebar extends Component {
  /**
   * Initialises reminders from initially from firebase
   * Retrieves from firebase once firebase loads and userID is retrieved from API and encrypted
   * @param {*} props 
   */
  constructor(props) {
    super(props)

    this.state = {
      reminders: []
    }

    // Sets reminders from local storage except on first use
    if (localStorage.getItem('reminders')) {
      try {
        this.state.reminders = JSON.parse(atob(localStorage.getItem('reminders')))
      } catch (e) { }
    }

    // Return information for user information from SBHS API
    /* User Info
       {'username' : '436345789',     
        'studentId' : '436345789',
        'givenName' : 'John',        
        'surname'   : 'Citizen',        
        'rollClass' : '07E',        
        'yearGroup' : '7',        
        'role'      : 'Student',      // may be valid for staff
        'department': 'Year 7',       // may be valid for staff
        'office'    : '7E',           // may be valid for staff
        'email'     : '436345789@student.sbhs.nsw.edu.au',
        'emailAliases : [             // array of email addresses also valid for the user
          'john.citizen23@student.sbhs.nsw.edu.au'],
        'decEmail'  : 'jcz@education.nsw.gov.au',
        'groups'    : []              // array of network group memberships
      }
    */
    
    // Access user info from SBHS API and retrieve userID specifically from username field
    http.get('/getdata?token=' + localStorage.getItem('accessToken') + '&url=details/userinfo.json', (res) => {
      res.setEncoding('utf8')

      let data = ''
      res.on('data', (body) => {
        data += body
      })
      res.on('end', () => {
        try {
          userID = JSON.parse(data).username

          // Encode fetched username to maintain user security
          userID = btoa(userID)

          // Link firebase reference to 'userNotes' database of this userID's index
          ref = database.ref('reminders/' + userID)

          // Retrieve reminders from firebase
          this.retrieveReminders()
        } catch (e) { }
      })
    })
  }

  /**
   * Called upon the component mounting
   */
  componentDidMount() {
    this.setDateTime()
  }

  /**
   * Sets clock sidebar values to current and formatted date and time
   */
  setDateTime() {
    document.getElementById('sidebarDate').value = (new Date()).toISOString().split('T')[0]
    document.getElementById('sidebarTime').value = ('0' + (new Date()).getHours()).slice(-2) + 
      ':' + ('0' + (new Date()).getMinutes()).slice(-2)
  }

  /**
   * Retrieves reminders from firebase database
   * Sets reminders in 'this.state.reminders' to synced firebase data
   */
  retrieveReminders() {
    try {
      ref.on('value', (data) => {
        let reminders
        try {
          reminders = JSON.parse(atob(data.val().reminders))
        } catch (e) { }
        if (reminders) {
          this.state.reminders = JSON.parse(atob(data.val().reminders))
          this.refresh()
        }
      })
    } catch (e) { }
  }

  /**
   * Pushes a new reminder to the reminders database
   * @param {string} content - the reminder itself (title/content)
   * @param {*} date - date of the reminder's notification
   * @param {boolean} complete - whether the reminder is checked as complete
   */
  pushReminder(content, date, complete) {
    this.state.reminders.push({ content, date, complete })
  }

  /**
   * Syncs firebase database with the local reminders database in 'this.state.reminders'
   * Local -> Firebase
   */
  updateFirebase() {
    let remindersDB = { reminders: btoa(JSON.stringify(this.state.reminders))}
    try {
      ref.update(remindersDB)
    } catch (e) { }

    localStorage.setItem('reminders', btoa(JSON.stringify(this.state.reminders)))
  }

  /**
   * Called when the user adds a reminder
   * @param {*} e - onKeyDown event
   */
  submitReminder(e) {
    // Check if key pressed is ENTER
    // ENTER is used in the input field to submit a new reminder
    if (e.keyCode === 13) {
      let input = document.getElementById('addReminder')

      if (input.value !== '') {
        // Display a warning if the user attempts to create an already existant reminder
        if (this.reminderInUse(input.value)) {
          UIkit.modal.alert('The reminder \'' + input.value + '\' already exists. Please enter a different reminder.')
        } else {
          // Push reminder to database and reset input field if the reminder is unused
          this.pushReminder(input.value, '', false)
          this.addNotif(this.findIndex(input.value))
          input.value = ''
          this.setDateTime()

          this.updateFirebase()
          this.refresh()
        }
      }
    }
  }

  /**
   * Checks if a reminder exists with the same title
   * @param {*} content - text to check if repeated
   */
  reminderInUse(content) {
    // Linear search through reminders array do perform comparison with parameter 'content'
    for (let i = 0; i < this.state.reminders.length; i++) {
      if (content === this.state.reminders[i].content) {
        return true
      }
    }
    return false
  }

  /**
   * Edits the UI of the selected reminder to expand it
   * @param {*} e - event corresponding to selected reminder
   */
  expandReminder(e) {
    if (e.target.style.whiteSpace === 'nowrap' || e.target.style.whiteSpace === ''){
      e.target.style.whiteSpace = 'pre-wrap'
      e.target.style.wordWrap = 'break-word'
    } else if (e.target.style.whiteSpace === 'pre-wrap') {
      e.target.style.whiteSpace = 'nowrap'
    }
  }

  /**
   * REMOVED from final build - very buggy and unnecessary
   * Expands all completed reminders
   * @param {*} e - event corresponding to selected reminder
   */
  /*expandAll(e) {
    if (e.target.innerHTML==='expand') {
      e.target.innerHTML = 'collapse'
    } else if (e.target.innerHTML==='collapse') {
      e.target.innerHTML = 'expand'
    }
  }*/

  /**
   * Event handler called when a reminder is checked
   * @param {*} e - event corresponding to selected reminder
   */
  chkClicked(e) {
    let content = e.target.getAttribute('content')
    let id = this.findIndex(content)
    
    e.preventDefault()

    console.log(e.target)

    // Swap complete reminders with incomplete and incomplete with complete
    this.state.reminders[id].complete = !this.state.reminders[id].complete

    this.updateFirebase()
    this.refresh()
  }

  /**
   * REMOVED from final build - option satisfied by checking and creating a new reminder
   * Edits the selected reminder
   * @param {*} e - event corresponding to selected reminder
   */
  /*editReminder(e) {
    let content = e.target.getAttribute('content')
    let id = this.findIndex(content)
    UIkit.modal.prompt('Entar a new name for the reminder \'' + content + '\'', 'Name').then(title => {
      if (title !== null && /\S/.test(title)) {
        this.state.reminders[id].content = title
        this.updateFirebase()
        this.refresh()
      }
    })
  }*/

  /**
   * REMOVED from final build - option replaced by 'clear all' for simplicity
   * Deletes the selected reminder
   * @param {*} e - event corresponding to selected reminder
   */
  /*deleteReminder(e) {
    let content = e.target.getAttribute('content')
    let id = this.findIndex(content)

    this.state.reminders.splice(id, 1)

    this.updateFirebase()
    this.refresh()
  }*/

  /**
   * Finds index of the reminder in this.state.reminders array
   * @param {*} content - content of the desired reminder
   */
  findIndex(content) {
    for (let i = 0; i < this.state.reminders.length; i++) {
      if (content === this.state.reminders[i].content) {
        return i
      }
    }
  }

/**
 * Refresh the reminders display
 * Called when a change to the database has been made
 * E.g. editing or deleting a reminder
 */
  refresh() {
    let reminders = this.state.reminders
    this.setState({ reminders: this.state.reminders })
  }

  /**
   * Handle user adding a notification to a particular reminder
   */
  addNotif(id) {
    let sidebarTime = document.getElementById('sidebarTime')
    let sidebarDate = document.getElementById('sidebarDate')

    // Check no fields have been left empty
    if (sidebarTime.value && sidebarDate.value) {
      // Get date format from values entered into time sidebar
      let dateFormat = sidebarDate.value.substr(8, 2) + ' ' + MONTHS[sidebarDate.value.substr(5, 2) - 1] + 
      ' ' + sidebarDate.value.substr(0, 4)

      let sideBarFormat = (dateFormat + ' ' + sidebarTime.value)
      let currentFormat = (((new Date()).getUTCDate() + ' ' + 
        MONTHS[(new Date()).getUTCMonth()]) + ' ' + (new Date()).getUTCFullYear() + ' ' + 
        ('0' + (new Date()).getHours()).slice(-2) + 
        ':' + ('0' + (new Date()).getMinutes()).slice(-2))

      // 'Short' format of both current and select dates designed for easy integer calculations
      // (Determining which date and time is newer)
      let sideBarShort = sidebarDate.value.substr(0, 4) + (sidebarDate.value.substr(5, 2) - 1) +
        sidebarDate.value.substr(8, 2) + sidebarTime.value.substr(0, 2) + sidebarTime.value.substr(3, 2)
      let currentShort = (new Date()).getUTCFullYear().toString() + (new Date()).getUTCMonth().toString() + 
        (new Date().getUTCDate()).toString() + ('0' + (new Date()).getHours()).slice(-2).toString() + 
        ('0' + (new Date()).getMinutes()).slice(-2).toString()

      // Convert current and selected dates to integers
      try {
        sideBarShort = parseInt(sideBarShort)
      } catch (e) { }
      try {
        currentShort = parseInt(currentShort)
      } catch (e) { }

      // Show reminder date and time if the sidebar time is newer than the current time
      if (sideBarFormat !== currentFormat && sideBarShort >= currentShort) {
        this.state.reminders[id].date = dateFormat + ', ' + sidebarTime.value
      }
    }

    console.log(this.state.reminders[id].date)
  }

  /**
   * Delete all completed reminders permanently, with prompt
   */
  removeCompleted() {
    UIkit.modal.confirm('Are you sure? All completed reminders will be permanently deleted.').then(_ => {
      for (let i = this.state.reminders.length - 1; i >= 0; i--) {
        if (this.state.reminders[i].complete) {
          this.state.reminders.splice(i, 1)
        }
      }

      this.updateFirebase()
      this.refresh()
    })
  }

  /**
   * Render UI including dateUI and UI elements for incomplete and complete reminders
   */
  render() {
    let dateUI = (
      <div className='uk-inline'>
        <a uk-icon='clock' onClick={this.setDateTime.bind(this)}></a>
        <div style={{minWidth:'210px'}} uk-dropdown='mode: click;pos: left-center'>
          <p>Time</p>

          <input className='uk-input uk-form-blank' type='time' placeholder='hh/mm'/> {/* if you want to set this to a value it has to be in the format hh:mm in 24 hour time */}

          <hr/>

          <p>Date</p>
          <input className='uk-input uk-form-blank' type='date' name='due' placeholder='dd/mm/yyyy'/> {/* to set this value it has to be yyyy-mm-dd */}
        </div>
      </div>
    )

    let ID = -1
    // Complete reminders UI
    let reminders = this.state.reminders.map(reminder => {
      if (!reminder.complete) {
        ID++
        return <Reminder key={ID} id={ID} reminder={reminder} 
          dateUI={dateUI} expand={this.expandReminder} chkClicked={this.chkClicked.bind(this)} />
      }
    })

    // Incomplete reminders UI
    let complete = this.state.reminders.map(reminder => {
      if (reminder.complete) {
        ID++
        return <Complete expand={this.expandReminder} key={ID} id={ID} reminder={reminder} 
           chkClicked={this.chkClicked.bind(this)} />
      }
    })

    return (
      <div className='uk-offcanvas-bar'>
        <button className='uk-offcanvas-close' type='button' uk-close=''></button>
        <div>
          <h4 className='uk-align-left' style={{marginTop:'40px'}}>Reminders</h4>
          <a uk-icon='icon: info' style={{marginTop:'40px'}} uk-tooltip='title: After typing in a reminder, click ENTER to save it. The checkbox can then be used to send it to completed reminders.' className='uk-align-right' />
        </div>

        <table id='reminders' className='uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small'>
          <thead>
            <tr>
              <th className='uk-table-shrink'></th>
              <th></th>
            </tr>
          </thead>
          <tbody onMouseOver={this.hover} style={{fontSize: '12px'}} uk-sortable='cls-custom: uk-flex uk-box-shadow-small uk-background-primary'>
            {reminders}
          </tbody>
        </table>
        <table className='uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small'>
          <thead>
              <tr>
                <th></th>
                <th className='uk-table-shrink'></th>
              </tr>
          </thead>
          <tbody style={{fontSize: '12px'}} id='remindersTable'>
            <tr>
              <td style={{paddingLeft: '0px'}}><input id='addReminder' className='uk-input uk-form-blank' 
                onKeyDown={this.submitReminder.bind(this)} type='text' placeholder='Add reminder' autoFocus/></td>
              <td style={{paddingRight: '0px',paddingLeft:'2px'}}>
                <div className='uk-inline'>
                  <a uk-icon='clock'></a>
                  <div style={{minWidth:'220px'}} uk-dropdown='mode: click;pos: left-bottom'>
                  <a uk-icon='icon: info' uk-tooltip='title: The selected time and date will appear under the corresponding reminder.' className='uk-align-right' />
                    <p>Time</p>

                    <input id='sidebarTime' className='uk-input uk-form-blank' type='time' placeholder='hh/mm' />

                    <hr/>

                    <p>Date</p>

                    <input id='sidebarDate' className='uk-input uk-form-blank' type='date' placeholder='dd/mm/yyyy'/>
                    <p style={{color:'#2dc0d5',fontSize:'12px'}}>You entered a time before the current time.</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <ul uk-accordion=''>
          <li>
            <div style={{display:'inline', fontSize:'15px'}} className='uk-accordion-title uk-inline'>Show completed</div>
            <button onClick={this.removeCompleted.bind(this)} className='uk-button-small uk-button-default uk-margin-small-left' style={{padding:'0 10px'}}>Clear all</button>
            <div className='uk-accordion-content'>
              <table className='uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small'>
                <thead>
                  <tr>
                    <th className='uk-table-shrink'></th>
                    <th></th>
                    <th className='uk-table-shrink'></th>
                  </tr>
                </thead>
                <tbody >
                  {complete}
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

/**
 * Complete reminders UI
 * @param {*} props - reminder passed as props.reminder
 */
const Reminder = (props) => {
  return (
    <tr>
      <td style={{paddingLeft: '0px'}}>
        <input className='uk-checkbox' type='checkbox' content={props.reminder.content} onClick={props.chkClicked} />
      </td>
      <td className='uk-text-truncate'>
        <p className='uk-text-truncate' onClick={props.expand}>{props.reminder.content}</p>
        <p className='uk-text-muted'>{props.reminder.date}</p>
      </td>
    </tr>
  )
}

/**
 * Incomelete reminders UI
 * @param {*} props - reminder passed as props.reminder
 */
const Complete = (props) => {
  return (
    <tr>
      <td style={{paddingLeft: '0px'}}>
        <input className='uk-checkbox' type='checkbox' content={props.reminder.content} defaultChecked onClick={props.chkClicked} />
      </td>
      <td style={{fontSize: '12px',color:'#c7c7c7'}} className='uk-text-truncate'>
        <p className='uk-text-truncate' onClick={props.expand}>{props.reminder.content}</p>
      </td>
    </tr>
  )
}

export default Sidebar