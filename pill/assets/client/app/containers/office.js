// office.js
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as officeActions from '../actions/office'


export class OfficeContainer extends Component {

  _errors = () => {
    if (this.props['error']) {
      return (
        <div>errors {this.props['error']}</div>
      )
    }
    return ''
  }

  render() {
    return (
      <div>
        <h1>Office</h1>
        {this._errors()}
        <form method="post">
            <div>username: <input type="text" name="username" /></div>
            <div>password: <input type="password" name="password" /></div>
            <div style={{
              textAlign : 'right',
              width:'200px',
              marginTop:'10px'}}>
              <input style={{ width: '100%'}} type="submit" value="Login" />
            </div>
        </form>
      </div>
    )
  }
}

// map global state to component properties
function mapStateToProps(state) {
  return {
    state: {}
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...officeActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OfficeContainer)

