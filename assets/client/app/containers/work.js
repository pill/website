'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


export class WorkContainer extends Component {
  render() {
    const { state, actions } = this.props
    return (
      <div>
        <h1>Phil's Work</h1>
        <em>coming soon!</em>
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
    actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkContainer)


