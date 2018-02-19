import React, { Component } from 'react'
const data = require('../../../server/data.js')

class Timetable extends Component {
  constructor(props) {
    super(props)
    console.log(data.daytimetable)
  }
  
  render() {
    return (
      <div className='uk-flex-center uk-flex'> 
        <div className='uk-card uk-card-default uk-card-body uk-card-large'>
          <ul className='uk-subnav uk-subnav-pill uk-flex-center uk-text-large' uk-switcher='animation: uk-animation-fade'>
            <li>
              <a href='#'>A</a>
            </li>
            <li>
              <a href='#'>B</a>
            </li>
            <li>
              <a href='#'>C</a>
            </li>
          </ul>

          <ul className='uk-switcher uk-margin'>
            <li>
              <div className='uk-column-1-5 uk-text-center uk-text-muted'>
                <p>MON A</p>
                <p>TUE A</p>
                <p>WED A</p>
                <p>THU A</p>
                <p>FRI A</p>
              </div>

              <div className='uk-column-1-5 uk-column-divider uk-width-auto'>
                <p>1: &emsp; ENG &emsp; &emsp; 201</p>
                <p>2: &emsp; MAT &emsp; &emsp; 101</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp;</p>

                <p>1: &emsp; MAT &emsp; &emsp; 101</p>
                <p>2: &emsp; </p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp; ENG &emsp; &emsp; 201</p>

                <p>1: &emsp; ENG &emsp; &emsp; 201</p>
                <p>2: &emsp; MAT &emsp; &emsp; 101</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; </p>
                <p>5: &emsp; </p>

                <p>1: &emsp; MAT &emsp; &emsp; 101</p>
                <p>2: &emsp; ENG &emsp; &emsp; 201</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; ENG &emsp; &emsp; 201</p>
                <p>5: &emsp;</p>

                <p>1: &emsp; </p>
                <p>2: &emsp; ENG &emsp; &emsp; 201</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp; MAT &emsp; &emsp; 101</p>
              </div>
            </li>

            <li>
              <div className='uk-column-1-5 uk-text-center uk-text-muted'>
                  <p>MON B</p>
                  <p>TUE B</p>
                  <p>WED B</p>
                  <p>THU B</p>
                  <p>FRI B</p>
              </div>

              <div className='uk-column-1-5 uk-column-divider uk-width-auto'>
                <p>1: &emsp; ENG &emsp; &emsp; 201</p>
                <p>2: &emsp; MAT &emsp; &emsp; 101</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp;</p>

                <p>1: &emsp; MAT &emsp; &emsp; 101</p>
                <p>2: &emsp; </p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp; ENG &emsp; &emsp; 201</p>

                <p>1: &emsp; ENG &emsp; &emsp; 201</p>
                <p>2: &emsp; MAT &emsp; &emsp; 101</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; </p>
                <p>5: &emsp; </p>

                <p>1: &emsp; MAT &emsp; &emsp; 101</p>
                <p>2: &emsp; ENG &emsp; &emsp; 201</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; ENG &emsp; &emsp; 201</p>
                <p>5: &emsp;</p>

                <p>1: &emsp; </p>
                <p>2: &emsp; ENG &emsp; &emsp; 201</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp; MAT &emsp; &emsp; 101</p>
              </div>
            </li>

            <li>
              <div className='uk-column-1-5 uk-text-center uk-text-muted'>
                <p>MON C</p>
                <p>TUE C</p>
                <p>WED C</p>
                <p>THU C</p>
                <p>FRI C</p>
              </div>

              <div className='uk-column-1-5 uk-column-divider uk-width-auto'>
                <p>1: &emsp; ENG &emsp; &emsp; 201</p>
                <p>2: &emsp; MAT &emsp; &emsp; 101</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp;</p>

                <p>1: &emsp; MAT &emsp; &emsp; 101</p>
                <p>2: &emsp; </p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp; ENG &emsp; &emsp; 201</p>

                <p>1: &emsp; ENG &emsp; &emsp; 201</p>
                <p>2: &emsp; MAT &emsp; &emsp; 101</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; </p>
                <p>5: &emsp; </p>

                <p>1: &emsp; MAT &emsp; &emsp; 101</p>
                <p>2: &emsp; ENG &emsp; &emsp; 201</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; ENG &emsp; &emsp; 201</p>
                <p>5: &emsp;</p>

                <p>1: &emsp; </p>
                <p>2: &emsp; ENG &emsp; &emsp; 201</p>
                <p>3: &emsp; ENG &emsp; &emsp; 201</p>
                <p>4: &emsp; MAT &emsp; &emsp; 101</p>
                <p>5: &emsp; MAT &emsp; &emsp; 101</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Timetable