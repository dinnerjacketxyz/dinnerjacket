import React, { Component } from 'react'

class ContextMenu extends Component {
  constructor(props) {
    super(props)
  }

  render(props) {
    return (
      <div id='contextMenu' className='contextMenu card' style={{visibility: 'hidden', minHeight: '50px',minWidth:'50px',position:'absolute',zIndex:1000}}>
        <ul className='uk-list'>
          <li onClick={this.rename.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='pencil'/>{}</li>
          <li onClick={this.clearContents.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='ban'/>Clear</li>
          <li onClick={this.removeNote.bind(this)}><span className='uk-margin-right uk-icon' uk-icon='trash'/>Remove</li>
        </ul>
      </div>
    )
  }
}