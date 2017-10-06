import React, { Component, PropTypes } from 'react'
import { findGetParameter } from '../lib/util'
import * as types from '../actions/action-types'

export class Office extends Component {

  componentWillMount() {
    const page = parseInt(findGetParameter('page')) || 1
    const rpp = parseInt(findGetParameter('rpp')) || 10
    // paging
    this.setState({ page, rpp })
    const query = `{posts(page:${page},rpp:${rpp}){_id,title,body}}`
    this.props.actions.graphqlQuery(
      query, types.POSTS_GET_SUCCESS, types.POSTS_GET_ERROR)
  }

  // ===========
  // login form
  // ===========
  _isLoggedIn = () => {
    // redux state
    return !!this.props.state.user.user_token
  }
  _loginForm = () => {
    return (
      <div>
        <form method="post" onSubmit={this._submitLogin} >
            <div>username:
              <input type="text" onChange={this._handleUsernameChange}/>
            </div>
            <div>password:
              <input type="password" onChange={this._handlePasswordChange} />
            </div>
            <div>
              <input style={styles.submitButton} type="submit" value="Login" />
            </div>
        </form>
      </div>
    )
  }
  _handleUsernameChange = e => this.setState({username: e.target.value})
  _handlePasswordChange = e => this.setState({password: e.target.value})
  _submitLogin = (e) => {
    e.preventDefault()
    // local component state
    if (!this.state) {
      console.log("You didn't type anything!")
      return
    }
    this.props.actions.requestLogin(this.state.username, this.state.password)
  }

  // ===========
  // post form
  // ===========
  _postForm = () => {
    let message = ''
    const { error, success } = this.props.state.post

    if (success) {
      message = (<div style={styles.success}>{success}</div>)
    }
    if (error) {
      message = (<div style={styles.error}>{error}</div>)
    }

    return (
      <div>
        {message}
        <form>
          <label style={{...styles.label, ...styles.block}}>Title</label>
          <input style={styles.textInput} type="text" onChange={this._titleChange}/>

          <label style={{...styles.label, ...styles.block}}>Body</label>
          <textarea style={styles.postText} onChange={this._bodyChange}></textarea>

          <select id="publish_status" onChange={this._publishStatusChange} >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div style={styles.submitButton}>
            <input type="button" value="Post It" onClick={this._handlePostSubmit}/>
          </div>
        </form>
      </div>
    )
  }
  _titleChange = e => this.setState({'title':e.target.value})
  _bodyChange = e => this.setState({'body':e.target.value})
  _publishStatusChange = e => this.setState({'publish_status':e.target.value})
  _handlePostSubmit = (e) => {
    e.preventDefault()
    if (!this.state) {
      console.log("You didn't type anything!")
      return
    }
    // pull data from local state
    const { title, body, publish_status } = this.state || {}
    // insert mutation
    const mutation = `mutation myMutation {
        create_post(
          post_form_data:{title:"${title}",body:"${body}",publish_status:"${publish_status}"}
        ) {
          post {
            title
          },
          ok
        }
    }`
    this.props.actions.graphqlMutation(
      mutation, types.POST_CREATE_SUCCESS, types.POST_CREATE_ERROR)
  }

  // ===========
  // post list
  // ===========
  _postList = () => {
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
    console.log("edit post ", p)

  }
  _deletePost = (p) => {
    const mutation = `mutation myMutation {
      delete_post(_id:"${p._id}") {
        post_id,
        ok
      }
    }`
    this.props.actions.graphqlMutation(
      mutation, types.POST_DELETE_SUCCESS, types.POST_DELETE_ERROR)
  }

  // =============
  // office index
  // =============
  _officeIndex = () => {
    return (
      <div>
        <ul>
          <li><a href="/office/posts">My Posts</a></li>
          <li><a href="/office/posts/new">Write a Post</a></li>
        </ul>
      </div>
    )
  }

  render = () => {
    // render main content based on login state, subsection
    // loading indicator
    if (this.props.state.app.loading) {
      return (<div style={styles.loading}><em>Loading...</em></div>)
    }

    // app is loaded, show login, post list, post form (new or edit)
    let content, title, sub
    sub = !this._isLoggedIn() ? 'login' : this.props.subsection
    switch(sub) {
      case 'login':
        title = 'Login first!'
        content = this._loginForm()
        break
      case 'post_new':
        title = `Write a post ${this.props.state.user.username}!`
        content = this._postForm()
        break
      case 'post_edit':
        title = `Edit this post ${this.props.state.user.username}!`
        content = this._postForm()
        break
      case 'post_list':
        title = `Here are your posts ${this.props.state.user.username}!`
        content = this._postList()
        break
      case 'index':
      default:
        title = `Site Admin`
        content = this._officeIndex()
    }

    return (
      <div style={styles.officeNav}>
        <a href="/office">Site Admin</a>
        &nbsp;&middot;&nbsp;
        <a href="/office/posts">My Posts</a>
        &nbsp;&middot;&nbsp;
        <a href="/office/posts/new">Write a Post</a>
        <h1>{title}</h1>
        {content}
      </div>
    )
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

const styles = {
  loading: {marginTop:'5em'},
  error: {
    display:'block',
    color: 'white',
    backgroundColor: '#f44242',
    margin: '1em 0 1em 0',
    width: '50%',
    padding: '5px'
  },
  success: {
    display:'block',
    color: 'white',
    backgroundColor: '#37ce23',
    margin: '1em 0 1em 0',
    width: '50%',
    padding: '5px'
  },
  postText: {
    width:'50%',
    height:'10em',
    display:'block',
    marginTop: '1em',
    marginBottom:'1em'
  },
  postsList: {
    margin: '.5em 0 .5em 0',
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    padding: '.5em 0 .5em 0'
  },
  adminPostTitle: {
    width: '25%'
  },
  adminPostTable: {
    width: '500px'
  },
  textInput: { width:'50%', marginTop: '1em', marginBottom: '1em'},
  submitButton: { marginTop:'1em'},
  officeNav: { marginTop:'1em' },
  block: { display: 'block' },
  label: { fontSize: '1em', fontWeight: 'bold'}
}