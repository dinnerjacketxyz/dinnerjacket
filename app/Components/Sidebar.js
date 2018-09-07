import React, { Component } from 'react'

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reminders: []
    }
  }

  pushReminder(content, date) {
    this.state.reminders.push({ content, date })

    let r = this.state.reminders
    this.setState({ r : this.state.reminders })
  }

  submitReminder(e) {
    console.log('submit reminder')

    if (e.keyCode === 13) {
      let input = document.getElementById('addReminder')
      console.log(input.value)
      this.pushReminder(input.value, '')
    }
  }

  expandReminder(e) {
    console.log(e.target)
    console.log(e.target.style.whiteSpace)
    if (e.target.style.whiteSpace === 'nowrap' || e.target.style.whiteSpace === ''){
      e.target.style.whiteSpace = 'normal'
    } else if (e.target.style.whiteSpace === 'normal') {
      e.target.style.whiteSpace = 'nowrap'
    }
  }

  expandAll(e) {
    console.log(e.target.innerHTML)
    if (e.target.innerHTML==='expand') {
      e.target.innerHTML = 'collapse'
    } else if (e.target.innerHTML==='collapse') {
      e.target.innerHTML = 'expand'
    }
  }

  //this isn't final, it's just the scren design, expanding and closing doesn't work after u add a new thing because of this
  addReminder() {
    document.getElementById('remindersTable').innerHTML += ``
  }

  render() {
    let ID = -1
    let reminders = this.state.reminders.map(reminder => {
      ID++
      return <Reminders key={ID} reminder={reminder} />
    })

    return (
      <div className='uk-offcanvas-bar'>
        <button className="uk-offcanvas-close" type="button" uk-close=''></button>
        <h3 style={{marginTop:'40px'}}>Reminders</h3>
        <button onClick={this.expandAll} className='uk-margin-top uk-button uk-button-default uk-width-1-1'>expand</button>

        <table className="uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small">
          <thead>
              <tr>
                  <th className="uk-table-shrink"></th>
                  <th></th>
                  <th className="uk-table-shrink"></th>
              </tr>
          </thead>
          <tbody style={{fontSize: '12px'}} uk-sortable='cls-custom: uk-flex uk-box-shadow-small uk-background-primary'>
              {reminders}
          </tbody>
        </table>
        <table className="uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small">
          <thead>
              <tr>
                  <th></th>
                  <th className="uk-table-shrink"></th>
              </tr>
          </thead>
          <tbody style={{fontSize: '12px'}} id='remindersTable'>
            <tr>
              <td style={{paddingLeft: '0px'}}><input id='addReminder' className="uk-input uk-form-blank" onKeyDown={this.submitReminder.bind(this)} type="text" placeholder="Add reminder" autoFocus/></td>
              <td style={{paddingRight: '0px',paddingLeft:'2px'}}>
                <div className='uk-inline'>
                  <a uk-icon='clock'></a>
                  <div style={{minWidth:"220px"}} uk-dropdown="mode: click;boundary: .uk-table">
                    <p>Time</p>
                    <input className="uk-input uk-form-blank uk-width-1-3" min='0' max='12' type="number" placeholder="H" maxLength='2' autoFocus/>
                    <input className="uk-input uk-form-blank uk-width-1-3" min='0' max='59' type="number" placeholder="M" maxLength='2'/>
                    <select className='uk-select uk-width-1-3'>
                      <option>AM</option>
                      <option>PM</option>
                    </select>

                    <hr/>

                    <p>Date</p>
                    <input className="uk-input uk-form-blank uk-width-1-2" min='1' max='28' type="number" placeholder="D" maxLength='2'/>
                    <input className="uk-input uk-form-blank uk-width-1-2" min='1' max='12' type="number" placeholder="M" maxLength='2'/>
                    <select className='uk-select uk-width-1-1'>
                      <option>2018</option>
                      <option>2019</option>
                    </select>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <ul uk-accordion=''>
          <li>
            <div style={{display:'inline', fontSize:'15px'}} className="uk-accordion-title uk-inline">Show completed</div>
            <div className="uk-accordion-content">
              <table className="uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small">
                <thead>
                    <tr>
                        <th className="uk-table-shrink"></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody style={{fontSize: '12px',color:'#c7c7c7'}}>
                    <tr>
                      <td style={{paddingLeft: '0px'}}><input className="uk-checkbox" checked type="checkbox"/></td>
                      <td className='uk-text-truncate'>
                          Reminder 1
                      </td>
                    </tr>
                    <tr>
                      <td style={{paddingLeft: '0px'}}><input className="uk-checkbox" checked type="checkbox"/></td>
                      <td className='uk-text-truncate'>
                          Reminder 2
                      </td>
                    </tr>
                    <tr>
                      <td style={{paddingLeft: '0px'}}><input className="uk-checkbox" checked type="checkbox"/></td>
                      <td className='uk-text-truncate'>
                          Reminder 3
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

const Reminders = (props) => {
  return (
    <tr>
      <td style={{paddingLeft: '0px'}}><input className="uk-checkbox" type="checkbox"/></td>
      <td className='uk-text-truncate' onClick={this.expandReminder}>
        {props.reminder.content}
      </td>
      <td style={{paddingRight: '0px',paddingLeft:'2px'}}>
        <div className='uk-inline'>
          <a uk-icon='clock'></a>
          <div style={{minWidth:"220px"}} uk-dropdown="mode: click;boundary: .uk-table">
            <p>Time</p>
            <input className="uk-input uk-form-blank uk-width-1-3" min='0' max='12' type="number" placeholder="H" maxLength='2' autoFocus/>
            <input className="uk-input uk-form-blank uk-width-1-3" min='0' max='59' type="number" placeholder="M" maxLength='2'/>
            <select className='uk-select uk-width-1-3'>
              <option>AM</option>
              <option>PM</option>
            </select>

            <hr/>

            <p>Date</p>
            <input className="uk-input uk-form-blank uk-width-1-2" min='1' max='28' type="number" placeholder="D" maxLength='2'/>
            <input className="uk-input uk-form-blank uk-width-1-2" min='1' max='12' type="number" placeholder="M" maxLength='2'/>
            <select className='uk-select uk-width-1-1'>
              <option>2018</option>
              <option>2019</option>
            </select>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Sidebar