'use strict'

import React from 'react'
import {render} from 'react-dom'
import { findGetParameter } from '../lib/util'

export class PostsList extends React.Component {

  componentWillMount() {
    const page = parseInt(findGetParameter('page')) || 1
    const rpp = parseInt(findGetParameter('rpp')) || 10
    // paging
    this.setState({ page, rpp })
    this.props.actions.getPosts(page, rpp)
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
  }

  render() {
      return <div>single post</div>
  }
}