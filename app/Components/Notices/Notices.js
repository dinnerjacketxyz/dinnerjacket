import React, { Component } from 'react'
const http = require('http')

let dailyNotices = ''
window.noticeIndex = -1
class Notices extends Component {
  constructor(props) {
    super(props)

    this.state = {
      notices: []
    }

    this.init()
  }

  init() {
    dailyNotices = window.dailyNotices

    for (let i = 0; i < dailyNotices.notices.length; i++) {
      // TEMP - proper solotion later (TODO)
      let content = dailyNotices.notices[i].content.replace(/(<([^>]+)>)/ig,'')

      let years = ''
      for (let j = 0; j < dailyNotices.notices[i].years.length; j++) {
        if (dailyNotices.notices[i].years.length >= 6) {
          years = 'ALL'
        } else {
          years += dailyNotices.notices[i].years[j]
          if (j < dailyNotices.notices[i].years.length - 1) {
            years += ', '
          }
        }
      }

      let obj = {
        title: dailyNotices.notices[i].title,
        content: content,
        years: years,
        author: dailyNotices.notices[i].authorName
      }
      this.state.notices.push(obj)
    }
  }

  addToClipboard() {

  }

  /*toggleNotices() {
    let toggle = document.getElementById('toggleNotices')

    if (toggle.className = 'uk-open') {
      toggle.className = ''
    } else {
      toggle.className = 'uk-open'
    }
  } */
  //<button id='toggleNotices' onClick={this.toggleNotices.bind(this)}>Toggle</button>

  render() {
    let rows = this.state.notices.map(notice => {
      return <DailyNoticeRow key = {
          notice.title
        }
        notices = {
          notice
        }
      />
    })
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-margin-left uk-margin-right uk-card uk-card-default uk-card-body uk-width-1-3@xl uk-width-1-2@m uk-width-2-3@s uk-animation-slide-top-small'>
          <table className='uk-table uk-table-small uk-table-hover'>
            <thead>
              <tr>
                <th className='uk-table-shrink'></th>
                <th className='uk-table-expand'></th>
              </tr>
            </thead>
            <tbody> {
              rows
            } </tbody>
          </table>
          <a className='uk-float-right' uk-totop='true' uk-scroll='true'></a>
        </div>
      </div>
    )
  }
}

const DailyNoticeRow = (props) => {
  return (
    <tr>
      <td>
        <span className='uk-label uk-align-left uk-text-middle'>{props.notices.years}</span>
        <ul uk-accordion='multiple: true'>
          <li>
            <a className='uk-accordion-title'>{props.notices.title}</a>
            <div className='uk-accordion-content'>
              <a className='uk-icon-link uk-float-right' uk-icon='icon: more-vertical; ratio: 0.75'></a>
              <div uk-dropdown="mode: click">
                <ul className="uk-nav uk-dropdown-nav">
                </ul>
              </div>
              <div>{props.notices.content}</div>
              <p><b>{props.notices.author}</b></p>
            </div>
          </li>
        </ul>
        <p />
      </td>
    </tr>
  )
}

export default Notices


//<li><a onClick={this.addToClipboard.bind(this)}>Add to clipboard</a></li>
