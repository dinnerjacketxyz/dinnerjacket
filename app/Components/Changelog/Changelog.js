import React, { Component } from 'react'
const css = require('./Changelog.css')

class Changelog extends Component {
  render() {
    return (
      <div id='changelog' className='hCenterOnlyContainer'>
        <div style={{textAlign:'left'}} className='hCenterOnlyCard card uk-animation-slide-top-small'>
          <div class="uk-card uk-card-primary uk-card-body">
            <h2 style={{fontWeight: '300'}} class="uk-card-title">We are looking for developers</h2>
            <p>If you're interested in learning how create web apps or can already code email us at <code style={{color:'black',userSelect:'text'}}>dinnerjacketxyz@gmail.com</code>, or contact us through the user feedback section.</p>
          </div>
          <br/>
            <article className="uk-article">
              <h1 className="uk-article-title">Known bugs and unreleased features</h1>
              <p className="uk-article-meta">11 October 2018</p>
              <p>Thank you for submitting user feedback, here are the things we have recorded, we should be working on it promptly. We are planning a v3 that should bring many new features as well as prepare DinnerJacket for long term stability as we are leaving the school this year. We should be fixing bugs in v2.0.1 scheduled for next weekend.</p>
              <br/>
              <b>Known Bugs</b>
              <ul>
                <li>Dashboard does not up date substitutes.</li>
                <li>Switching between notes interferes with saving.</li>
                <li>Bugs with selecting morning classes.</li>
                <li>Reminders being cleared when you login and logout.</li>
                <li>Saving issues to do with settings.</li>
                <li>Month disreprancy in the daily notices.</li>
                <li>Login issues in general, having to login too often or not being able to login on mobile clients.</li>
                <li>Calendar and dashboard causing crashing.</li>
              </ul>
              <br/>
              <b>Requested features</b>
              <ul>
                <li>Offline functionality in general, specifically offline timetabling.</li>
                <li>See and add morning or afternoon sports and extra-curricular activities.</li>
                <li>A standalone application.</li>
                <li>Adding times for personal events on the calendar.</li>
                <li>Adding calendar events repeatedly.</li>
                <li>Table in the notes section.</li>
                <li>Add event button on calendar too small.</li>
                <li>See the length of the periods.</li>
              </ul>
            </article>

            <article className="uk-article">
              <h1 className="uk-article-title">v2.0.0</h1>
              <p className="uk-article-meta">11 September 2018</p>
              <p>Post Trials update finalising DinnerJacket for assessment and marking its exit from acceptability testing.</p>
              <ul>
                <li>The reminders sidebar</li>
                <li>Class notes that sync</li>
                <li>Notes stability</li>
                <li>Calendar personal events and search</li>
                <li>Procedural and conceptual help</li>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Beta v1.2.0</h1>
              <p className="uk-article-meta">1 July 2018</p>
              <p>Start of Term 3 update improving existing features and adding more</p>
              <ul>
                <li>Custom morning classes on the timetable and dashboard</li>
                <li>The ability to create, edit and sort multiple notes</li>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Beta v1.1.0</h1>
              <p className="uk-article-meta">1 July 2018</p>
              <p>End of Term 2 update improving existing features and adding more</p>
              <ul>
                <li>Added SBHS calendar integration</li>
                <li>Addressed bugs in settings page</li>
                <li>Refined daily notices search</li>
                <li>Added basic teacher access</li>
                <li>Small UI updates within dashboard and timetable</li>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Beta v1.0.3</h1>
              <p className="uk-article-meta">28 June 2018</p>
              <p>Another end of Term 2 update addressing existing bugs</p>
              <ul>
                <li>Fixed notes crashing on first load</li>
                <li>Set default theme to light, clean</li>
                <li>Addressed issues displaying certain timetabled classes</li>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Beta v1.0.2</h1>
              <p className="uk-article-meta">25 June 2018</p>
              <p>End of Term 2 update addressing existing bugs</p>
              <ul>
                <li>Fixed notes crashing on first load</li>
                <li>Set default theme to light, clean</li>
                <li>Addressed issues displaying certain timetabled classes</li>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Beta v1.0.1</h1>
              <p className="uk-article-meta">28 May 2018</p>
              <p>Mid-Term 2 update addressing existing issues and bugs, and adding new functionality.</p>
              <ul>
                <li>Bugfixes for participation tab</li>
                <li>Round corners</li>
                <li>Notices remembers your filter</li>
                <li>Notes are kept to the local device (temporary)</li>
                <li>Buggy animations removed</li>
                <li>Improved load times</li>
                <ul>
                  <li>Removed render blocking scripts</li>
                  <li>Preloading images, scripts, and styles</li>
                  <li>You stay logged in</li>
                </ul>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Beta v1.0.0</h1>
              <p className="uk-article-meta">21 May 2018</p>
              <p>Minor term 2 update adding cosmetic options and increasing performance.</p>
              <ul>
                <li>App caches dashboard data for improved load times</li>
                <li>Added setting for timetable style</li>
                <li>Added optional dark mode</li>
                <li>Added optional clean theme</li>
                <li>Revised style of existing themes</li>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Alpha v0.1.2</h1>
              <p className="uk-article-meta">29 April 2018</p>
              <p>Term 2 update addressing existing issues and bugs, and adding new functionality.</p>
              <ul>
                <li>The ability to logout</li>
                <li>Bugfixes and stability</li>
                <li>Low resolution compatibility</li>
                <li>Better notes editor</li>
                <li>New profile page with participation and user details</li>
                <li>Accurate timetable</li>
                <li>Accurate daily notices input and filtering</li>
                <li>Subjects on your timetable are highlighted when you hover over them.</li>
                <li>Different changelog appearance</li>
              </ul>
            </article>

            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Alpha v0.1.1</h1>
              <p className="uk-article-meta">25 March 2018</p>
              <p>The first update of DinnerJacket fixing critical to cosmetic issues.</p>
              <ul>
                <li>Fixed crashing on loading page</li>
                <li>Updated full timetable</li>
                <li>Fixed notes crashing on launch</li>
                <li>Updated server and login system</li>
              </ul>
            </article>
          
            <hr />

            <article className="uk-article">
              <h1 className="uk-article-title">Alpha v0.1.0</h1>
              <p className="uk-article-meta">18 March 2018</p>
              <p>The first operational release of DinnerJacket with basic functionality.</p>
              <ul>
                <li>Added dashboard</li>
                <li>Added timetable</li>
                <li>Added user notes</li>
                <li>Added daily notices</li>
              </ul>
            </article>
          </div>
        </div>
    )
  }
}

export default Changelog
