import React, { Component } from 'react'
const css = require('./Changelog.css')

class Changelog extends Component {
  render() {
    return (
        <div className='clContainer'>
          <div className='clCard uk-animation-slide-top-small'>
            <article class="uk-article">
              <h1 class="uk-article-title">Unreleased features</h1>
              <p class="uk-article-meta">Written on 26 April 2018</p>
              <ul>
                <li>Bugfixes and stability</li>
                <li>Low resolution compatibility</li>
                <li>New calendar page with school calendar</li>
                <li>Better notes editor</li>
                <li>New profile page with participation details</li>
                <li>Accurate timetable</li>
                <li>Subjects on your timetable are highlighted when you hover over them.</li>
                <li>Different changelog appearance</li>
              </ul>
            </article>

            <hr />

            <article class="uk-article">
              <h1 class="uk-article-title">Alpha v0.1.2</h1>
              <p class="uk-article-meta">Written on 25 April 2018</p>
              <ul>
                <li></li>
              </ul>
            </article>

            <hr />

            <article class="uk-article">
              <h1 class="uk-article-title">Alpha v0.1.1</h1>
              <p class="uk-article-meta">Written on 25 April 2018</p>
              <p>The first update of DinnerJacket fixing critical to cosmetic issues.</p>
              <ul>
                <li>Fixed crashing on loading page</li>
                <li>Updated full timetable</li>
                <li>Fixed notes crashing on launch</li>
                <li>Updated server and login system</li>
              </ul>
            </article>
          
            <hr />

            <article class="uk-article">
              <h1 class="uk-article-title">Alpha v0.1.0</h1>
              <p class="uk-article-meta">Written on 25 April 2018</p>
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
