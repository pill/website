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
    this.props.actions.requestLogin(this.state.username, this.state.password)
  }

  _handleUsernameChange = (e) => {
     this.setState({username: e.target.value})
  }

  _handlePasswordChange = (e) => {
     this.setState({password: e.target.value})
  }

  _is_logged_in = () => {
    if (this.props['user_token']) {
      return (
        <div>
          I'm logged in
        </div>
      )
    }
    return (<div></div>)
  }

  _loginForm = () => {
    return (

      <div>
        {this._is_logged_in()}
        {this._errors()}
        <form method="post" onSubmit={this._submitLogin} >
            <div>username:
              <input type="text" name="username" onChange={this._handleUsernameChange}/>
            </div>
            <div>password:
              <input type="password" name="password" onChange={this._handlePasswordChange} />
            </div>
            <div style={{
              textAlign : 'right',
              width:'200px',
              marginTop:'10px'}}>
              <input style={{ width: '100%'}} type="submit" value="Login" />
            </div>
        </form>
      </div>
    )
  }

  _postForm = () => {
    return (
      <div>post form</div>
    )
  }

  render() {
    const isLoggedIn = this.props.state.user.user_token
    let res
    if (!isLoggedIn) {
      res = this._loginForm()
    }
    else {
      res = this._postForm()
    }
    return (
      <div>
        <h1>Office</h1>
        {res}
      </div>
    )
  }

}


