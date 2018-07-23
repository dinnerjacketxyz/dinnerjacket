import React, { Component } from 'react'
const css = require('./Notices.css')

let dailyNotices = ''
window.year = ''
let search

class Notices extends Component {
  constructor(props) {
    super(props)
  
    // Checks for student access level
    // Sets notice filter to student year if student is logged in
    // If a teacher is logged in, default filter is set to ALL
    if (window.year === '' && window.userData.role === 'Student') {
      window.year = window.userData['yearGroup']
    } else {
      window.year = 'ALL'
    }

    this.state = {
      notices: [], // Array containing all notices to be rendered
      year: window.year, // Value in year filter dropdown
      text: 'EXPAND', // State indicating whether all notices are expanded or collapsed
      keywords: [] // Current search keywords entered into input box
    }
  }
  
  componentDidMount() {
    // Updates the year selector UI element
    // Displays appropriate year group as selected in lines 16-20
    let selector = document.getElementById('yearSelector')
    selector.value = window.year
    
    search = document.getElementById('search')
    this.init()
  }

  /**
   * Removes tags from notice content
   * @param {*} html - original notice content to be formatted
   */
  strip(html) {
    var tmp = document.createElement('DIV')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  }

  /**
   * Runs through all notices returned by the API
   * Checks whether they match search keywords
   * Formats room, date, teacher, title, content etc. of notice
   * Pushes all notices to be rendered in this.state.notices
   */
  init() {
    dailyNotices = window.dailyNotices
    this.state.notices = []
    let lowRelavence = []
    let count = 0

    for (let i = 0; i < dailyNotices.notices.length; i++) {
      if (this.state.year == 'ALL' || this.yearInNotice(this.state.year, dailyNotices.notices[i])) {
        if (this.state.keywords.length === 0 || this.keywordsInNotice(this.state.keywords, dailyNotices.notices[i])) {
          let content = this.strip(dailyNotices.notices[i].content)
          count++

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
            date = MONTHS[mm] + ' ' + dd + ', ' + dailyNotices.notices[i].meetingTime
          }

          let obj = {
            title: dailyNotices.notices[i].title,
            date: date,
            content: content,
            years: years,
            author: dailyNotices.notices[i].authorName,
            ID: count
          }
          this.state.numNotices++
          this.state.notices.push(obj)
          //if (this.state.keyword === '' || this.keywordInNotice(this.state.keyword, dailyNotices.notices[i])) {
          //  this.state.notices.push(obj)
          //}
        }
      }
    }

    if (this.state.notices.length <= 0) {
      // NO NOTICES
    }
  }

  /**
   * Checks if ALL search keywords are present within a notice
   * @param {array of strings} keywords - keywords entered into the search field
   * @param {obj} notice - notice to be searched
   * @returns {boolean} - whether or not the keywords are present
   */
  keywordsInNotice(keywords, notice) {
    let match = true
    for (let i = 0; i < keywords.length; i++) {
      if (!(notice.title.toLowerCase().includes(keywords[i]) ||
        notice.content.toLowerCase().includes(keywords[i]) ||
        notice.authorName.toLowerCase().includes(keywords[i]))) {

        match = false
        return match
      }
    }
    return match
  }

  /**
   * Checks if notice is relevant to selected year
   * @param {string} year - selected year
   * @param {obj} notice - notice to be filtered
   * @returns {boolean} - whether or not the keywords are present
   */
  yearInNotice(year, notice) {
    let found = false

    for (let i = 0; i < notice.years.length; i++) {
      if (year == notice.years[i]) {
        found = true
      }
    }
    return found
  }

  /**
   * Set selected year to the value chosen in the year selector dropdown
   */
  selectYear() {
    let selector = document.getElementById('yearSelector')
    this.state.year = selector.options[selector.selectedIndex].text
    window.year = this.state.year
    let a = this.state.a
    this.setState({ a: 'test' })
    //console.log(this.state.year)

    this.init()
  }

  /**
   * Switch toggle text between EXPAND and COLLAPSE upon [toggle] button click
   */
  toggleNotices() {
    let text = this.state.text
    let newText = ''
    newText = (text === 'EXPAND') ? 'COLLAPSE' : 'EXPAND'
    this.setState({ text: newText })
  }

  /**
   * Save keywords as they are entered into the search field
   * Regex is used to seperate entries by spaces, commas and semi-colons
   * Each word is saved in this.state.keywords - an array of strings
   */
  search() {
    let keywords = this.state.keywords
    this.setState({ keywords: search.value.toLowerCase().split(/[\s,;]+/) })
    this.state.keywords = search.value.toLowerCase().split(/[\s,;]+/)
    this.init()
  }

  /**
   * Map notices in the correct layout depending on EXPAND/COLLAPSE status
   * Render all notices together with other UI element - search field, year selector etc.
   */
  render() {
    let text = this.state.text
    let rows
    if (text === 'EXPAND') {
      rows = this.state.notices.map(notice => {
        return <CollapsedNotices key={notice.ID} notices={notice} />
      })
    } else {
      rows = this.state.notices.map(notice => {
        return <ExpandedNotices key={notice.ID} notices={notice} />
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
            <form className="uk-search uk-search-default uk-align-right">
                <span uk-search-icon='true' uk-icon='icon:search'></span>
                <input id='search' className="uk-search-input" onInput={this.search.bind(this)} type="search" placeholder="Search"/>
            </form>
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

/**
 * Render mapped notices in their collapsed state
 * _____ always displayed
 * Content ... displayed and toggled on click
 * @param {*} props 
 */
const CollapsedNotices = (props) => {
  return (
    <li className=''>
      <span className='uk-label'>{props.notices.years}</span>
      <a className='uk-accordion-title'>{props.notices.title}</a>
      <b>{props.notices.date}</b>
      <div className='uk-accordion-content'>
        {props.notices.content}
        <p className='uk-margin-small-top'><b>{props.notices.author}</b></p>
      </div>
    </li>
  )
}

/**
 * Render mapped notices in their expanded state
 * Accordions are open by default and all fields are displayed
 * @param {*} props 
 */
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
