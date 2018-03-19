import React, { Component } from 'react'
const http = require('http')
const css = require('./Notices.css')

let dailyNotices = ''
class Notices extends Component {
  constructor(props) {
    super(props)
    
    const userYear = window.userData['yearGroup']
    
    this.state = {
      notices: [],
      year: window.userData['yearGroup'],
      text: 'EXPAND ALL'
    }
    
    this.init()
  }
  
  componentDidMount() {
    let selector = document.getElementById('yearSelector')
    selector.value = window.userData['yearGroup']
  }

  strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  init() {
    dailyNotices = window.dailyNotices
    this.state.notices = []
    //console.log('testing132')

    /*years += dailyNotices.notices[i].years[j]
      if (j < dailyNotices.notices[i].years.length - 1) {
        years += ', '
      }
    }*/



    for (let i = 0; i < dailyNotices.notices.length; i++) {
      if (this.state.year == 'ALL' || this.yearInNotice(this.state.year, dailyNotices.notices[i])) {
        // TEMP - proper solotion later (TODO)
        //let content = dailyNotices.notices[i].content.replace(/(<([^>]+)>)/ig,'')
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
        this.state.notices.push(obj)
      }
    }
  }

  yearInNotice(year, notice) {
    let found = false

    for (let i = 0; i < notice.years.length; i++) {
      if (year == notice.years[i]) {
        //console.log(year)
        //console.log(notice.years[i])
        found = true
        //console.log(found)
      }
    }
    return found
  }

  selectYear() {
    let selector = document.getElementById('yearSelector')
    this.state.year = selector.options[selector.selectedIndex].text
    let a = this.state.a
    this.setState({ a: 'test' })
    //console.log(this.state.year)

    this.init()
  }

  toggleNotices() {
    let text = this.state.text
    let newText = ''
    if (text === 'EXPAND ALL') {
      newText = 'COLLAPSE ALL'
    } else {
      newText = 'EXPAND ALL'
    }

    this.setState({ text: newText })
  }

  render() {
    let text = this.state.text
    let rows
    if (text === 'EXPAND ALL') {
      rows = this.state.notices.map(notice => {
        return <CollapsedNotices key = {
          notice.title
        }
        notices = {
          notice
        }
        />
      })
    } else {
      rows = this.state.notices.map(notice => {
        return <ExpandedNotices key = {
          notice.title
        }
        notices = {
          notice
        }
        />
      })
    }
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-card uk-card-default uk-card-body uk-width-xxlarge miniFill uk-animation-slide-top-small'>
          <div className='uk-margin-large-bottom uk-padding-large-bottom'>
            <div className='uk-margin uk-align-right'>
              <select id='yearSelector' onChange={this.selectYear.bind(this)} className='uk-select'>
                <option>ALL</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
            </div>
            <button onClick={this.toggleNotices.bind(this)} className="uk-button uk-button-default uk-align-left">
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
    <li className='uk-animation-slide-top-small'>
      <span className='uk-label'>{props.notices.years}</span>
      <a className='uk-accordion-title'>{props.notices.title}</a><i>{props.notices.date}</i>
      <div className='uk-accordion-content uk-animation-slide-top-small'>
        {props.notices.content}
        <p className='uk-margin-small-top'><b>{props.notices.author}</b></p>
      </div>
    </li>
  )
}

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

export default Notices


//<li><a onClick={this.addToClipboard.bind(this)}>Add to clipboard</a></li>
//<span className='uk-label uk-align-left uk-text-middle'>{props.notices.years}</span>
