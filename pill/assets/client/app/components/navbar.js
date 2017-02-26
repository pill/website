'use strict'

import React from 'react'
import {render} from 'react-dom'

export class Navbar extends React.Component {

  render() {
    return (<div>
              <a href="/">Home</a>
              &nbsp;
              <a href="/posts">Posts</a>
              &nbsp;
              <a href="/work">Work</a>
            </div>)
  }

}
