'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../actions/post'

import { PostsList } from '../components/posts'

export class HomeContainer extends Component {
  render() {
    return (
      <div>
        <h1>Phil's Site</h1>
        Homie!
      </div>
    )
  }
}

// map global state to component properties
function mapStateToProps(state) {
  return { state: state }
}

// map actions to component properties and connect to dispatch
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...postActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)


