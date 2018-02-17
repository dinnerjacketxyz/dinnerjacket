import React, { Component } from 'react'

class Timetable extends Component {
  render() {
    return (
      <div className='uk-flex-center uk-flex'> 
        <div className='uk-card uk-card-default uk-card-body uk-card-large'>
          <a className='uk-icon-link uk-float-right' uk-icon='icon: plus-circle' />
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
                <p>MON</p>
                <p>TUE</p>
                <p>WED</p>
                <p>THU</p>
                <p>FRI</p>
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
                  <p>MON</p>
                  <p>TUE</p>
                  <p>WED</p>
                  <p>THU</p>
                  <p>FRI</p>
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
                <p>MON</p>
                <p>TUE</p>
                <p>WED</p>
                <p>THU</p>
                <p>FRI</p>
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