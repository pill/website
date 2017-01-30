'use strict'

import React from 'react'
import {render} from 'react-dom'
import {PostsList} from './components/posts'
import { makeStore } from './redux-store'

class App extends React.Component {

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
            </div>
            )
  }

  _office = () => {
    return (<div>
              <h1>Office</h1>
            </div>)
  }

  componentWillMount() {
    // make store
    const store = makeStore()

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

const el = document.getElementById('app')
// pass along attributes defined on "app" div in index.html template
let attrs = {}
Array.prototype.slice.call(el.attributes).map(item => {attrs[item.name] = item.value})
// init react js app
render(
  <App {...attrs} />, el
)
