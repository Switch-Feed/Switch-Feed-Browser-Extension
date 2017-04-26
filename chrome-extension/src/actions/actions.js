import fetch from 'isomorphic-fetch'
import $ from 'jquery'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_BOARD = 'SELECT_BOARD'
export const INVALIDATE_BOARD = 'INVALIDATE_BOARD'
export const ADD_POST = 'ADD_POST'
export const ADD_REPLY = 'ADD_REPLY'

export function submitPost(message,board,type){
  // console.log(message)
  $.ajax({
       method: "POST",
       header: "Access-Control-Allow-Origin",
       url: "https://gentrydemchak.com/api/v2/test/submitPost/" + board,
       dataType: 'JSON',
       data: {...message,board}
     })
     .done( ( msg ) => {
       console.log('payload sent');
     })
  return dispatch => {
    dispatch(fetchPosts(board))
  }
}



export function submitReply(comment,board){
  // console.log(reply)
  $.ajax({
       method: "POST",
       header: "Access-Control-Allow-Origin",
       url: "https://gentrydemchak.com/api/v2/test/submitComment/",
       dataType: 'JSON',
       data: {...comment},
       error: ( (err) => {
         console.log(err)
       })
     })
     .done( ( msg ) => {
       console.log('payload sent');
     });
     return dispatch => {
       dispatch(fetchPosts(board))
     }
}

export function selectBoard(board) {
  return {
    type: SELECT_BOARD,
    board
  }
}

export function invalidateBoard(board) {
  return {
    type: INVALIDATE_BOARD,
    board
  }
}

function requestPosts(board) {
  return {
    type: REQUEST_POSTS,
    board
  }
}

function receivePosts(board, json) {
  return {
    type: RECEIVE_POSTS,
    board,
    posts: json.posts,
    receivedAt: Date.now()
  }
}

function fetchPosts(board) {
  return dispatch => {
    dispatch(requestPosts(board))
    return fetch(`https://gentrydemchak.com/api/v2/test/posts/${board}`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(board, json)))
  }
}

function shouldFetchPosts(state, board) {
  const posts = state.postsByBoard[board]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(board) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), board)) {
      return dispatch(fetchPosts(board))
    }
  }
}
