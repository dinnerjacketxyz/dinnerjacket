import React, { Component } from 'react'
const css = require('./Calendar.css')

let date = '2018-04-26'

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      diaryCal: []
    }
  }

  componentDidMount() {
    diaryCal = window.diaryCal
    this.state.diaryCal = []

    console.log(diaryCal[0])
  }
  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-grid-collapse uk-width-xxlarge miniFill'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <a className='uk-icon-link uk-float-right' uk-icon='icon: plus-circle' />
            <p className='uk-text-center uk-text-large'>Calendar Events</p>
            <div className='uk-overflow-hidden'>
              <table className='uk-table uk-table-hover uk-table-middle uk-table-divider'>
                <thead>
                  <tr>
                    <th className='uk-table-expand' />
                    <th className='uk-table-shrink' />
                  </tr>
                </thead>
                <tbody>
                  HERERERERRERERRERRERRERERERRERERERRERER
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const ListItem = (props) => {
  return (
    <tr>
      <td>
        <a className='uk-link-reset'>LOREM IPSUM</a>
      </td>
      <td>
        <a className='uk-icon-link uk-float-right' uk-icon='icon: more-vertical' />
      </td>
    </tr>
  )
}

export default Calendar

/*

const ExpandedNotices = (props) => {
  return (
    <li className='uk-open uk-animation-slide-top-small'>
      <span className='uk-label'>{props.notices.years}</span>
      <a className='uk-accordion-title'>{props.notices.title}</a><i>{props.notices.date}</i>
      <div className='uk-accordion-content uk-animation-slide-top-small'>
        {props.notices.content}
        <p className='uk-margin-small-top'><b>{props.notices.author}</b></p>
      </div>
    </li>
  )
}

*/