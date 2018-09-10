import React, { Component } from 'react'
const http = require('http')

const firebase = require('firebase')
const fb = require('../fb')(firebase)
const database = firebase.database()

const MONTHS = [
  'January', 'February', 'March', 'April', 
  'May', 'June', 'July', 'August', 'September', 
  'October', 'November', 'December'
]

let userID
let ref


/**
 * Sidebar component that appears on the left side of the app
 * Contains reminders
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
       {"username" : "436345789",     
        "studentId" : "436345789",
        "givenName" : "John",        
        "surname"   : "Citizen",        
        "rollClass" : "07E",        
        "yearGroup" : "7",        
        "role"      : "Student",      // may be valid for staff
        "department": "Year 7",       // may be valid for staff
        "office"    : "7E",           // may be valid for staff
        "email"     : "436345789@student.sbhs.nsw.edu.au",
        "emailAliases : [             // array of email addresses also valid for the user
          "john.citizen23@student.sbhs.nsw.edu.au"],
        "decEmail"  : "jcz@education.nsw.gov.au",
        "groups"    : []              // array of network group memberships
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

  componentDidMount() {
    console.log((new Date()).toISOString().split('T')[0])
    document.getElementById('sidebarDate').value = (new Date()).toISOString().split('T')[0]
  }

  /**
   * Retrieves reminders from firebase database
   * Sets reminders in 'this.state.reminders' to synced firebase data
   */
  retrieveReminders() {
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
  }

  /**
   * Pushes a new reminder to the reminders database
   * @param {string} content - the reminder itself (title/content)
   * @param {*} date - date of the reminder's notification
   * @param {boolean} complete - whether the reminder is checked as complete
   */
  pushReminder(content, date, complete) {
    this.state.reminders.push({ content, date, complete })

    this.updateFirebase()
    this.refresh()
  }

  /**
   * Syncs firebase database with the local reminders database in 'this.state.reminders'
   * Local -> Firebase
   */
  updateFirebase() {
    let remindersDB = { reminders: btoa(JSON.stringify(this.state.reminders))}
    ref.update(remindersDB)

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
      
      // Display a warning if the user attempts to create an already existant reminder
      if (this.reminderInUse(input.value)) {
        UIkit.modal.alert('The reminder \'' + input.value + '\' already exists. Please enter a different reminder.')
      } else {
        // Push reminder to database and reset input field if the reminder is unused
        this.pushReminder(input.value, '', false)
        this.addNotif(this.findIndex(input.value))
        input.value = ''
      }
    }
  }

  /**
   * 
   * @param {*} content 
   */
  reminderInUse(content) {
    for (let i = 0; i < this.state.reminders.length; i++) {
      if (content === this.state.reminders[i].content) {
        return true
      }
    }
    return false
  }

  /**
   * 
   * @param {*} e 
   */
  expandReminder(e) {
    console.log(e.target)
    console.log(e.target.style.whiteSpace)
    if (e.target.style.whiteSpace === 'nowrap' || e.target.style.whiteSpace === ''){
      e.target.style.whiteSpace = 'pre-wrap'
      e.target.style.wordWrap = 'break-word'
    } else if (e.target.style.whiteSpace === 'pre-wrap') {
      e.target.style.whiteSpace = 'nowrap'
    }
  }

  /**
   * 
   * @param {*} e 
   */
  expandAll(e) {
    console.log(e.target.innerHTML)
    if (e.target.innerHTML==='expand') {
      e.target.innerHTML = 'collapse'
    } else if (e.target.innerHTML==='collapse') {
      e.target.innerHTML = 'expand'
    }
  }

  /**
   * 
   */
  chkClicked(e) {
    console.log(e.target)

    let content = e.target.getAttribute('content')
    console.log(content)
    let id = this.findIndex(content)

    console.log(id)

    this.state.reminders[id].complete = !this.state.reminders[id].complete

    this.updateFirebase()
    this.refresh()
  }

  /**
   * 
   * @param {*} e 
   */
  editReminder(e) {
    let content = e.target.getAttribute('content')
    let id = this.findIndex(content)
    UIkit.modal.prompt('Entar a new name for the reminder \'' + content + '\'', 'Name').then(title => {
      if (title !== null && /\S/.test(title)) {
        this.state.reminders[id].content = title
        this.updateFirebase()
        this.refresh()
      }
    })
  }

  /**
   * DOESN'T WORK
   */
  deleteReminder(e) {
    console.log(e.target)

    let content = e.target.getAttribute('content')
    console.log(content)
    let id = this.findIndex(content)

    console.log(id)

    this.state.reminders.splice(id, 1)

    this.updateFirebase()
    this.refresh()
  }

  /**
   * 
   * @param {*} content 
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
    let hour = document.getElementById('hour')
    let minutes = document.getElementById('minutes')
    let dayDate = document.getElementById('date')
    let month = document.getElementById('month')
    let year = document.getElementById('year')

    // Check no fields have been left empty
    if (hour.value && minutes.value && dayDate.value && month.value && year.value) {
      console.log(hour.value, minutes.value, dayDate.value, month.value, year.value)

      let date = new Date()

      if ((hour.value >= date.getHours() && dayDate.value >= date.getUTCDate() && 
        month.value >= date.getUTCMonth() && year.value >= date.getUTCFullYear()) || 
        (minutes.value > date.getMinutes())) {

        this.state.reminders[id].date = dayDate.value + ' ' + MONTHS[month.value - 1] + ' ' + 
          year.value + ', ' + hour.value + ':' + document.getElementById('minutes').value
      } else {
        this.state.reminders[id].date = 'No notification'
      }
    }

    console.log(this.state.reminders[id].date)
  }

  /**
   * 
   */
  render() {
    let dateUI = (
      <div className='uk-inline'>
        <a uk-icon='clock'></a>
        <div style={{minWidth:'220px'}} uk-dropdown='mode: click;boundary: .uk-table'>
          <p>Time</p>

          <input className='uk-input uk-form-blank' type="time" placeholder='hh/mm'/> {/* if you want to set this to a value it has to be in the format hh:mm in 24 hour time */}

          <hr/>

          <p>Date</p>
          <input className='uk-input uk-form-blank' type="date" name="due" placeholder='dd/mm/yyyy'/> {/* to set this value it has to be yyyy-mm-dd */}
        </div>
      </div>
    )

    let ID = -1
    let reminders = this.state.reminders.map(reminder => {
      if (!reminder.complete) {
        ID++
        return <Reminder expand={this.expandReminder} key={ID} id={ID} reminder={reminder} 
          dateUI={dateUI} chkClicked={this.chkClicked.bind(this)} editReminder={this.editReminder.bind(this)} />
      }
    })

    let complete = this.state.reminders.map(reminder => {
      if (reminder.complete) {
        ID++
        return <Complete expand={this.expandReminder} key={ID} id={ID} reminder={reminder} 
          deleteReminder={this.deleteReminder.bind(this)} chkClicked={this.chkClicked.bind(this)} />
      }
    })

    let header = (
      <tr>
        <th className='uk-table-shrink'></th>
        <th></th>
        <th className='uk-table-shrink'></th>
        <th className='uk-table-shrink'></th>
      </tr>
    )

    if (this.state.reminders.length === 0) {
      reminders = (<tr><td>No incomplete reminders</td></tr>)
      header = (<tr><th></th></tr>)
    }


    return (
      <div className='uk-offcanvas-bar'>
        <button className='uk-offcanvas-close' type='button' uk-close=''></button>
        <h3 style={{marginTop:'40px'}}>Reminders</h3>
        {/*<button onClick={this.expandAll} className='uk-margin-top uk-button uk-button-default uk-width-1-1'>expand</button>*/}

        <table id='reminders' className='uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small'>
          <thead>
            {header}
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
                  <div style={{minWidth:'220px'}} uk-dropdown='mode: click;boundary: .uk-table'>
                    <p>Time</p>

                    <input id='sidebarTime' className='uk-input uk-form-blank' type="time" placeholder='hh/mm' value={(new Date()).getHours() +':'+ (new Date()).getMinutes()}/>

                    <hr/>

                    <p>Date</p>

                    <input id='sidebarDate' className='uk-input uk-form-blank' type="date" placeholder='dd/mm/yyyy'/>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ul uk-accordion=''>
          <li>
            <div style={{display:'inline', fontSize:'15px'}} className='uk-accordion-title uk-inline'>Show completed</div>
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
 * 
 * @param {*} props 
 */
const Reminder = (props) => {
  const hover = (bool) => {
    if (bool) {
      document.getElementById('editButton' + props.id).style.display = 'table-cell'
      document.getElementById('schedule' + props.id).style.display = 'table-cell'
    } else {
      document.getElementById('editButton' + props.id).style.display = 'none'
      document.getElementById('schedule' + props.id).style.display = 'none'
    }
  }
  return (
    <tr onMouseEnter={() => {hover(true)}} onMouseLeave={() => {hover(false)}}>
      <td style={{paddingLeft: '0px'}}>
        <input className='uk-checkbox' type='checkbox' content={props.reminder.content} onChange={props.chkClicked} />
      </td>
      <td className='uk-text-truncate'>
        <p className='uk-text-truncate' onClick={props.expand}>{props.reminder.content}</p>
        <p className='uk-text-muted'>{props.reminder.date}</p>
      </td>

      <td id={'editButton'+props.id} style={{display:'none'}}>
        <button style={{borderRadius:'5px'}} className='uk-button-small uk-button-default' content={props.reminder.content} onClick={props.editReminder}>Edit</button>
      </td>
      
      <td id={'schedule'+props.id} style={{display:'none',paddingRight: '0px',paddingLeft:'2px'}}>
        {props.dateUI}
      </td>
    </tr>
  )
}

/**
 * 
 * @param {*} props 
 */
const Complete = (props) => {
  const hover = (bool) => {
    if (bool) {
      document.getElementById('remove' + props.id).style.display = 'table-cell'
    } else {
      document.getElementById('remove' + props.id).style.display = 'none'
    }
  }
  return (
    <tr onMouseEnter={() => {hover(true)}} onMouseLeave={() => {hover(false)}}>
      <td style={{paddingLeft: '0px'}}>
        <input className='uk-checkbox' type='checkbox' content={props.reminder.content} onChange={props.chkClicked} />
      </td>
      <td style={{fontSize: '12px',color:'#c7c7c7'}} className='uk-text-truncate'>
        <p className='uk-text-truncate' onClick={props.expand}>{props.reminder.content}</p>
      </td>
      <td>
        <a id={'remove'+props.id} style={{display:'none'}} uk-icon='trash' content={props.reminder.content} onClick={props.deleteReminder}></a>
      </td>
    </tr>
  )
}

export default Sidebar