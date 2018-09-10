import React, { Component } from 'react'
const css = require('./About.css')

class About extends Component {
  render() {
    return (
      <div id='about' className='hCenterOnlyContainer'>
        <div className='hCenterOnlyCard card uk-animation-slide-top-small'>
          <img id='aboutLogo'
            className='uk-disabled'
            alt='logo' src='./icons/256.png'>
          </img>
          <h1 className=''>DinnerJacket</h1>
          <p id='welcomeLabel'>v2.0.0</p>
          <p className='uk-text-small'>licensed under GNU GPL v3</p>

          <hr/>
          
          <p>DinnerJacket is a website developed by SBHS students.</p>
          
          <hr/>

          <h2 className='uk-h2'>Developers</h2>
          <p>George Flabouris</p>
          <p>Brian Nguyen</p>
          <p className='uk-margin-bottom-small'>Vincent Liu</p>
          
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
