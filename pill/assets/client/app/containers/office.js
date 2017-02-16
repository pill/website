// office.js
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as officeActions from '../actions/office'


export class OfficeContainer extends Component {
  render() {
    return (
      <div>Office</div>
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

