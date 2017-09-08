'use strict'

import React from 'react'
import {render} from 'react-dom'

export class Navbar extends React.Component {

  render() {
    return (<div>
              <a href="/">Home</a>
              &nbsp;
              <a href="/blog">Blog</a>
              &nbsp;
              <a href="/work">Work</a>
            </div>)
  }

}
