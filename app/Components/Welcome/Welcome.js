import React, { Component } from 'react'

class Welcome extends Component {
  toggleLogin() {
    // Ensure this toggles correctly between Login and Logout
    // A user may already have a token and therefore in that case
    // it needs to begin with 'Logout' functionality
    console.log('Login clicked')

    let url = window.location.toString()
    if (url.substr(url.length - 11) === '/index.html') {
      alert('Run "npm start" to use server and login functions')
      console.log('Run "npm start" to use server and login functions')
    } else {
      // also busted cause the entire page reloads on Login
      // therefore it gets initialised again and set to false
      //window.authSuccess = true
      //document.getElementById('DashboardLi').click()
      window.location.href = '/login'

      // this is busted
      //window.states.visible = window.STATES.DASHBOARD
    }
  }

  render() {
    return (
      <div id='main' className='main'>
        <nav className='uk-navbar uk-navbar-container uk-margin'>
          <div className='uk-navbar-left'>
            <img id='logo'
              className='uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
              alt='logo' src='64.png' width='60px' height='50px'>
            </img>
          </div>
          <div className='uk-navbar-right'>
            <ul className='uk-navbar-nav'>
              <li className='uk-animation-toggle'>
                  <a className='uk-box-shadow-hover-medium' onClick={this.toggleLogin.bind(this)}>
                    Login
                  </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className='uk-flex uk-flex-center'>
            <div className='uk-grid uk-grid-collapse uk-child-width-1-2 uk-width-1-2@xl uk-width-4-5@m uk-text-center uk-margin-right uk-margin-left'>
              <div>
                  <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
                      <img id='logo'
                        className='uk-disabled'
                        alt='logo' src='256.png' width='150px' height='150px'>
                      </img>
                      <br/>

                      <span className='uk-text-center uk-margin-top uk-h1'>DinnerJacket</span>
                      <br/>
                      <span className='uk-label uk-label-danger'>alpha</span>

                      <p className='uk-text-small uk-margin-small-top uk-margin-small-bottom'>alpha v0.1.0</p>
                      <p className=''>This is an alpha. That means that you might try out new features that are still in development, or even run into technical issues from time to time.</p>
                      <hr/>
                      <h2 className='uk-h2 uk-margin-bottom'>Welcome!</h2>
                      <button className='uk-button uk-button-primary' onClick={this.toggleLogin.bind(this)}>Login</button>
                  </div>
              </div>
              <div>
                <div className='uk-card uk-card-default uk-card-body'>
                    <p className='uk-text-large'>Roll Call in</p>
                    <h1 className='time uk-text-center uk-heading-primary uk-margin-small-top uk-margin-medium-bottom'>
                      10:00:00
                    </h1>
                    <div className=''>
                      <table className='uk-table uk-table-hover uk-table-small'>
                        <tbody>
                          <tr>
                            <td className='uk-text-lead uk-text-left'>
                              English
                              <dd className='uk-text-meta uk-text-muted uk-text-top uk-text-left'>
                                at 09:05 with Ms English
                              </dd>
                            </td>
                            <td className='uk-text-middle uk-table-shrink uk-text-lead'>201</td>
                          </tr>
                          <tr>
                            <td className='uk-text-lead uk-text-left uk-text-muted'>
                              <small>Study Period</small>
                              <dd className='uk-text-meta uk-text-muted uk-text-top uk-text-left'>

                              </dd>
                            </td>
                            <td className='uk-text-middle uk-table-shrink uk-text-lead uk-text-muted'>10:10</td>
                          </tr>
                          <tr>
                            <td className='uk-text-lead uk-text-left uk-text-muted'>
                              <small>Lunch</small>
                              <dd className='uk-text-meta uk-text-muted uk-text-top uk-text-left'>

                              </dd>
                            </td>
                            <td className='uk-text-middle uk-table-shrink uk-text-lead uk-text-muted'>11:10</td>
                          </tr>
                          <tr>
                            <td className='uk-text-lead uk-text-left'>
                              Maths
                              <dd className='uk-text-meta uk-text-muted uk-text-top uk-text-left'>
                                at 11:50 with Ms Maths
                              </dd>
                            </td>
                            <td className='uk-text-middle uk-table-shrink uk-text-lead'>101</td>
                          </tr>
                          <tr>
                            <td className='uk-text-lead uk-text-left'>
                              English
                              <dd className='uk-text-meta uk-text-muted uk-text-top uk-text-left'>
                                at 12:55 with Ms English
                              </dd>
                            </td>
                            <td className='uk-text-middle uk-table-shrink uk-text-lead'>202</td>
                          </tr>
                          <tr>
                            <td className='uk-text-lead uk-text-left uk-text-muted'>
                              <small>Recess</small>
                              <dd className='uk-text-meta uk-text-muted uk-text-top uk-text-left'>

                              </dd>
                            </td>
                            <td className='uk-text-middle uk-table-shrink uk-text-lead uk-text-muted'>13:55</td>
                          </tr>
                          <tr>
                            <td className='uk-text-lead uk-text-left'>
                              Maths
                              <dd className='uk-text-meta uk-text-muted uk-text-top uk-text-left'>
                                at 14:15 with Ms English
                              </dd>
                            </td>
                            <td className='uk-text-middle uk-table-shrink uk-text-lead'>101</td>
                          </tr>
                        </tbody>
                      </table>
                      <h1></h1>
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Welcome
