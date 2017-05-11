import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectBoard, fetchPostsIfNeeded, invalidateBoard, toggleApp } from '../actions/actions'
import Picker from '../components/Picker'
// import Posts from '../components/Posts'
import Post from './post'
import Announcement from '../components/announcement'
import Composer from './composer'
import $ from 'jquery'

class AsyncApp extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.toggle = false;
  }

  componentDidMount() {
    const { dispatch, selectedBoard } = this.props
    dispatch(fetchPostsIfNeeded(selectedBoard))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedBoard !== prevProps.selectedBoard) {
      const { dispatch, selectedBoard } = this.props
      dispatch(fetchPostsIfNeeded(selectedBoard))
    }
  }

  handleChange(nextBoard) {
    this.props.dispatch(selectBoard(nextBoard))
    this.props.dispatch(fetchPostsIfNeeded(nextBoard))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedBoard } = this.props
    dispatch(invalidateBoard(selectedBoard))
    dispatch(fetchPostsIfNeeded(selectedBoard))
  }

  handleToggle() {
    $('#app').toggle()
  }

  render() {
    const { selectedBoard, posts, isFetching, lastUpdated } = this.props
    console.log(posts)

    return (
      <div>
        <button className="anon_button toggle" onClick={this.handleToggle}>Toggle Switch Feed ({posts.length} posts)</button>
        <div id="app">

        <div className="anon_container">
          <Picker value={selectedBoard}
                  onChange={this.handleChange}
                  options={[ 'politics', 'qa', 'random' , 'meta']} />
          <p>
            {lastUpdated &&
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              </span>
            }
            {!isFetching &&
              <a href='#'
                onClick={this.handleRefreshClick}>
                Refresh
              </a>
            }
          </p>
          <Announcement board={this.props.selectedBoard}/>
        </div>

        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }

        <Composer selectedBoard={selectedBoard}/>

        {posts.length > 0 &&
          <div style={{ opacity: isFetching ? 0.8 : 1 }}>
           <ul>
            {
              posts.map( (post,i) =>
                <Post key={i} selectedBoard={this.props.selectedBoard} {...post}/>
              )
            }
            </ul>
          </div>
        }

        </div>
      </div>
    )
  }
}

AsyncApp.propTypes = {
  selectedBoard: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

// console.log(state)

function mapStateToProps(state) {
  const { selectedBoard, postsByBoard } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByBoard[selectedBoard] || {
    isFetching: true,
    items: []
  }

  return {
    selectedBoard,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(AsyncApp)
