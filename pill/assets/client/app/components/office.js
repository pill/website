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

    console.log("do submit API call...", this.props)
    // emit action
    this.props.actions.requestLogin(this.state.username, this.state.password)
    // fetch API call login
    // set token in global state
    // or show error
  }

  _handleUsernameChange = (e) => {
     this.setState({username: e.target.value})
  }

  _handlePasswordChange = (e) => {
     this.setState({password: e.target.value})
  }

  render() {
    return (
      <div>
        <h1>Office</h1>
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

}


