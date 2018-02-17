import React, { Component } from 'react'

class Dashboard extends Component {
  render() {
    return (
      <div class="uk-flex uk-flex-center uk-text-center uk-margin-left uk-margin-right">
        <div class="uk-card uk-card-default uk-card-body uk-card small uk-width-1-3">
          <span class="uk-sortable-handle uk-float-left" uk-icon="icon: table"></span>
          <p class="uk-text-large" style="margin-top: 10px;margin-bottom: 10px;">Roll Call in</p>
          <h1 class='uk-text-center uk-heading-primary style="margin-top: 10px;margin-bottom: 30px;'>
            10:00:00
          </h1>
          <div class="uk-flex uk-flex-center">
            <table class="uk-table uk-table-hover uk-table-small uk-width-4-5@l">
              <tbody>
                <tr>
                  <td class="uk-text-lead uk-text-left">
                    English
                    <dd class="uk-text-meta uk-text-muted uk-text-top uk-text-left">
                      at 09:05 with Ms English
                    </dd>
                  </td>
                  <td class="uk-text-middle uk-table-shrink uk-text-lead">201</td>
                </tr>
                <tr>
                  <td class="uk-text-lead uk-text-left uk-text-muted">
                    <small>Study Period</small>
                    <dd class="uk-text-meta uk-text-muted uk-text-top uk-text-left">

                    </dd>
                  </td>
                  <td class="uk-text-middle uk-table-shrink uk-text-lead uk-text-muted">10:10</td>
                </tr>
                <tr>
                  <td class="uk-text-lead uk-text-left uk-text-muted">
                    <small>Lunch</small>
                    <dd class="uk-text-meta uk-text-muted uk-text-top uk-text-left">

                    </dd>
                  </td>
                  <td class="uk-text-middle uk-table-shrink uk-text-lead uk-text-muted">11:10</td>
                </tr>
                <tr>
                  <td class="uk-text-lead uk-text-left">
                    Maths
                    <dd class="uk-text-meta uk-text-muted uk-text-top uk-text-left">
                      at 11:50 with Ms Maths
                    </dd>
                  </td>
                  <td class="uk-text-middle uk-table-shrink uk-text-lead">101</td>
                </tr>
                <tr>
                  <td class="uk-text-lead uk-text-left">
                    English
                    <dd class="uk-text-meta uk-text-muted uk-text-top uk-text-left">
                      at 12:55 with Ms English
                    </dd>
                  </td>
                  <td class="uk-text-middle uk-table-shrink uk-text-lead">202</td>
                </tr>
                <tr>
                  <td class="uk-text-lead uk-text-left uk-text-muted">
                    <small>Recess</small>
                    <dd class="uk-text-meta uk-text-muted uk-text-top uk-text-left">

                    </dd>
                  </td>
                  <td class="uk-text-middle uk-table-shrink uk-text-lead uk-text-muted">13:55</td>
                </tr>
                <tr>
                  <td class="uk-text-lead uk-text-left">
                    Maths
                    <dd class="uk-text-meta uk-text-muted uk-text-top uk-text-left">
                      at 14:15 with Ms English
                    </dd>
                  </td>
                  <td class="uk-text-middle uk-table-shrink uk-text-lead">101</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard