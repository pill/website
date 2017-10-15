import { call, fork, all } from 'redux-saga/effects'

//import { postWatchers } from './post'
import { loginWatchers } from './login'
import { appWatchers } from './app'
import { graphqlWatchers } from './graphql'


function forkList(watcherList) {
  return watcherList.map(w => fork(w))
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export function* periodicTask(task, timeout) {
  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    yield fork(task)
    yield call(delay, timeout)
  }
}

export default function* root() {
  // Run all watchers in parallel
  try {
    const allWatchers = [
      ...forkList(loginWatchers),
      ...forkList(appWatchers),
      ...forkList(graphqlWatchers)
    ]
    yield all(allWatchers)
  }
  catch (e) {
    console.error('Problem starting watchers', e.stack)
  }
}

