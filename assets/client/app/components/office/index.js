import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findGetParameter } from '../../lib/util'
import * as types from '../../actions/action-types'
import { styles } from './styles'
import { PostForm } from './postForm'
import { PostList } from './postList'
import { LoginForm } from './login'


class Office extends Component {

  constructor(props) {
    super(props)
    // default state
    console.log("OFFICE this.props:",  this.props)
    this.state = {}
  }

  render = () => {
    // render main content based on login state, subsection
    // loading indicator
    if (this.props.state.app.loading) {
      return (<div style={styles.loading}><em>Loading...</em></div>)
    }

    // app is loaded, show login, post list, post form (new or edit)
    let content, title
    const sub = !this._isLoggedIn() ? 'login' : this.props.subsection
    const { state, actions } = this.props
    switch(sub) {
      case 'login':
        title = 'Login first!'
        content = <LoginForm state={state}
                        actions={actions}
                        subsection={sub}></LoginForm>
        break
      case 'post_new':
        title = `Write a post ${this.props.state.user.username}!`
        content = <PostForm state={state}
                        actions={actions}
                        subsection={sub}></PostForm>
        break
      case 'post_edit':
        title = `Edit this post ${this.props.state.user.username}!`
        content = <PostForm isEdit={true}
                        post_id={this.props.post_id}
                        state={state}
                        actions={actions}
                        subsection={sub}></PostForm>
        break
      case 'post_list':
        title = `Here are your posts ${this.props.state.user.username}!`
        content = <PostList state={state}
                        actions={actions}
                        subsection={sub}></PostList>
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

  _isLoggedIn = () => !!this.props.state.user.user_token

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
}

Office.propTypes = {
  state: PropTypes.shape({

  }),
  actions: PropTypes.shape({

  }),
  subsection: PropTypes.string
}

export {
  Office,
  PostForm,
  PostList,
  LoginForm
}