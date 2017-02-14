'use strict'

import React from 'react'
import { PostsList } from '../components/posts'
import { Navbar } from '../components/navbar'

export class Main extends React.Component {

  _navbar = () => {
    return (<Navbar/>)
  }

  _index = () => {
    return (<div>
              <h1>Phil's Site</h1>
              <h2>Technologies so far</h2>
              <ul>
                  <li>Flask</li>
                  <li>MongoDB</li>
                  <li>React.js</li>
              </ul>
              <PostsList></PostsList>
            </div>)
  }

  _office = () => {
    return (<div>
              <h1>Office</h1>
            </div>)
  }

  render() {
    switch(this.props.section){
      case 'office':
        return (
          <div>
            {this._navbar()}
            {this._office()}
          </div>
        )
      case 'index':
      default:
        return (
          <div>
            {this._navbar()}
            {this._index()}
          </div>
        )
    }
  }
}
