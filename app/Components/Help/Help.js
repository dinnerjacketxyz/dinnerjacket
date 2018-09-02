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
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Timetable</a>
                <div className="uk-accordion-content">
                  <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Notes</a>
                <div className="uk-accordion-content">
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Notices</a>
                <div className="uk-accordion-content">
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Calendar</a>
                <div className="uk-accordion-content">
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Profile</a>
                <div className="uk-accordion-content">
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                </div>
              </li>
              <li>
                <a className="uk-accordion-title">Settings</a>
                <div className="uk-accordion-content">
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
    )
  }
}

export default Help
