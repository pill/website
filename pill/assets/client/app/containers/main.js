'use strict'

import React from 'react'
import {PostsList} from '../components/posts'


export class Main extends React.Component {

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
        return this._office()
      case 'index':
      default:
        return this._index()
    }
  }
}
