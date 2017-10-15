import Conf from '../conf'
import { isEffect } from '../lib/util'

export default store => next => action => {
  // Middleware format.
  // - Logs each action as they come in,
  // - Dispatches the action, and
  // - Logs the new state.
  const groupingWorks = typeof console.group === 'function'
  if (Conf.logging.enabled && groupingWorks && !isEffect(action)) {

    // Collapse log groups?
    Conf.logging.collapse
      ? console.groupCollapsed(action.type)
      : console.group(action.type)

    console.log('%c' + 'action:', 'color: blue', action)
    const result = next(action)
    console.log('%c' + 'next state:', 'color: red', store.getState())
    console.groupEnd(action.type)
    return result
  }

  // If grouping fails, use basic logging.
  if (Conf.logging.enabled && !isEffect(action)) {
    console.log('Action:', action.type, action.payload || '')
    return next(action)
  }

  return next(action)
}
