import { combineReducers } from 'redux'
import {
  SELECT_BOARD, INVALIDATE_BOARD,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../actions/actions'

function selectedBoard(state = 'random', action) {
  switch (action.type) {
  case SELECT_BOARD:
    return action.board
  default:
    return state
  }
}

function toggleApp(state=false, action) {
  return !state
}

function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_BOARD:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    // case ADD_POST:
    //   return Object.assign({}, state, {
    //     items: {action.text, action.time}
    //   })
    default:
      console.log('')
      return state
  }
}

function postsByBoard(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_BOARD:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.board]: posts(state[action.board], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByBoard,
  selectedBoard
})

export default rootReducer
