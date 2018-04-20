import React, { Component } from 'react'
const css = require('./Calendar.css')

class Calendar extends Component {
  render() {
    return (
      <div className="uk-grid-collapse">
        <ul className="uk-grid-collapse uk-text-center uk-height-1-1 uk-margin-left uk-margin-right uk-grid" uk-height-match="target: > li > .uk-card">
          <li className="uk-width-3-5@m">
              <div className="uk-card uk-card-default uk-card-body uk-card-small">
                  <span className="uk-sortable-handle uk-float-left" uk-icon="icon: table"></span>
                  <div className="" uk-slideshow="true">
                      <ul className="uk-slideshow-items">
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large uk-text-d">January</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small calTable">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium dayCal">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium dayCal">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium dayCal">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">February</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">March</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                        <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large uk-text-d">April</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">May</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">June</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>                                        <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large uk-text-d">July</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">6</a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">August</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">September</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large uk-text-d">October</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">November</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                          <li>
                            <div className="uk-overlay uk-position-center uk-width-xxlarge">
                              <p className="uk-text-center uk-text-large">December</p>
                              <table className="uk-table uk-grid-collapse uk-text-center uk-table-small uk-table-responsive">
                                <thead>
                                    <tr>
                                        <th className="uk-text-center uk-table-shrink">SUN</th>
                                        <th className="uk-text-center uk-table-shrink">MON</th>
                                        <th className="uk-text-center uk-table-shrink">TUE</th>
                                        <th className="uk-text-center uk-table-shrink">WED</th>
                                        <th className="uk-text-center uk-table-shrink">THU</th>
                                        <th className="uk-text-center uk-table-shrink">FRI</th>
                                        <th className="uk-text-center uk-table-shrink">SAT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="">
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">4</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium uk-background-primary">
                                        <p className="uk-text-middle uk-light uk-text-bold">5</p>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <div className="uk-card uk-inline">
                                          <span className="uk-position-absolute uk-transform-center uk-badge calNotif">3</span>
                                          <a className="uk-text-middle">
                                            6
                                          </a>
                                        </div>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">7</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">8</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">9</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">10</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">11</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">12</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">13</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">14</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">15</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">16</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">17</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">18</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">19</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">20</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">21</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">22</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">23</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">24</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">25</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">26</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">27</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">28</a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">29</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">30</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle">31</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">1</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">2</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">3</a>
                                      </td>
                                      <td className="uk-box-shadow-hover-medium">
                                        <a className="uk-text-middle uk-text-muted">4</a>
                                      </td>
                                    </tr>
                                </tbody>
                              </table>
                            </div>
                          </li>
                      </ul>
                      <a className="uk-position-center-left uk-position-small uk-hidden-hover uk-overlay" href="" uk-slidenav-previous="true" uk-slideshow-item="previous">previous</a>
                      <a className="uk-position-center-right uk-position-small uk-hidden-hover uk-overlay" href="" uk-slidenav-next="true" uk-slideshow-item="next">next</a>
                  </div>
              </div>
          </li>
          <li className="uk-width-2-5@m">
              <div className="uk-card uk-card-default uk-card-body">
                  <span className="uk-sortable-handle uk-float-left" uk-icon="icon: table"></span>
                  <a href="" className="uk-icon-link uk-float-right" uk-icon="icon: plus-circle"></a>
                  <p className="uk-text-center uk-text-large">Calendar Events</p>
                  <div className="uk-overflow-hidden">
                    <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                        <thead>
                            <tr>
                                <th className="uk-table-expand"></th>
                                <th className="uk-table-shrink"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                              <td className="uk-table-link">
                                  <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                              </td>
                              <td><a href="" className="uk-icon-link uk-float-right" uk-icon="icon: more-vertical"></a></td>
                            </tr>
                            <tr>
                              <td className="uk-table-link">
                                  <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                              </td>
                              <td><a href="" className="uk-icon-link uk-float-right" uk-icon="icon: more-vertical"></a></td>
                            </tr>
                            <tr>
                              <td className="uk-table-link">
                                  <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                              </td>
                              <td><a href="" className="uk-icon-link uk-float-right" uk-icon="icon: more-vertical"></a></td>
                            </tr>
                            <tr>
                              <td className="uk-table-link">
                                  <a className="uk-link-reset" href="">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</a>
                              </td>
                              <td><a href="" className="uk-icon-link uk-float-right" uk-icon="icon: more-vertical"></a></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
              </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Calendar