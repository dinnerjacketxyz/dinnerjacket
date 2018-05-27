import React, { Component } from 'react'
const css = require('./Changelog.css')

class Changelog extends Component {
  render() {
    return (
        <div className='clContainer'>
          <div className='clCard card uk-animation-slide-top-small'>
            <article className="uk-article">
              <h1 className="uk-article-title">Unreleased features</h1>
              <ul>
                <li>SBHS Calendar integration</li>
                <li>Personal calendar integration</li>
                <li>Themes and additional cosmetic options</li>
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
