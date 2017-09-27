'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../actions/post'
import { PostsList, Post } from '../components/posts'

export class BlogContainer extends Component {
  render() {
    const { state, actions } = this.props
    const res = []
    switch(this.props.subsection) {
      case 'single_post_view':
        res.push(<Post state={state} actions={actions}></Post>)
        break
      case 'posts_list':
      default:
        res.push(<PostsList state={state} actions={actions}></PostsList>)
    }
    return (
      <div>
        <h1>Phil's Site</h1>
        <h2>Blog</h2>
        {res}
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer)


