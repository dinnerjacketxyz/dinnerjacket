import React, { Component } from 'react'
const http = require('http')

let userID
let ref

/**
 * 
 */
class Sidebar extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props)

    this.state = {
      reminders: []
    }

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
          ref = props.database.ref('reminders/' + userID)

          // get reminders
          this.retrieveReminders()
        } catch (e) { }
      })
    })
  }

  /**
   * 
   */
  retrieveReminders() {
    ref.on('value', (data) => {
      this.state.reminders = JSON.parse(atob(ref.val().reminders))
      let reminders = this.state.reminders
      this.setState({ reminders: this.state.reminders })
    })
  }

  /**
   * 
   * @param {*} content 
   * @param {*} date 
   * @param {*} complete 
   */
  pushReminder(content, date, complete) {
    this.state.reminders.push({ content, date, complete })

    let r = this.state.reminders
    this.setState({ r : this.state.reminders })

    this.updateFirebase()
  }

  /**
   * 
   */
  updateFirebase() {
    let remindersDB = { reminders: btoa(JSON.stringify(this.state.notes))}
    ref.update(remindersDB)
  }

  /**
   * 
   * @param {*} e 
   */
  submitReminder(e) {
    if (e.keyCode === 13) {
      let input = document.getElementById('addReminder')
      console.log(input.value)
      this.pushReminder(input.value, '', false)
      input.value = ''
    }
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

  //this isn't final, it's just the scren design, expanding and closing doesn't work after u add a new thing because of this
  /**
   * 
   */
  addReminder() {
    document.getElementById('remindersTable').innerHTML += ``
  }

  /**
   * 
   */
  chkClicked(e) {
    console.log(e.target)

    this.state.reminders[e.target.id].complete = !this.state.reminders[e.target.id].complete
    let reminders = this.state.reminders
    this.setState({ reminders: this.state.reminders })

    this.updateFirebase()
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
          <input className='uk-input uk-form-blank uk-width-1-3' min='0' max='12' type='number' placeholder='H' maxLength='2' autoFocus/>
          <input className='uk-input uk-form-blank uk-width-1-3' min='0' max='59' type='number' placeholder='M' maxLength='2'/>
          <select className='uk-select uk-width-1-3'>
            <option>AM</option>
            <option>PM</option>
          </select>

          <hr/>

          <p>Date</p>
          <input className='uk-input uk-form-blank uk-width-1-2' min='1' max='28' type='number' placeholder='D' maxLength='2'/>
          <input className='uk-input uk-form-blank uk-width-1-2' min='1' max='12' type='number' placeholder='M' maxLength='2'/>
          <select className='uk-select uk-width-1-1'>
            <option>2018</option>
            <option>2019</option>
          </select>
        </div>
      </div>
    )

    let ID = -1
    let reminders = this.state.reminders.map(reminder => {
      if (!reminder.complete) {
        ID++
        return <Reminder expand={this.expandReminder} key={ID} id={ID} reminder={reminder} dateUI={dateUI} chkClicked={this.chkClicked.bind(this)} />
      }
    })

    let complete = this.state.reminders.map(reminder => {
      if (reminder.complete) {
        ID++
        return <Complete expand={this.expandReminder} key={ID} id={ID} reminder={reminder} chkClicked={this.chkClicked.bind(this)} />
      }
    })

    let header = (
      <tr>
        <th className='uk-table-shrink'></th>
        <th></th>
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
          <tbody style={{fontSize: '12px'}} uk-sortable='cls-custom: uk-flex uk-box-shadow-small uk-background-primary'>
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
              <td style={{paddingLeft: '0px'}}><input id='addReminder' className='uk-input uk-form-blank' onKeyDown={this.submitReminder.bind(this)} type='text' placeholder='Add reminder' autoFocus/></td>
              <td style={{paddingRight: '0px',paddingLeft:'2px'}}>
                {dateUI}
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
  
  return (
    <tr>
      <td style={{paddingLeft: '0px'}}>
        <input className='uk-checkbox' type='checkbox' id={props.id} onChange={props.chkClicked} />
      </td>
      <td className='uk-text-truncate'>
        <p className='uk-text-truncate' onClick={props.expand}>{props.reminder.content}</p>
      </td>
      <td style={{paddingRight: '0px',paddingLeft:'2px'}}>
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
  return (
    <tr>
      <td style={{paddingLeft: '0px'}}>
        <input className='uk-checkbox' defaultChecked type='checkbox' id={props.id} onChange={props.chkClicked} />
      </td>
      <td style={{fontSize: '12px',color:'#c7c7c7'}} className='uk-text-truncate'>
        <p className='uk-text-truncate' onClick={props.expand}>{props.reminder.content}</p>
      </td>
      <td>
        <a uk-icon='trash'></a>
      </td>
    </tr>
  )
}

export default Sidebar