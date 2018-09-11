import React, { Component } from 'react'

class Help extends Component {
  render() {
    return (
        <div id='help' className='hCenterOnlyContainer'>
          <div style={{textAlign:'left'}} className='hCenterOnlyCard card uk-animation-slide-top-small'>
            <span className="uk-margin-small-right settingsParent" uk-icon="icon: question; ratio: 2"></span>
            <h2 className='uk-text-center'>Help</h2>
            <ul uk-accordion="multiple: true">
              <li className="uk-open">
                <a className="uk-accordion-title">Dashboard</a>
                <div className="uk-accordion-content">
                  <p>A short summary of the day at hand that tells you when and where you need to be. Dashboard is integrated with the timetable's morning classes and updates often to stay relevant.</p>
                  
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Timetable</a>
                <div className="uk-accordion-content">
                  <p>Shows the three week timetable cycle in a classic format with the ability to customise morning classes. Timetable is printable and takes advantage of screen real estate.</p>
                  <hr/>
                  <p>Add and remove morning classes</p>
                  <ol type='1'>
                    <li>Click the corresponding button at the bottom left and right corners of the timetable</li>
                    <li>Fill the form vertically, ensuring valid inputs</li>
                    <li>Submit form</li>
                  </ol>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Notes</a>
                <div className="uk-accordion-content">
                  <p>To keep track of your content in simple way. Integrated with your school subjects. Syncs instantly across your devices</p>
                  <hr/>
                  <p>Rename, edit, remove notes on mobile</p>
                  <ol type='1'>
                    <li>Long press the note you wish you operate on</li>
                    <li>Select the command you wish to perform</li>
                    <li>Complete the popup</li>
                  </ol>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Class Notes</a>
                <div className="uk-accordion-content">
                  <p>For teachers to help students keep track of tasks. Posted to classes. Syncs instantly to students. Notes will automatically save a draft when teachers leave the tab.</p>
                  <hr/>
                  <p>Rename, edit, remove notes on mobile</p>
                  <ol type='1'>
                    <li>Long press the note you wish you operate on</li>
                    <li>Select the command you wish to perform</li>
                    <li>Complete the popup</li>
                  </ol>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Notices</a>
                <div className="uk-accordion-content">
                  <p>Quickly searchable and sortable notices to help you find relevant items quickly.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Calendar</a>
                <div className="uk-accordion-content">
                  <p>A more accessible format and the ability to add personal events.</p>
                  <hr/>
                  <p>Remove personal events on mobile</p>
                  <ol type='1'>
                    <li>Long press the event you wish you operate on</li>
                    <li>Click remove</li>
                    <li>Confirm</li>
                  </ol>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Profile</a>
                <div className="uk-accordion-content">
                  <p>There when you need it, contains ID numbers, emails, and award scheme information.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Settings</a>
                <div className="uk-accordion-content">
                  <p>Allows you to customise DinnerJacket to your liking</p>
                  <hr/>
                  <p>Bugs with theme or timetable are likely caused by conflicts with past versions of DinnerJacket
                    and can be fixed by doing the following:
                  </p>
                  <ol type='1'>
                    <li>Navigate to the settings page in the dropdown on the right side of the navigation bar.</li>
                    <li>Set the settings to your liking making sure that the combination box is changed.</li>
                  </ol>
                </div>
              </li>
            </ul>
          </div>
        </div>
    )
  }
}

export default Help
