import React, { Component } from 'react'

class Sidebar extends Component {
  constructor(props) {
    super(props)
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
    document.getElementById('remindersTable').innerHTML += `<tr>
    <td><input class="uk-checkbox" type="checkbox"/></td>
    <td><input class="uk-input uk-form-blank" type="text" placeholder="Add reminder" autofocus/></td>
    <td><div class='uk-inline'><a uk-icon='clock'></a><div style="min-width:100px" uk-dropdown="mode: click;boundary: .uk-table"><input class="uk-input uk-form-blank uk-width-small" type="text" placeholder="Date" autofocus/></div></div></td>
  </tr>`
  }
  render() {
    return (
      <div className='uk-offcanvas-bar'>
        <button className="uk-offcanvas-close" type="button" uk-close=''></button>
        <h3 style={{marginTop:'40px'}}>Reminders</h3>
          <button style={{borderRadius:'5px 0 0 5px',borderRight:'0px none'}} onClick={this.expandAll} className='uk-margin-top uk-button uk-button-default uk-width-3-5'>expand</button>
          <button style={{borderRadius:'0 5px 5px 0'}} onClick={this.addReminder} className='uk-margin-top uk-button uk-button-default uk-width-2-5' uk-icon='plus'></button>
        <table  className="uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small">
          <thead>
              <tr>
                  <th className="uk-table-shrink"></th>
                  <th></th>
              </tr>
          </thead>
          <tbody id='remindersTable'>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td className='uk-text-truncate' onClick={this.expandReminder}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </td>
              </tr>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td className='uk-text-truncate' onClick={this.expandReminder}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </td>
              </tr>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td className='uk-text-truncate' onClick={this.expandReminder}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </td>
              </tr>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td className='uk-text-truncate' onClick={this.expandReminder}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Sidebar