import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { ADD_REPLY } from '../actions/actions'
// import { icon } from '../constants/types'
import { submitReply} from '../actions/actions'
import Comments from '../components/comments'
import $ from 'jquery'

// const icon = chrome.extension.getURL('icon-48.png')

class Post extends Component {

  constructor(props) {
    super(props)
    this.handleSubmitReply = this.handleSubmitReply.bind(this)
    this.getInput = this.getInput.bind(this)
    this.getTimestamp = this.getTimestamp.bind(this)
    this.toggleShowComments = this.toggleShowComments.bind(this)
  }

  getInput() {
    var postid = `#${this.props._id} .anon_comment_input`
    let val = $(postid).text().trim()
    $(postid).text('')
    return val
  }

  getTimestamp() {
    let d = new Date()
    return d.getTime()
  }

  handleSubmitReply() {
    var input = this.getInput()
    if(input.trim() == ''){
      //input is empty, notify
      $(`#${this.props._id} .anon_comment_input`).css('border','1px solid red')
      $(`#${this.props._id} .anon_comment_input`).keypress( (event)=> {
        //check the input for empty space
        if($(`#${this.props._id} .anon_comment_input`).text().trim() !== ''){
          $(`#${this.props._id} .anon_comment_input`).css('border','1px solid #e5e5e5')
        }
      })
    } else {
      $(`#${this.props._id} .anon_comment_input`).css('border','1px solid #e5e5e5')
      this.props.dispatch(submitReply({text:input, time:this.getTimestamp(), _id:this.props._id, board:this.props.board},this.props.selectedBoard))
    }
  }

  toggleShowComments() {
    $(`.comments_${this.props._id}`).toggle()
  }

  handleTime(time) {
    var timePosted = new Date(this.props.date)
    var current = new Date()
    var elapsedTime = new Date(current - timePosted)
    return 'Posted ' + elapsedTime.getHours() + ' hours ' + elapsedTime.getMinutes() + ' minutes ago.'
  }

  render() {

    // const icon = 'icon-48.png'
    const icon = chrome.extension.getURL('icon-48.png')
    const flag = chrome.extension.getURL('flag.png')

    return (
      <div className={`anon_compose anon_container ${this.props.selectedBoard}`}  id={this.props._id}>
          <div className="op_container">
            <img className="icon" src={icon} alt="profile"/>
            <div className="op">
              <p className="name"> {`Racoon | ${this.props._id}`} </p>
              <p className="time">{this.handleTime()}</p>
            </div>
          </div>
          <div className="moderation_tools">
            <img src={flag} alt="flag"/>
          </div>
          <div className="anon_text_container">
            <span className="anon_text">{this.props.text}</span>
          </div>
          <div className="interactions_container">
            <span
              id={this.props._id}
              className="anon_comment_input"
              data-ph="Write a comment... "
              contentEditable="true"
            />
            <div className="anon_button" onClick={this.handleSubmitReply}>Post comment</div>
            <div className="anon_button anon_showComments" onClick={this.toggleShowComments}>Toggle Comments ({ this.props.comments ? this.props.comments.length : 0 })</div>

              <Comments comments={this.props.comments} _id={this.props._id}/>

          </div>

      </div>
    )
  }
}

Post.propTypes = {
  text: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  _id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  selectedBoard: PropTypes.string.isRequired
}

export default connect()(Post)
