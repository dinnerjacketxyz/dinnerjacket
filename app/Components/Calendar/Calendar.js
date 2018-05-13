import React, { Component } from 'react'
const css = require('./Calendar.css')
const http = require('http')

let input = ''

class Calendar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      eventsToShow: [],
      selectedDay: (new Date()).getDay(),
      selectedMonth: (new Date()).getMonth(),
      selectedYear: (new Date()).getFullYear(),
      daysHTML: this.setDaysForMonth((new Date()).getMonth())
    }
    this.setDaysForMonth = this.setDaysForMonth.bind(this)
    this.setEvents = this.setEvents.bind(this)
  }
  componentDidMount() {
    let content = document.getElementById('content')
    content.className = 'full vcNavbarParent'
    this.state.selectedMonth = (new Date()).getMonth()
  }
 
  componentWillUnmount() {
    let content = document.getElementById('content')
    content.className = 'full'
  }

  //this sub must process your click input - careful sometimes you can click on the ul element - the onclick returns the innerHTML of child nodes, but it can return any DOM property
  monthInput(e) {
    input = e.target.innerHTML
  }

  //this sub is simultaneously fired and can do your processing - good luck
  displayCal() {
    if (!isNaN(input)) {
      console.log('Events for this day')
      console.log(window.diaryCal[input-1])
      this.setEvents(window.diaryCal[input-1])
    }
  }
  
  // events is a JSON of { info: {}, items: {} }
  // TO DO: add support for varying numbers of events
  setEvents(events) {
    var eventsToAdd = []
    const items = events['items']
    console.log('events items')
    console.log(events['items'])
    var i
    for (i=0; i<items.length; i++) {
      const thisEvent = items[i]
      switch (thisEvent['type']) {
        case 'school':     eventsToAdd.push(thisEvent['title']); break
        case 'assessment': eventsToAdd.push(thisEvent['assessment']); break
        case 'moodle':     eventsToAdd.push(thisEvent['title']); break
        case 'personal':   eventsToAdd.push(thisEvent['title']); break
        default: console.log('not found'); break
      }
    }
    console.log(eventsToAdd)
    this.setState( ()=> ({
      eventsToShow: eventsToAdd
    }))
  }
  
  getCalendarForMonth(monthIndex, year) {
  
    const month = monthIndex + 1

    var from = year + '-' + (month > 9 ? month : '0' + month) + '-01'
    var to = year + '-' + (month > 9 ? month : '0' + month) + '-' + (new Date(year, month, 0).getDate())
    
    // Authenticated calendar
    let promise1 = new Promise( function (resolve, reject) {
      http.get('/getdata?url=diarycalendar/events.json?from=' + from + '&to=' + to, (res) => {
        res.setEncoding('utf8')
        let d = ''
        res.on('data', (body) => {
          d += body
        })
        res.on('end', () => {
         resolve(d)
        })
      })
    })
    
    promise1.then( (result) => {
      console.log(result)
    })
    
    /*
    // Public calendar
    let promise2 = new Promise( function (resolve, reject) {
      http.get('/getdata?url=calendar/terms.json?from=' + from + '&to=' + to, (res) => {
        res.setEncoding('utf8')
        let d = ''
        res.on('data', (body) => {
          d += body
        })
        res.on('end', () => {
          resolve(d)
        })
      })
    })
  
    Promise.all([promise1, promise2]).then( (values) => {
      console.log(values[0])
      console.log(values[1])
    })
    */
  }
  
  prevMonth() {
    var curMonth = this.state.selectedMonth
    var curYear = this.state.selectedYear
    if (curMonth == 0) {
      curMonth = 11
      curYear -= 1
    } else {
      curMonth -= 1
    }
    
    this.setState( ()=> ({
      selectedMonth: curMonth,
      selectedYear: curYear,
      daysHTML: this.setDaysForMonth(curMonth)
    }))

    this.getCalendarForMonth(curMonth, curYear)
  }

  nextMonth() {
    var curMonth = this.state.selectedMonth
    var curYear = this.state.selectedYear
    if (curMonth == 11) {
      curMonth = 0
      curYear += 1
    } else {
      curMonth += 1
    }
    
    this.setState( ()=> ({
      selectedMonth: curMonth,
      selectedYear: curYear,
      daysHTML: this.setDaysForMonth(curMonth)
    }))
    
    this.getCalendarForMonth(curMonth, curYear)
  }
  
  monthNumToText(num) {
    const arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return arr[num]
  }
  
  setDaysForMonth(curMonth) {

    switch (curMonth + 1) {
      // 28/29 days
      case 2: if ((new Date()).getFullYear % 4 == 0) {
                  return (<ul className="days" onClick={this.monthInput}>
                          <li><span className="active">1</span></li>
                          <li>2</li>
                          <li>3</li>
                          <li>4</li>
                          <li>5</li>
                          <li>6</li>
                          <li>7</li>
                          <li>8</li>
                          <li>9</li>
                          <li>10</li>
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
                          </ul>)
                } else {
                  return (<ul className="days" onClick={this.monthInput}>
                          <li><span className="active">1</span></li>
                          <li>2</li>
                          <li>3</li>
                          <li>4</li>
                          <li>5</li>
                          <li>6</li>
                          <li>7</li>
                          <li>8</li>
                          <li>9</li>
                          <li>10</li>
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
                          <li>29</li>
                          </ul>)
              }
      // 30 days
      case 4:
      case 6:
      case 9:
      case 11: return (<ul className="days" onClick={this.monthInput}>
                        <li><span className="active">1</span></li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
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
                      </ul>)
      
      // 31 days
      default: return (<ul className="days" onClick={this.monthInput}>
                        <li><span className="active">1</span></li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
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
                      </ul>)
    }
  }
  
  render() {
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
        <div className="uk-grid-collapse uk-child-width-expand@s uk-grid two uk-margin-top" uk-grid='true'>
          <div className='uk-card uk-card-default uk-animation-slide-top-small'>
            <div className="month">      
              <ul>
                <li onClick={this.prevMonth.bind(this)} className="prev">&#10094;</li>
                <li onClick={this.nextMonth.bind(this)} className="next">&#10095;</li>
                <li>
                  {this.monthNumToText(this.state.selectedMonth)}<br/>
                  <span>{this.state.selectedYear}</span>
                </li>
              </ul>
            </div>
            <ul className="weekdays">
              <li>M</li>
              <li>Tu</li>
              <li>W</li>
              <li>Th</li>
              <li>F</li>
              <li>Sa</li>
              <li>Su</li>
            </ul>
            <div onClick={this.displayCal.bind(this)}>
              {this.state.daysHTML}
            </div>
          </div>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <p className='uk-text-center uk-text-large'>Calendar Events</p>
            <ul className="uk-list uk-list-striped">
                <li>{this.state.eventsToShow[0]}</li>
                <li>{this.state.eventsToShow[1]}</li>
                <li>{this.state.eventsToShow[2]}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar
