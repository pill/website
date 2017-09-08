import React, { Component, PropTypes } from 'react'

export class Office extends Component {
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
    if (!this.state) {
      console.log("You didn't type anything!")
      return
    }
    // local component state
    this.props.actions.requestLogin(this.state.username, this.state.password)
  }

  // ===========
  // post form
  // ===========
  _postForm = () => {
    return (
      <div>
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
    // TODO: validation
    const { title, body, publish_status } = this.state || {}
    this.props.actions.createPost({ title, body, publish_status })
  }

  _postList = () => {
    return (
        <div>
          post list
        </div>
    )
  }

  render = () => {
    // loading indicator
    if (this.props.state.app.loading) {
      return (<div style={styles.loading}><em>Loading...</em></div>)
    }

    // app is loaded, show login, post list, post form (new or edit)
    let content, title
    const isLoggedIn = this._isLoggedIn()
    if (!isLoggedIn) {
      title = 'Login first!'
      content = this._loginForm()
    }
    else if (this.props.subsection === 'post_new'){
      // post section
      title = `Write a post ${this.props.state.user.username}!`
      content = this._postForm()
    }
    else if (this.props.subsection === 'post_edit'){
      // post section
      title = `Edit this post ${this.props.state.user.username}!`
      content = this._postForm()
    }
    else if (this.props.subsection === 'post_list') {
      title = `Here are your posts ${this.props.state.user.username}!`
      content = this._postList()
    }

    return (
      <div>
        <h1>{title}</h1>
        {content}
      </div>
    )
  }
}

const styles = {
  loading: {'marginTop':'5em'},
  postText: {
    width:'50%',
    height:'10em',
    display:'block',
    marginTop: '1em',
    marginBottom:'1em'
  },
  textInput: { width:'50%', marginTop: '1em', marginBottom: '1em'},
  submitButton: { marginTop:'1em'},

  block: { display: 'block' },
  label: { fontSize: '1em', fontWeight: 'bold'}
}