import React, { Component } from 'react'
const http = require('http')
const css = require('./Notices.css')

let dailyNotices = ''
window.year = ''
let search

class Notices extends Component {
  constructor(props) {
    super(props)
  
    if (window.year === '') {
      window.year = window.userData['yearGroup']
    }

    this.state = {
      notices: [],
      year: window.year,
      text: 'EXPAND',
      keywords: []
    }
    this.init()
  }

  componentDidMount() {
    let selector = document.getElementById('yearSelector')
    selector.value = window.year

    search = document.getElementById('search')
  }

  strip(html) {
    var tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  init() {
    dailyNotices = window.dailyNotices
    this.state.notices = []
    let lowRelavence = []

    for (let i = 0; i < dailyNotices.notices.length; i++) {
      if (this.state.year == 'ALL' || this.yearInNotice(this.state.year, dailyNotices.notices[i])) {
        if (this.state.keywords.length === 0 || this.keywordsInNotice(this.state.keywords, dailyNotices.notices[i])[0]) {
          let content = this.strip(dailyNotices.notices[i].content)

          let years = ''
          if (dailyNotices.notices[i].years.length >= 6) {
            years = 'ALL'
          } else {
            let c = false
            for (let j = 0; j < dailyNotices.notices[i].years.length; j++) {
              let start = 0
              if (!c) {
                if (years.length > 0) {
                  years += ', '
                }
                start = dailyNotices.notices[i].years[j]
                years += start + ' '
              }

              if (parseInt(dailyNotices.notices[i].years[j]) + 1 === parseInt(dailyNotices.notices[i].years[j+1]) && j < dailyNotices.notices[i].years.length - 1) {
                c = true
              } else {
                c = false
                if (dailyNotices.notices[i].years[j] !== start) {
                  years += ' - ' + dailyNotices.notices[i].years[j] + ' '
                }
              }
            }
          }

          let date = ''
          const MONTHS = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ]

          if (dailyNotices.notices[i].isMeeting) {
            let dd = dailyNotices.notices[i].meetingDate.substr(-2)
            if (dd[0] === '0') {
              dd = dd.substr(-1)
            }
            let mm = dailyNotices.notices[i].meetingDate.substr(-5, 2)
            if (mm[0] === '0') {
              mm = mm.substr(-1)
            }
            date = MONTHS[mm] + ' ' + dd + ' at ' + dailyNotices.notices[i].meetingTime
          }

          let obj = {
            title: dailyNotices.notices[i].title,
            date: date,
            content: content,
            years: years,
            author: dailyNotices.notices[i].authorName
          }
          if (this.state.keywords.length <= 1 || this.keywordsInNotice(this.state.keywords, dailyNotices.notices[i])[1]) {
            this.state.notices.push(obj)
          } else {
            lowRelavence.push(obj)
          }
        }
      }
    }

    //(this.state.notices)
    //(lowRelavence)

    for (let x = 0; x < lowRelavence.length; x++) {
      this.state.notices.push(lowRelavence[x])
    }

    let a = this.state.a
    this.setState({ a: true })
  }

  keywordsInNotice(keywords, notice) {
    //(keywords)
    let all = true
    let or = false
    for (let i = 0; i < keywords.length; i++) {
      if (notice.title.toLowerCase().includes(keywords[i]) || 
          notice.content.toLowerCase().includes(keywords[i]) ||
          notice.authorName.toLowerCase().includes(keywords[i])) {
        or = true
      } else {
        all = false
      }
    }
    return [or, all]
  }

  yearInNotice(year, notice) {
    let found = false

    for (let i = 0; i < notice.years.length; i++) {
      if (year == notice.years[i]) {
        //(year)
        //(notice.years[i])
        found = true
        //(found)
      }
    }
    return found
  }

  selectYear() {
    let selector = document.getElementById('yearSelector')
    this.state.year = selector.options[selector.selectedIndex].text
    window.year = this.state.year
    let a = this.state.a
    this.setState({ a: 'test' })
    //(this.state.year)

    this.init()
  }

  toggleNotices() {
    let text = this.state.text
    let newText = ''
    newText = (text === 'EXPAND') ? 'COLLAPSE' : 'EXPAND'
    this.setState({ text: newText })
  }

  search() {
    //let keywords = this.state.keywords
    //this.setState({ keywords: search.value.toLowerCase().split(/[\s,;]+/) })
    this.state.keywords = search.value.toLowerCase().split(/[\s,;]+/)
    this.init()
  }

  render() {
    let text = this.state.text
    let rows
    if (text === 'EXPAND') {
      rows = this.state.notices.map(notice => {
        return <CollapsedNotices key = {
          notice.title+notice.year
        }
        notices = {
          notice
        }
        />
      })
    } else {
      rows = this.state.notices.map(notice => {
        return <ExpandedNotices key = {
          notice.title+notice.year
        }
        notices = {
          notice
        }
        />
      })
    }
    return (
      <div className='noticesParent'>
        <div className='noticesChild card uk-animation-slide-top-small'>
          <div className='uk-margin-large-bottom'>
            <div className='yearSelect'>
              <select id='yearSelector' onChange={this.selectYear.bind(this)} className='yearSelect uk-select'>
                <option>ALL</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <button onClick={this.toggleNotices.bind(this)} className='uk-button uk-align-left uk-button-default'>
              {this.state.text}
            </button>
          </div>
          <div>
            <ul id='noticesList' className='under' uk-accordion='multiple: true'>
              {rows}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const CollapsedNotices = (props) => {
  return (
    <li className=''>
      <span className='uk-label'>{props.notices.years}</span>
      <a className='uk-accordion-title'>{props.notices.title}</a>
      <div className='uk-accordion-content'>
        {props.notices.content}
        <p className='uk-margin-small-top'><b>{props.notices.author}</b></p>
      </div>
    </li>
  )
}

const ExpandedNotices = (props) => {
  return (
    <li className='uk-open'>
      <span className='uk-label'>{props.notices.years}</span>
      <a className='uk-accordion-title'>{props.notices.title}</a>
      <div className='uk-accordion-content'>
        {props.notices.content}
        <p className='uk-margin-small-top'><b>{props.notices.author}</b></p>
      </div>
    </li>
  )
}

export default Notices

/*            <form className="uk-search uk-search-default uk-align-right">
                <span uk-search-icon='true' uk-icon='icon:search'></span>
                <input id='search' className="uk-search-input" onInput={this.search.bind(this)} type="search" placeholder="Search..."/>
            </form> */