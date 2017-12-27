'use strict'

import React from 'react'
import {render} from 'react-dom'
import { findGetParameter } from '../lib/util'
import * as types from '../actions/action-types'

export class PostsList extends React.Component {

  componentWillMount() {
    const page = parseInt(findGetParameter('page')) || 1
    const rpp = parseInt(findGetParameter('rpp')) || 10
    // paging
    this.setState({ page, rpp })
    // build graphQL query
    const query = `{posts(page:${page},rpp:${rpp}){_id,title}}`
    this.props.actions.graphqlQuery(
      query, types.POSTS_GET_SUCCESS, types.POSTS_GET_ERROR)
  }

  render() {
    const posts_markup = []
    const { posts } = this.props.state.post
    const { page, rpp } = this.state
    const next_link = `/blog?page=${page+1}&rpp=${rpp}`
    const prev_link = `/blog?page=${page-1}&rpp=${rpp}`
    const prev = page > 1 ? (<a href={prev_link}>&laquo; prev</a>) : ''
    const next = posts.length === rpp ? (<a href={next_link}>next &raquo;</a>) : ''
    posts.map((p) =>
      posts_markup.push(
        <li key={p._id}>
          <a href={"/blog/posts/" + p._id}>{p.title}</a>
        </li>)
    )
    return (
      <div>
        {prev} {next}
        <ul>{posts_markup}</ul>
        {prev} {next}
      </div>)
  }

}

export class Post extends React.Component {

  componentWillMount() {
    // get single post
    const pathArr = window.location.pathname.split("/")
    const _id = pathArr[pathArr.length-1]
    // build graphQL query
    const query = `{post(_id:"${_id}"){title,body_html}}`
    this.props.actions.graphqlQuery(
      query, types.POST_GET_SUCCESS, types.POST_GET_ERROR)
  }

  render() {
    const { single_post } = this.props.state.post
    if (!single_post) {
      return (
        <div>rendering...</div>
      )
    }
    return (
      <div>
        <h1>{single_post.title}</h1>
        <div dangerouslySetInnerHTML={{__html:single_post.body_html}}></div>
      </div>
    )
  }
}