import React, { PropTypes, Component } from 'react'

export default class Comments extends Component {

  handleTime(i) {
    console.log(this.props.comments)
    var timePosted = new Date(this.props.comments[i].date)
    var current = new Date()
    var elapsedTime = new Date(current - timePosted)
    return 'Replied ' + elapsedTime.getHours() + ' hours ' + elapsedTime.getMinutes() + ' minutes ago.'
  }

  render(){
    const { text, _id, date } = this.props
    // const icon = 'icon-48.png'
    const icon = chrome.extension.getURL('icon-48.png')
    return (
      <ul className={`comments_${this.props._id}`} >
      {this.props.comments.map( (comment,i) =>
        <li className="comment" key={i}>
          <div className="op_container">
            <img className="icon" src={icon} alt="profile"/>
            <div className="op">
              <p className="name"> Racoon | {comment._id}</p>
              <p className="time">{this.handleTime(i)}</p>
            </div>
          </div>
          <p>{comment.text}</p>
        </li>
      )}
      </ul>
    )
  }

}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired
}
