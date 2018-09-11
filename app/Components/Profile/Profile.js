import React, { Component } from 'react'
const css = require('./Profile.css')

let userData = ''
let yearList = []
let part = {}

let profileContent
let detailsTab
let partTab
let content

let apiPart

let id = 0

/**
 * Profile tab displays users profile information
 * For student access level, award scheme participation is also shown
 */
class Profile extends Component {
  /**
   * Called on component load
   * @param {*} props - including participation and userData
   */
  constructor(props) {
    super(props)
    this.state = { loading: true, content: 'details' }

    apiPart = props.participation
    userData = props.userData
  }

  /**
   * Called upon the component unmounting and changes UI prior to unmounting
   */
  componentWillUnmount(){
    let content = document.getElementById('content')
    content.className = 'full'
  }

  /**
   * Called upon the component mounting
   * Linear search through API participation return to sort into more useable record
   */
  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
    content = this.state.content
    profileContent = document.getElementById('profileContent')
    detailsTab = document.getElementById('detailsTab')
    partTab = document.getElementById('partTab')

    yearList = []
    part = {} // where part is shorthand for participation

    for (let i = 0; i < apiPart.length; i++) {
      if (!(apiPart[i].year in part)) {
        part[apiPart[i].year] = {
          event: []
        }
        yearList.push({ year: apiPart[i].year })
      }

      // Pushing to custom record which is used to render participation
      part[apiPart[i].year].event.push({
        activity: apiPart[i].activity,
        category: apiPart[i].categoryName,
        points: apiPart[i].points
      })
    }

    for (let j = 0; j < yearList.length; j++) {
      let year = yearList[j].year
 
      // Set target and total points for each year by adding up event totals
      let eventOne = part[year].event[0].points
      yearList[j].target = ' | Target: '
      if (eventOne == 0) {
        part[year].event.shift()
      }
      yearList[j].target += part[year].event.shift().points
      
      yearList[j].total = ', Total: ' + part[year].event.pop().points
    }

    // Set loading state once all data has been handled
    let loading = this.state.loading
    this.setState({ loading: false })
  }

  /**
   * Render all components including user details and award scheme participation
   */
  render() {
    let rows = yearList.map(year => {
      id++
      return <YearList key={year+id} years={year} />
    })

    // Render component depending on the selected tab
    let content
    if (this.state.content === 'details') {
      content = DETAILS()
    } else if (this.state.content === 'part') {
      content = PARTICIPATION(rows)
    }

    // Only display participation option for student access level
    // (Teachers and unauthenticated access level don't get award scheme points)
    let pptOption
    if (window.userData.role === 'Student') {
      pptOption = (<li id='partTab' onClick={() => {this.setState({ content: 'part' })}}><a>Participation</a></li>)
    }

    let subtitle = userData.role
    if (window.userData.role === 'Student') {
      subtitle += ' | ' + userData.department + ' | ' + userData.office
    }

    return (
      <div className='vcNavbarCard'>
        <div className='profileParent'>
          <div className='profileChild card uk-animation-slide-top-small'>
            <span className='profileParent' uk-icon='icon: user; ratio:2'></span>
            <h2 className='uk-text-center'>{userData.givenName+' '+userData.surname}</h2>
            <p className='uk-text-center'>{subtitle}</p>
            <ul className='uk-margin-top uk-margin-bottom uk-flex-center' uk-tab='true'>
              <li id='detailsTab' className='uk-active' onClick={() => {this.setState({ content: 'details' })}}><a>Details</a></li>
              {pptOption}
            </ul>
            <div id='profileContent'>
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Renders list of years the user has participated in the award scheme program
 * @param {*} props 
 */
const YearList = (props) => {  
  let rows = part[String(props.years.year)].event.map(event => {
    return <TableRow key={event.activity} part={event} />
  })

  return (
    <li>
      <p className='uk-accordion-title'>{props.years.year+props.years.target+props.years.total}</p>
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

/**
 * Returns layout for award scheme table display
 * @param {*} props 
 */
const TableRow = (props) => {
  return (
    <tr>
      <td>{props.part.category}</td>
      <td>{props.part.activity}</td>
      <td>{props.part.points}</td>
    </tr>
  )
}

/**
 * Renders user details tab including optional NESA field
 */
const DETAILS = () => {
  let ID = (window.userData.role === 'Student') ? 'ID' : 'Username'
  let nesa = NESA()

  return (
    <table id='detailsTable' className='uk-table uk-table-small'>
      <tbody>
        <tr>
            <td className='width-small'>{ID}</td>
            <td><code>{userData.username}</code></td>
        </tr>
        {nesa}
        <tr>
            <td className='width-small'>Email</td>
            <td><code>{userData.email}</code></td>
        </tr>
        <tr>
            <td className='width-small'></td>
            <td><code>{userData.emailAliases}</code></td>
        </tr>
        <tr>
            <td className='width-small'></td>
            <td><code>{userData.decEmail}</code></td>
        </tr>
        <tr>
            <td className='width-small'>Groups</td>
            <td>{userData.groups}</td>
        </tr>
      </tbody>
    </table>
  )
}

/**
 * NESA field rendered seperately as it should only be rendered for those with a NESA number, e.g. Yr 12s
 */
const NESA = () => {
  if (window.timetable.student.BoSNumber !== '' && window.userData.role === 'Student') {
    return (
      <tr>
        <td className='width-small'>NESA</td>
        <td><code>{window.timetable.student.BoSNumber}</code></td>
      </tr>
    )
  }
}

/**
 * Renders award scheme participation element
 * @param {*} rows 
 */
const PARTICIPATION = (rows) => {
  return (
    <ul uk-accordion='multiple: true'>
      <a uk-icon='icon: info' uk-tooltip='title: Participation involves your points collected in the SBHS Award Scheme Program.' className='uk-align-right' />
      {rows}
    </ul>
  )
}

export default Profile
