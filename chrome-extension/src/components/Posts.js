import React, { PropTypes, Component } from 'react'
import Post from '../containers/post'

export default class Posts extends Component {

  render() {
    // console.log(this.props.posts)
    const { _id, comments, text, time } = this.props.posts
    return (
      <ul>
        {this.props.posts.map((post, i) =>
          <Post comments={comments} text={text} _id={_id} time={time} key={i} />
        )}
      </ul>
    )
  }

}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
