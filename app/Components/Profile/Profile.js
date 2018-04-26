import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return (
      <div>
        <div className='uk-flex uk-flex-center'>
          <div className='uk-card uk-card-default uk-card-body uk-text-center uk-margin-left uk-margin-right uk-width-1-2@l uk-width-2-3@m uk-width-4-5@s'>
            <span uk-icon='icon: user; ratio:2'></span>
            <p className='uk-card-title'>Profile</p>
            <hr></hr>
            <form className='uk-form-horizontal uk-margin-large'>
                <div className='uk-margin'>
                    <label className='uk-form-label' for='form-horizontal-text'>Text</label>
                    <div className='uk-form-controls'>
                        <input className='uk-input' type='text' placeholder='Some text...' />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label' for='form-horizontal-select'>Select</label>
                    <div className='uk-form-controls'>
                        <select className='uk-select'>
                            <option>Option 01</option>
                            <option>Option 02</option>
                        </select>
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label' for='form-horizontal-text'>Slider</label>
                    <div className='uk-form-controls'>
                        <input className='uk-range' type='range' value='2' min='0' max='10' step='0.1' />
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label' for='form-horizontal-text'>Toggle</label>
                    <div className='uk-form-controls'>
                      <div className='ui toggle checkbox'>
                        <input type='checkbox' name='public' />
                        <label></label>
                      </div>
                    </div>
                </div>
                <div className='uk-margin'>
                    <label className='uk-form-label' for='form-horizontal-text'>Parent Access</label>
                    <div className='uk-form-controls'>
                      <button className='uk-button-small uk-button-primary' href='#modal-access' uk-toggle>Generate access code</button>
                      <button className='uk-button-small uk-button-default'>Cancel access</button>
                    </div>
                </div>
            </form>
          </div>
        </div>
        <div id='modal-access' className='uk-flex-top' uk-modal>
            <div className='uk-modal-dialog uk-modal-body uk-margin-auto-vertical' uk-inline>
                <button className='uk-modal-close-default' type='button' uk-close></button>
                <h1><span uk-icon='icon: check; ratio: 1.5'></span> Your access code has been generated</h1>
                <h4 className='uk-text-center'>Your access code is: <code className='uk-heading-primary uk-text-middle uk-text-center'>1234</code></h4>
                <p>Create a parent account and use this code to verify it. If the parent account already has been registered, use the 'Add account' section of the parent account to register multiple students.</p>
            </div>
        </div>
      </div>
    )
  }
}

export default Profile