import React, { Component } from 'react'
const css = require('./About')

class About extends Component {
  render() {
    return (
      <div className='uk-flex uk-flex-center uk-text-center uk-margin-top uk-margin-left uk-margin-right'>
        <div className='uk-card uk-card-default uk-card-body uk-card large uk-width-1-3@xl uk-width-2-5@m uk-width-3-5@s'>
          <img id='logo'
            className='uk-disabled'
            alt='logo' src='https://i.imgur.com/xxuf1ni.png' width='75px' height='75px'>
          </img>
          <br/>
          <br/>
          <span className='uk-text-center uk-h1'>DinnerJacket</span>
          <br/>
          <span className='uk-text-small'>beta v0.1.0</span>
          <br/>
          <span className='uk-text-small'>licensed under GNU GPL v3</span>

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
            <span clasName='uk-article-meta'>
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
