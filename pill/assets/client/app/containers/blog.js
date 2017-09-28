'use strict'

import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as postActions from '../actions/post'
import { PostsList, Post } from '../components/posts'
import * as graphQLActions from '../actions/graphql'

export class BlogContainer extends Component {
  render() {
    const { state, actions } = this.props
    const res = []
    switch(this.props.subsection) {
      case 'single_post_view':
        res.push(<Post key="post" state={state} actions={actions}></Post>)
        break
      case 'posts_list':
      default:
        res.push(<PostsList key="postList" state={state} actions={actions}></PostsList>)
    }
    return (
      <div>
        <h1>Phil's Blog</h1>
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
    actions: bindActionCreators({...postActions, ...graphQLActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogContainer)


