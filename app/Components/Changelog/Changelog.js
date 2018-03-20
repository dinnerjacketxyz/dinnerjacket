import React, { Component } from 'react'

class Changelog extends Component {
  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-grid-collapse uk-width-xxlarge miniFill'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <div className='uk-margin'>
              <h2>Upcoming</h2>
              <ul>
                <li>Bugfixes and stability</li>
                <li>Reduce size of "DinnerJacket" titles on mobile</li>
                <li>Update timetable that fixes layout on some devices using Safari</li>
                <li>Add school calendar</li>
              </ul>

              <hr />

              <h2>Alpha v0.1.1</h2>
              <ul>
                <li>Sample change</li>
              </ul>

              <hr />

              <h2>Alpha v0.1.0</h2>
              <ul>
                <li>Added dashboard</li>
                <li>Added timetable</li>
                <li>Added user notes</li>
                <li>Added daily notices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Changelog
