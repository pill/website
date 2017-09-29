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
        <p>
        I'm going to put things here that I like; hobbies,<br/>
        work, dabblings. Maybe a blog? Not sure yet!
        </p>
        <p>
        Mostly it's just an online presence where I can <br/>
        put myself out there for anyone interested.
        </p>
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


