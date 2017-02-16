// office.js
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../actions/home'

import { PostsList } from '../components/posts'

export class HomeContainer extends Component {
  render() {
    return (
      <div>
        <h1>Phil's Site</h1>
        <h2>Technologies so far</h2>
        <ul>
            <li>Flask</li>
            <li>MongoDB</li>
            <li>React.js</li>
        </ul>
        <PostsList></PostsList>
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
    actions: bindActionCreators({...homeActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

