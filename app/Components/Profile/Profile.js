import React, { Component } from 'react'

class Profile extends Component {
  render() {
    return (
      <div>
        <div className="uk-flex uk-flex-center">
          <div className="uk-card uk-card-default uk-card-body uk-text-center uk-margin-left uk-margin-right">
            <span uk-icon="icon: user; ratio:2"></span>
            <p className="uk-card-title">Profile</p>
            <hr/>
            <div className="uk-margin">
                <label className="uk-form-label">Parent Access</label>
                <div className="uk-form-controls">
                  <button className="uk-button-small uk-button-primary">Generate access code</button>
                  <button className="uk-button-small uk-button-default">Cancel access</button>
                </div>
            </div>
          </div>
        </div>
        <div id="modal-access" className="uk-flex-top" uk-modal = 'true'>
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-inline">
              <button className="uk-modal-close-default" type="button" uk-close='true'></button>
              <h1><span uk-icon='icon: check; ratio: 1.5'></span> Your access code has been generated</h1>
              <h4 className="uk-text-center">Your access code is: <code className="uk-heading-primary uk-text-middle uk-text-center">1234</code></h4>
              <p>Create a parent account and use this code to verify it. If the parent account already has been registered, use the "Add account" section of the parent account to register multiple students.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile