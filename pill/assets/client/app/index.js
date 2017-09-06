'use strict'

import React from 'react'
import { render } from 'react-dom'

import { MainContainer } from './containers/main'
import { makeStore } from './redux-store'
import { Provider } from 'react-redux'

import * as types from './actions/action-types'

class App extends React.Component {

  componentWillMount() {
    // TODO: check login
    const store = makeStore()
    this.setState({store: store})

    // will check login etc.
    // get proper state from server
    store.dispatch({
      type: types.APP_INIT_STARTED,
      payload: {}
    })
  }

  render() {
    return (<Provider store={this.state.store}>
              <MainContainer {...this.props}/>
            </Provider>)
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
