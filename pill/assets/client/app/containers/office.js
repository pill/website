// office.js
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as officeActions from '../actions/office'
import * as loginActions from '../actions/login'

import { Office } from '../components/office'

// map global state to component properties
function mapStateToProps(state) {
  return {
    state: {}
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...officeActions, ...loginActions}, dispatch)
  }
}

const OfficeContainer = connect(mapStateToProps, mapDispatchToProps)(Office)
export default OfficeContainer

