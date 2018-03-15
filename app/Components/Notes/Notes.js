import React, { Component } from 'react'

// TODO reset database ID and all that innit
// otherwise we getting haced innit

let quill

let database = firebase.database()
//let ref = database.ref('userNotes')
let ref

let encryted
let decrypted

let dbNotes

let userID

let encryptionSalt = 'ABCDE'

let firstSync = true
//let ref = new Firebase('1')

class Notes extends Component {
  componentDidMount() {
    userID = window.userData.username
    ref = database.ref('userNotes/' + userID)

    quill = new Quill('#editor', {
      modules: {
        toolbar: true
      },
      theme: 'bubble'
    })

    ref.once('value', (data) => {
      console.log(data.val())
      quill.setContents(data.val())
    })
  }

  componentWillUnmount() {
    this.updateDB()
  }

  updateDB() {
    if (!firstSync) {
      let data = {
        content: quill.getContents()
      }

      ref.update(data)
    }
    firstSync = false
  }

  retrieveFromDB() {
    ref.once('value', (data) => {
      console.log(data.val())
    })
  }

  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-margin-top uk-grid-collapse uk-width-xxlarge miniFill'>
          <div className='uk-card uk-card-default uk-card-body uk-animation-slide-top-small'>
            <div className='uk-margin'>
              <div id='editor' onInput={this.updateDB.bind(this)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Notes
