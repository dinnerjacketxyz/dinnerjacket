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
    let content = document.getElementById('content')
     content.className = 'full vcNavbarParent'
  }
 
  componentWillUnmount() {
   let content = document.getElementById('content')
   content.className = 'full'
  }

  render() {
    return (
      <div className='flex-container uk-width-1-1 vcNavbarCard'>
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
              <li>M</li>
              <li>T</li>
              <li>W</li>
              <li>T</li>
              <li>F</li>
              <li>S</li>
              <li>S</li>
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

export default Calendar