import React, { Component, PropTypes } from 'react'
import { findGetParameter, gqlCleanText } from '../../lib/util'
import * as types from '../../actions/action-types'
import { styles } from './styles'

export class PostForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    /*
     * Get the single post
     */
    const post_id = this.props.post_id

    if (!post_id) { return }

    this.setState({ _id: post_id })

    const query = `{post(_id:"${post_id}"){_id,title,body}}`
    this.props.actions.graphqlQuery(
      query, types.POST_GET_SUCCESS, types.POST_GET_ERROR)
  }
  render = () => {
    let message = ''
    const { error, success, single_post } = this.props.state.post
    let thePost
    if (!single_post) {
      const { title, body, publish_status} = this.state
      thePost = {
        title: title || '',
        body: body || '',
        publish_status: publish_status ||'draft'
      }
    }
    else {
      // it is edit mode
      // will use live component state if keys are
      // set else use the post we fetched
      thePost = this._postFormValues()
    }

    if (success) {
      message = (<div style={styles.success}>{success}</div>)
    }
    if (error) {
      message = (<div style={styles.error}>{error}</div>)
    }

    let submit_button = <input type="button" value="Post It" onClick={this._handlePostSubmit}/>
    if (this.props.isEdit) {
      submit_button = <input type="button" value="Update It" onClick={this._handlePostEdit}/>
    }

    return (
      <div>
        {message}
        <form>
          <label style={{...styles.label, ...styles.block}}>Title</label>
          <input style={styles.textInput}
            value={thePost.title} type="text" onChange={this._titleChange}/>

          <label style={{...styles.label, ...styles.block}}>Body</label>
          <textarea style={styles.postText}
            value={thePost.body} onChange={this._bodyChange}></textarea>

          <select id="publish_status" onChange={this._publishStatusChange} >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <div style={styles.submitButton}>
            {submit_button}
          </div>
        </form>
      </div>
    )
  }

  _postFormValues = () => {
    // get either this.state (just edited), or single_post (orig post)
    const { single_post } = this.props.state.post
    return {
      _id: this.state._id || single_post._id,
      title : ('title' in this.state) ? this.state.title : single_post.title,
      body : ('body' in this.state) ?  this.state.body : single_post.body,
      publish_status : ('publish_status' in this.state) ? this.state.publish_status : single_post.publish_status
    }
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
    const clean_body = gqlCleanText(body)

    // insert mutation
    const mutation = `mutation myCreateMutation {
        create_post(
          post_form_data:{title:"${title}",body:"${clean_body}",publish_status:"${publish_status}"}
        )
        { post {_id,title,body,publish_status}, ok }
    }`
    this.props.actions.graphqlMutation(
      mutation, types.POST_CREATE_SUCCESS, types.POST_CREATE_ERROR)
  }

  _handlePostEdit = (e) => {
    e.preventDefault()
    const thePost = this._postFormValues()
    const clean_body = gqlCleanText(thePost.body)

    const mutation = `mutation myEditMutation {
        update_post(
          post_form_data:{
            _id:"${thePost._id}",
            title:"${thePost.title}",
            body:"${clean_body}",
            publish_status:"${thePost.publish_status}"}
        )
        { post {_id,title,body,publish_status}, ok }
    }`
    this.props.actions.graphqlMutation(
      mutation, types.POST_UPDATE_SUCCESS, types.POST_UPDATE_ERROR)
  }
}