import React, { Component, PropTypes } from 'react'

export class Office extends Component {

  _errors = () => {
    if (this.props['error']) {
      return (
        <div>errors {this.props['error']}</div>
      )
    }
    return ''
  }

  _submitLogin = (e) => {
    e.preventDefault()
    if (!this.state) {
      console.log("You didn't type anything!")
      return
    }
    // local component state
    this.props.actions.requestLogin(this.state.username, this.state.password)
  }

  _handleUsernameChange = (e) => {
     this.setState({username: e.target.value})
  }

  _handlePasswordChange = (e) => {
     this.setState({password: e.target.value})
  }

  _isLoggedIn = () => {
    // redux state
    return !!this.props.state.user.user_token
  }

  _loginForm = () => {
    return (
      <div>
        {this._errors()}
        <form method="post" onSubmit={this._submitLogin} >
            <div>username:
              <input type="text" name="username" onChange={this._handleUsernameChange}/>
            </div>
            <div>password:
              <input type="password" name="password" onChange={this._handlePasswordChange} />
            </div>
            <div>
              <input style={styles.submitButton} type="submit" value="Login" />
            </div>
        </form>
      </div>
    )
  }

  _handlePostSubmit = () => {
    console.log('submit form!')
  }

  _postForm = () => {
    return (
      <div>
        <form>
          <textarea name="post_text" style={styles.postText}></textarea>
          <select name="publish_status">
            <option value="published">Draft</option>
            <option value="published">Published</option>
          </select>
          <div style={styles.submitButton}>
            <input type="button" name="post_submit" value="Post It" onClick={this._handlePostSubmit}/>
          </div>
        </form>
      </div>
    )
  }

  render = () => {
    // loading indicator
    if (this.props.state.app.loading) {
      return (<div style={styles.loading}><em>Loading...</em></div>)
    }

    // app is loaded, show login or post form
    let res
    const isLoggedIn = this._isLoggedIn()
    if (!isLoggedIn) {
      res = this._loginForm()
    }
    else {
      res = this._postForm()
    }

    return (
      <div>
        <h1>Write a post {this.props.state.user.username}!</h1>
        {res}
      </div>
    )
  }
}

const styles = {
  loading: {'marginTop':'5em'},
  postText: {width:'50%', height:'10em', display:'block', marginBottom:'1em'},
  submitButton: { marginTop:'1em'}
}