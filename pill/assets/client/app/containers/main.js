'use strict'

import React, { Component, PropTypes } from 'react'
import HomeContainer from './home'
import OfficeContainer from './office'
import { Navbar } from '../components/navbar'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class MainContainer extends Component {

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
      case 'main':
      case 'blog':
      case 'work':
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
  return {
    state: state
  }
}

// map global state to component properties
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer)

