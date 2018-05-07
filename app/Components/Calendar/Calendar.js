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
      <div className='flex-container uk-width-1-1'>
        <div className="uk-grid-collapse uk-child-width-expand@s uk-grid two uk-margin-top" uk-grid='true'>
          <div className='uk-card uk-card-default uk-animation-slide-top-small'>
            <div className="month">      
              <ul>
                <li className="prev">&#10094;</li>
                <li className="next">&#10095;</li>
                <li>
                  August<br/>
                  <span>2017</span>
                </li>
              </ul>
            </div>
            <ul className="weekdays">
              <li>Mo</li>
              <li>Tu</li>
              <li>We</li>
              <li>Th</li>
              <li>Fr</li>
              <li>Sa</li>
              <li>Su</li>
            </ul>
            <ul className="days">  
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li><span className="active">10</span></li>
              <li>11</li>
              <li>12</li>
              <li>13</li>
              <li>14</li>
              <li>15</li>
              <li>16</li>
              <li>17</li>
              <li>18</li>
              <li>19</li>
              <li>20</li>
              <li>21</li>
              <li>22</li>
              <li>23</li>
              <li>24</li>
              <li>25</li>
              <li>26</li>
              <li>27</li>
              <li>28</li>
              <li>29</li>
              <li>30</li>
              <li>31</li>
            </ul>
          </div>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <p className='uk-text-center uk-text-large'>Calendar Events</p>
            <ul className="uk-list uk-list-striped">
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
            </ul>
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