import React, { Component } from 'react'
const http = require('http')

let dailyNotices = ''
window.noticeIndex = -1
class Notices extends Component {
  constructor(props) {
    super(props)

    // Get daily notices from SBHS API
    http.get('/getdata?url=dailynews/list.json', (res) => {
      res.setEncoding('utf8')
      /*res.on('data', (body) => {
        dailyNotices = JSON.parse(body)

        this.init()
      })*/

      let data = ''
      res.on('data', (body) => {
        data += body
      })
      res.on('end', (body) => {
        dailyNotices = JSON.parse(data)
        this.init()
      })
    })

    this.state = {
      notices: [],
      retrieved: false
    }
  }

  init() {
    console.log(dailyNotices.notices[0])

    let noticesList = document.getElementById('noticesList')
    //noticesList.innerHTML += dailyNotices.notices[0].content
    //noticesList.innerHTML += <tr><td><p>Test</p></td><tr>
    //this.addNotice()

    /*while (window.noticeIndex < dailyNotices.notices.length) {
      this.addNotice()
      window.noticeIndex++
    }*/

    //this.addNotice()

    for (let i = 0; i < dailyNotices.notices.length; i++) {
      // TEMP - proper solotion later (TODO)
      let content = dailyNotices.notices[i].content.replace(/(<([^>]+)>)/ig,'')
      /*let content = dailyNotices.notices[i].content
      content = content.substr(4, content.length - 8)*/

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
        years: years
        //content: dailyNotices.notices[i].content
      }
      this.state.notices.push(obj)
    }

    let retrieved = this.state.retrieved
    this.setState({ retrieved: true })

    console.log(this.state.notices)
  }

  addNotice() {
    /*let nextState = this.state
    nextState.notices.push(this.state.notices.length)
    this.setState(nextState)*/
  }

  /*
  <tr>
      <td><span className='uk-label uk-label-warning uk-align-right uk-text-middle'>Y7</span></td>
      <td>
        <ul uk-accordion='multiple: true'>
          <li>
              <a className='uk-accordion-title' href='#'>Item 1</a>
              <div className='uk-accordion-content'>
                  <a className='uk-icon-link uk-float-right' uk-icon='icon: more-vertical; ratio: 0.75'></a>
                  <div uk-dropdown='mode: click'>
                    <ul className='uk-nav uk-dropdown-nav'>
                      <li><a href='#'>Add to reminders</a></li>
                      <li><a href='#'>Item</a></li>
                      <li><a href='#'>Item</a></li>
                    </ul>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

              </div>
          </li>
        </ul>
      </td>
  </tr>
  */

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
        <div className='uk-margin-top uk-margin-left uk-margin-right uk-card uk-card-default uk-card-body uk-width-1-3@xl uk-width-1-2@m uk-width-2-3@s'>
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
          <a className='uk-float-right' uk-totop uk-scroll></a>
        </div>
      </div>
    )
  }
}

const DailyNoticeRow = (props) => {
  return (
    <tr>
    <td><span className='uk-label uk-align-left uk-text-middle'>{props.notices.years}</span></td>
      <td>
        <ul uk-accordion='multiple: true'>
          <li>
            <a className='uk-accordion-title'>{props.notices.title}</a>
            <div className='uk-accordion-content'>
              <a className='uk-icon-link uk-float-right' uk-icon='icon: more-vertical; ratio: 0.75'></a>
              {props.notices.content}
            </div>
          </li>
        </ul>
        <p />
      </td>
    </tr>
  )
}





    /*return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-margin-left uk-margin-right uk-card uk-card-default uk-card-body uk-width-1-3@xl uk-width-1-2@m uk-width-2-3@s'>
          <table className='uk-table uk-table-small uk-table-hover'>

              <thead>
                  <tr>
                    <th className='uk-table-shrink'></th>
                    <th></th>
                  </tr>
              </thead>

              <tbody id='noticesList'>

              </tbody>

          </table>
          <a className='uk-float-right' uk-totop uk-scroll></a>
        </div>
      </div>
    )
  }*/
//}

export default Notices

/*

{this.state.notices.map(notice => <tr>
    <td>
      <ul uk-accordion='multiple: true'>
        <li>
          <a className='uk-accordion-title'>{dailyNotices.notices[0].title}</a>
          <div className='uk-accordion-content'>
            <a className='uk-icon-link uk-float-right' uk-icon='icon: more-vertical; ratio: 0.75'></a>
            <p>{dailyNotices.notices[0].content}</p>
          </div>
        </li>
      </ul>
    </td>
  </tr>
)}

*/
