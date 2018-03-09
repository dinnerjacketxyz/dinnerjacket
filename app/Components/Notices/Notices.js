import React, { Component } from 'react'
const http = require('http')
const css = require('./Notices.css')

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
        <div className='uk-margin-top uk-margin-left uk-margin-right uk-card uk-card-default uk-card-body uk-width-xxlarge uk-animation-slide-top-small'>
          <div className='uk-margin-large-bottom uk-padding-large-bottom'>
            <div class="uk-margin uk-align-right">
              <select class="uk-select">
                <option>All</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <button className="uk-button uk-button-default uk-align-left">Hide/Show</button>
          </div>
          <div>
            <ul className='under' uk-accordion='multiple: true'>
              {rows}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const DailyNoticeRow = (props) => {
  return (
          <li>
            <a className='uk-accordion-title'>{props.notices.title}</a>
            <div className='uk-accordion-content'>
              <div className='uk-margin-bottom'>{props.notices.content}</div>
              <p><b>{props.notices.author}</b></p>
            </div>
          </li>
  )
}

export default Notices


//<li><a onClick={this.addToClipboard.bind(this)}>Add to clipboard</a></li>
//<span className='uk-label uk-align-left uk-text-middle'>{props.notices.years}</span>
