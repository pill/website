import React, { Component, PropTypes } from 'react'

export class Office extends Component {

  componentDidMount() {
    const page = 1
    const rpp = 20
    this.props.actions.getPosts(page, rpp)
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
    // TODO: validation
    // pull data from local state
    const { title, body, publish_status } = this.state || {}
    this.props.actions.createPost({ title, body, publish_status })
  }

  // ===========
  // post list
  // ===========
  _postList = () => {
    const posts = this.props.state.post.posts
    const res = []
    console.log('posts', posts)
    for (let i=0; i<posts.length; i++) {
      let p = posts[i]
      res.push(<div key={p._id}>{p.title}</div>)
    }
    return (
      <div>
        {res}
      </div>
    )
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
    // render basd on login state, subsection

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
  textInput: { width:'50%', marginTop: '1em', marginBottom: '1em'},
  submitButton: { marginTop:'1em'},
  officeNav: { marginTop:'1em' },
  block: { display: 'block' },
  label: { fontSize: '1em', fontWeight: 'bold'}
}