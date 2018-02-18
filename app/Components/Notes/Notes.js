import React, { Component } from 'react'

class Notes extends Component {
  render() {
    return (
      <div className='uk-flex uk-flex-center'>
        <div className='uk-text-center uk-margin-left uk-margin-right uk-grid-collapse uk-width-3-5@xl ' uk-grid uk-sortable = 'handle: .uk-sortable-handle' uk-height-match='target: > div > .uk-card'>

          <div className='uk-width-1-5@m uk-height-large@m'>
            <div className='uk-card uk-card-default uk-card-body'>
              <span class='uk-sortable-handle uk-float-left' uk-icon='icon: table'></span>
              <a href='' class='uk-icon-link uk-float-right' uk-icon='icon: plus-circle'></a>
              <h2></h2>
              <div class='uk-overflow-auto'>
                <table class='uk-table uk-table-small uk-table-hover'>
                  <tbody>
                    <tr>
                      <td>
                        Lorem ipsum
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Lorem ipsum
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Lorem ipsum
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className='uk-width-expand'>
            <div className='uk-card uk-card-default uk-card-body'>
              <span className='uk-sortable-handle uk-float-left' uk-icon='icon: table'></span>
              <div className='uk-flex uk-flex-center'>
                <div className='uk-grid-divider uk-grid-small' uk-grid>

                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default Notes
