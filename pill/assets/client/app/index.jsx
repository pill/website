'use strict'

import React from 'react'
import {render} from 'react-dom'

class App extends React.Component {
  render () {
    return (<div>
        <h1>Phil's Site</h1>
        <h2>Technologies so far</h2>
        <ul>
            <li>Flask</li>
            <li>MongoDB</li>
            <li>React.js</li>
        </ul>
    </div>)
  }
}

render(<App/>, document.getElementById('app'))
