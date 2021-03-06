'use strict'

import React, { Component, PropTypes } from 'react'
import HomeContainer from './home'
import OfficeContainer from './office'
import BlogContainer from './blog'
import WorkContainer from './work'
import { Navbar } from '../components/navbar'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as graphQLActions from '../actions/graphql'

export class MainContainer extends Component {
  /*
   * This class acts as a container router based on section
   */
  render() {
    const { state, actions } = this.props
    const res = []
    // always place navbar on top
    res.push(<Navbar state={state} actions={actions} key="navbar"/>)

    // main content can vary by section
    switch(this.props.section) {
      case 'office':
        res.push(<OfficeContainer state={state} actions={actions} key="officeContainer" {...this.props}/>)
        break
      case 'blog':
        res.push(<BlogContainer state={state} actions={actions} key="blogContainer" {...this.props}/>)
        break
      case 'work':
        res.push(<WorkContainer state={state} actions={actions} key="workContainer" {...this.props}/>)
        break
      default:
        res.push(<HomeContainer state={state} actions={actions} key="homeContainer" {...this.props}/>)
    }
    return (
      <div>{res}</div>
    )
  }
}

// map global state to component properties
function mapStateToProps(state) {
  return { state: state }
}

// map global state to component properties
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...graphqlActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)

