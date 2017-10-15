'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as loginActions from '../actions/login'
import * as graphQLActions from '../actions/graphql'
import { Office } from '../components/office'

// map global state to component properties
// that the component may be interested in
function mapStateToProps(state) {
  return {
    state: {
        user: state.user,
        app: state.app,
        post: state.post,
        graphql: state.graphql
    }
  }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...loginActions, ...graphQLActions}, dispatch)
  }
}

const OfficeContainer = connect(mapStateToProps, mapDispatchToProps)(Office)
export default OfficeContainer

