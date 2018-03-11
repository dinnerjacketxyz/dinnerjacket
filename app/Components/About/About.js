import React, { Component } from 'react'
const css = require('./About')

class About extends Component {
  render() {
    return (
      <div className='uk-flex uk-flex-center uk-text-center uk-margin-top'>
        <div className='uk-card uk-card-default uk-card-body uk-card-large uk-width-xlarge uk-animation-slide-top-small uk-margin-large-bottom'>
          <img id='logo'
            className='uk-disabled'
            alt='logo' src='256.png' width='150px' height='150px'>
          </img>
          <h1 className='uk-text-center uk-h1'>DinnerJacket</h1>
          <p className='uk-label uk-label-danger'>alpha v0.1.0</p>
          <p className='uk-text-small'>licensed under GNU GPL v3</p>

          <hr/>
            <p className=''>DinnerJacket is a website developed by SBHS students.</p>
          <hr/>

          <h2 className='uk-h2'>Developers</h2>
          <p>George Flabouris</p>
          <p>Brian Nguyen</p>
          <p>Vincent Liu</p>

          <hr/>

          <article className='uk-article' >
            <h2 className='uk-h2 small-margin'>spiff</h2>
            <p className='uk-article-meta'>/spɪf/</p>
            <span className='uk-article-meta'>
              <i>verb </i>
              <span className="uk-label"><i>N. AMER.</i></span>
              <i> informal</i>
            </span>
            <br/>
            <p>make someone or something attractive, smart, or stylish.</p>
            <h4 className='uk-h4'>"he arrived all spiffed up in a dinner jacket"</h4>
          </article>
        </div>
      </div>
    )
  }
}

export default About
