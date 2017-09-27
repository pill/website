'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../actions/post'
import * as loginActions from '../actions/login'
import { Office } from '../components/office'

// map global state to component properties
// that the component may be interested in
function mapStateToProps(state) {
  return {
    state: {
        user: state.user,
        app: state.app,
        post: state.post
    }
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...postActions, ...loginActions}, dispatch)
  }
}

const OfficeContainer = connect(mapStateToProps, mapDispatchToProps)(Office)
export default OfficeContainer

