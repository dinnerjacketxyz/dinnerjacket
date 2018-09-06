import React, { Component } from 'react'

class Sidebar extends Component {
  render() {
    return (
      <div className='uk-offcanvas-bar'>
        <button className="uk-offcanvas-close" type="button" uk-close=''></button>
        <h3 style={{marginTop:'40px'}}>Reminders</h3>
        <table className="uk-table uk-table-hover uk-table-middle uk-table-divider uk-table-small">
          <thead>
              <tr>
                  <th className="uk-table-shrink"></th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                  </td>
              </tr>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                  </td>
              </tr>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                  </td>
              </tr>
              <tr>
                  <td><input className="uk-checkbox" type="checkbox"/></td>
                  <td>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Sidebar