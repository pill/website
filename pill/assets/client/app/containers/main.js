'use strict'

import React from 'react'
import { HomeContainer } from './home'
import { OfficeContainer } from './office'
import { Navbar } from '../components/navbar'

export class MainContainer extends React.Component {

  render() {
    const res = []
    // always place navbar on top
    res.push(<Navbar key="navbar"/>)

    switch(this.props.section){
      case 'office':
        res.push(<OfficeContainer key="officeContainer"/>)
        break
      case 'main':
      case 'posts':
      default:
        res.push(<HomeContainer key="homeContainer" />)
    }
    return (<div>{res}</div>)
  }
}
