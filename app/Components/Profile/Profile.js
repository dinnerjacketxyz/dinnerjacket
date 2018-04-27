import React, { Component } from 'react'
const css = require('./Profile.css')

let userInfo = ''
let yearList = []
let part = {}

let profileContent
let detailsTab
let partTab

let content

// part is participation innit too long innit

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, content: 'details' }
  }

  componentDidMount() {
    content = this.state.content
    profileContent = document.getElementById('profileContent')
    detailsTab = document.getElementById('detailsTab')
    partTab = document.getElementById('partTab')

    let apiPart = window.participation
    userInfo = window.userInfo
    yearList = []
    part = {}

    for (let i = 0; i < apiPart.length; i++) {
      if (!(apiPart[i].year in part)) {
        part[apiPart[i].year] = {
          event: []
        }
        yearList.push({ year: apiPart[i].year })
      }

      part[apiPart[i].year].event.push({
        activity: apiPart[i].activity,
        category: apiPart[i].categoryName,
        points: apiPart[i].points
      })
    }

    let loading = this.state.loading
    this.setState({ loading: true })
  }

  render() {
    let rows = yearList.map(year => {
      return <YearList key={year} years={year} />
    })

    let content
    if (this.state.content === 'details') {
      content = DETAILS()
    } else if (this.state.content === 'part') {
      content = PARTICIPATION(rows)
    }

    return (
      <div className='profileParent'>
        <div className='profileChild uk-animation-slide-top-small'>
          <span className='profileParent' uk-icon='icon: user; ratio:2'></span>
          <h2 className='uk-text-center'>{userInfo.givenName+' '+userInfo.surname}</h2>
          <p className='uk-text-center'>{userInfo.role+' | '+userInfo.department+' | '+userInfo.office}</p>
          <ul className='uk-margin-top uk-margin-bottom uk-flex-center' uk-tab='true'>
              <li id='detailsTab' className='uk-active' onClick={() => {this.setState({ content: 'details' })}}><a>Details</a></li>
              <li id='partTab' onClick={() => {this.setState({ content: 'part' })}}><a>Participation</a></li>
          </ul>
          <div id='profileContent'>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

const YearList = (props) => {
  let rows = part[String(props.years.year)].event.map(event => {
    return <TableRow key={event.activity} part={event} />
  })

  return (
    <li>
      <p className='uk-accordion-title'>{props.years.year}</p>
      <div className='uk-accordion-content'>
        <table className='uk-table uk-table-small uk-table-hover uk-table-striped'>
          <thead>
            <tr>
              <th className=''>Category</th>
              <th className=''>Activity</th>
              <th className='uk-table-shrink'>Points</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </li>
  )
}

const TableRow = (props) => {
  return (
    <tr>
      <td>{props.part.category}</td>
      <td>{props.part.activity}</td>
      <td>{props.part.points}</td>
    </tr>
  )
}

const DETAILS = () => {
  return (
    <table className='uk-table uk-table-small'>
      <tbody>
        <tr>
            <td>Email</td>
            <td>{userInfo.email}</td>
        </tr>
        <tr>
            <td></td>
            <td>{userInfo.emailAliases}</td>
        </tr>
        <tr>
            <td></td>
            <td>{userInfo.decEmail}</td>
        </tr>
        <tr>
            <td>Groups</td>
            <td>{userInfo.groups}</td>
        </tr>
      </tbody>
    </table>
  )
}

const PARTICIPATION = (rows) => {
  return (
    <ul uk-accordion='multiple: true'>
      {rows}
    </ul>
  )
}

export default Profile