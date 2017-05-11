import React, { PropTypes, Component } from 'react'

export default class Comments extends Component {

  handleTime(i) {
    var timestring = ''
    var d = new Date(this.props.comments[i].date)
    var current = new Date()
    var diff = current - d;

    if (diff >= 1000*60*60*24){
      //older than a day?
      var days = Math.floor(diff / (1000*60*60*24))
      if(days <= 1){
        timestring = `${days} day ago`
      } else {
        timestring = `${days} days ago`
      }
    } else if (diff < 1000*60*60*24 && diff >= 1000*60*60){
      //older than a few hours, but less than a day?
      var hours = Math.floor(diff / (1000*60*60))
      if(hours <= 1){
        timestring = `${hours} hour ago`
      } else {
        timestring = `${hours} hours ago`
      }
    } else if (diff < 1000*60*60){
      //older than a few minutes, but less than an hour?
      var minutes = Math.floor(diff / (1000*60))
      if(minutes <= 1) {
        timestring = `${minutes} minute ago`
      } else {
        timestring = `${minutes} minutes ago`
      }
    }

    return timestring
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
