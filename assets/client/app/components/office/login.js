import React, { Component, PropTypes } from 'react'
import { findGetParameter } from '../../lib/util'
import * as types from '../../actions/action-types'
import { styles } from './styles'

export class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render = () => {
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
}

