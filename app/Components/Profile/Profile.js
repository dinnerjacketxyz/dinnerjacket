import React, { Component } from 'react'
const css = require('./Profile.css')

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="profileParent">
          <div className="profileChild">
            <span className='profileParent' uk-icon="icon: user; ratio:2"></span>
            <p className="uk-card-title uk-text-center">Profile</p>
            <hr/>
            <div className="uk-align-left">
              Filter by year: 
              <select className="uk-margin-left uk-select uk-form-width-small">
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                  <option>2014</option>
                  <option>2013</option>
              </select>
            </div>
            <div className='uk-margin-large-top big'>
              <ul uk-accordion="multiple: true">
                <li className="uk-open">
                    <p className="uk-accordion-title">2018</p>
                    <div className="uk-accordion-content">
                      <table className="uk-table uk-table-small uk-table-hover uk-table-striped">
                          <thead>
                              <tr>
                                  <th className="">Category</th>
                                  <th className="">Activity</th>
                                  <th className="uk-table-shrink">Points</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <td>Table Data</td>
                                  <td>Table Data</td>
                                  <td>20</td>
                              </tr>
                              <tr>
                                  <td>Table Data</td>
                                  <td>Table Data</td>
                                  <td>20</td>
                              </tr>
                          </tbody>
                      </table>
                    </div>
                </li>
                <li>
                    <p className="uk-accordion-title">2017</p>
                    <div className="uk-accordion-content">
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                    </div>
                </li>
                <li>
                    <p className="uk-accordion-title">2016</p>
                    <div className="uk-accordion-content">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                    </div>
                </li>
                <li>
                    <p className="uk-accordion-title">2015</p>
                    <div className="uk-accordion-content">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </li>
                <li>
                    <p className="uk-accordion-title">2014</p>
                    <div className="uk-accordion-content">
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor reprehenderit.</p>
                    </div>
                </li>
                <li>
                    <p className="uk-accordion-title">2013</p>
                    <div className="uk-accordion-content">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat proident.</p>
                    </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile