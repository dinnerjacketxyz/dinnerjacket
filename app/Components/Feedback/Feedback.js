import React, { Component } from 'react'

class Feedback extends Component {
  render() {
    return (
      <div className='uk-flex uk-flex-center uk-margin-left uk-margin-right'>
        <div className='uk-card uk-card-default uk-card-body uk-width-2-5@l uk-width-1-2@m uk-width-4-5@s'>
          <h2 className='uk-text-center'>Send us some feedback!</h2>
          <p className='uk-text-center'>Found a bug? Have an idea? Fill out the form below and we'll take a look!</p>
          <div className='uk-flex uk-flex-center uk-margin-top uk-margin-bottom'>
            <div className='uk-grid uk-grid-small uk-grid-divider' uk-grid>
              <div className='uk-first-column'>
                <a uk-icon='icon: plus'></a>
                <a uk-icon='icon: copy'></a>
                <a uk-icon='icon: trash'></a>
              </div>
              <div>
                <select className='uk-select uk-form-small uk-form-width-small'>
                  <option>Arial</option>
                  <option>Comic Sans MS</option>
                  <option>Calibri</option>
                  <option>Cambria</option>
                  <option>Courier</option>
                  <option>Impact</option>
                  <option>Roboto</option>
                  <option>Source Sans</option>
                  <option>Times New Roman</option>
                </select>
              </div>
              <div>
                <select className='uk-select uk-form-small uk-form-width-xsmall'>
                  <option>8</option>
                  <option>10</option>
                  <option>12</option>
                  <option>14</option>
                  <option>18</option>
                  <option>24</option>
                  <option>36</option>
                </select>
              </div>
              <div>
                <a uk-icon='icon: bold'></a>
                <a uk-icon='icon: italic'></a>
                <a uk-icon='icon: strikethrough'></a>
              </div>
            </div>
          </div>
          <div className='uk-margin'>
            <input className='uk-input uk-form-blank uk-form-large' type='Title' placeholder='Title'/>
          </div>
          <div className='uk-margin'>
            <textarea className='uk-textarea uk-form-blank' rows='5' placeholder='Body'></textarea>
          </div>
          <h3></h3>
          <button className='uk-button uk-button-primary'>Submit</button>
        </div>
      </div>

    )
  }
}

export default Feedback