import React, { Component, PropTypes } from 'react'
import { findGetParameter } from '../../lib/util'
import * as types from '../../actions/action-types'
import { styles } from './styles'

export class PostList extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    /*
     * Fetch post list
     */
    const page = parseInt(findGetParameter('page')) || 1
    const rpp = parseInt(findGetParameter('rpp')) || 10
    this.setState({ page, rpp })

    const query = `{posts(page:${page},rpp:${rpp}){_id,title,body}}`
    this.props.actions.graphqlQuery(
      query, types.POSTS_GET_SUCCESS, types.POSTS_GET_ERROR)
  }

  render = () => {
    console.log('postList this.props', this.props)
    let message = ''
    const { error, success } = this.props.state.post

    if (success) {
      message = (<div style={styles.success}>{success}</div>)
    }
    if (error) {
      message = (<div style={styles.error}>{error}</div>)
    }
    const posts = this.props.state.post.posts
    const { page, rpp } = this.state
    const next_link = `/office/posts?page=${page+1}&rpp=${rpp}`
    const prev_link = `/office/posts?page=${page-1}&rpp=${rpp}`
    const prev = page > 1 ? (<a href={prev_link}>&laquo; prev</a>) : ''
    // TODO: this logic is probably faulty
    const next = posts.length === rpp ? (<a href={next_link}>next &raquo;</a>) : ''
    const res = []
    for (let i=0; i<posts.length; i++) {
      let p = posts[i]
      res.push(
        <AdminPostRow key={p._id}
                      post={p}
                      editPost={this._editPost}
                      deletePost={this._deletePost}></AdminPostRow>
      )
    }

    return (
      <div>
        {message}
        <div>
          {prev} {next}
        </div>
        <div style={styles.postsList}>
          <table style={styles.adminPostTable}><tbody>{res}</tbody></table>
        </div>
        <div>
          {prev} {next}
        </div>
      </div>
    )
  }
  _editPost = (p) => {
    window.location = `/office/posts/${p._id}`
  }
  _deletePost = (p) => {
    const mutation = `mutation myDeleteMutation {
      delete_post(_id:"${p._id}") {
        post_id,
        ok
      }
    }`
    this.props.actions.graphqlMutation(
      mutation, types.POST_DELETE_SUCCESS, types.POST_DELETE_ERROR)
  }
}

// this is the preferred way to pass args to a
// component event action, that way
// extra render() calls aren't made
class AdminPostRow extends Component {
  render = () => {
    return (
      <tr key={this.props.post._id}>
          <td style={styles.adminPostTitle}><a href="#" onClick={this._edit}>{this.props.post.title}</a></td>
          <td>{this.props.post._id}</td>
          <td><a href="#" onClick={this._delete}>[X]</a></td>
      </tr>
    )
  }
  _edit = (e) => {
    e.preventDefault()
    this.props.editPost(this.props.post)
  }
  _delete = (e) => {
    e.preventDefault()
    this.props.deletePost(this.props.post)
  }
}