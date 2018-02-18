import React, { Component } from 'react'

class About extends Component {
  render() {
    return (
      <div className='uk-flex uk-flex-center uk-text-center uk-margin-left uk-margin-right'>
        <div className='uk-card uk-card-default uk-card-body uk-card large uk-width-2-5@xl uk-width-3-5@m uk-width-4-5@s'>
          <h1 className='uk-text-center uk-heading-secondary'>Dinner Jacket</h1>
          <p className='uk-text-medium'>beta 1</p>
          <img id='logo'
            className='uk-disabled uk-margin-small-left uk-margin-small-right uk-margin-small-top uk-margin-small-bottom'
            alt='logo' src='https://i.imgur.com/xxuf1ni.png' width='300px' height='250px'>
          </img>
          <p className='uk-text-large'>"he arrived all spiffed up in a dinner jacket"</p>

          <p className='uk-text-medium'>Developed By</p>
          <a className='uk-text-small'>Gregaly By Birth</a>
          <br />
          <a className='uk-text-small'>Stinky Ands Spen</a>
          <br />
          <a className='uk-text-small'>PHIL</a>

        </div>
      </div>
    )
  }
}

export default About
