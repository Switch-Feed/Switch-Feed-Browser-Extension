import React from 'react'
import { connect } from 'react-redux'
import { submitPost } from '../actions/actions'
import { ADD_POST } from '../actions/actions'
// import { icon } from '../constants/types'
import $ from 'jquery'

var getInput = () => {
  // let val = document.getElementById('input').innerHTML().trim()
  // document.getElementById('input').innerHTML().text('')
  let val = $('#input').text().trim()
  $('#input').text('')
  console.log(`got input: ${val}`)
  return val
}

var getTimestamp = () => {
    let d = new Date()
    return d.getTime()
}

const Composer = ({dispatch,selectedBoard}) => {

  var handleSubmitPost = () => {
    var input = getInput()
    if(input.trim() == ''){
      //input is empty, notify
      console.log('empty input')
      $('#input').css('border','1px solid red')
      $('#input').keypress( (event)=> {
        //check the input for empty space
        if($('#input').text().trim() !== ''){
          $('#input').css('border','1px solid #e5e5e5')
        }
      })
    } else {
      console.log(input)
      $('#input').css('border','1px solid #e5e5e5')
      dispatch(submitPost({text:input, time:getTimestamp(), comments:[]},selectedBoard,ADD_POST))
    }

  }

  const icon = chrome.extension.getURL('icon-48.png')
  // const icon = 'icon-48.png'

  return(
    <div>
      <div className="anon_composer">
        <img src={icon} alt="profile"/>
        <p>Welcome to Switch Feed!</p>
        <span
          id="input"
          className="anon_input"
          data-ph="What's on your mind?"
          contentEditable="true"
        >
        </span>
        <p className="composer_input">This post will be completely anonymous. Speak your mind.</p>
        <button className="anon_button anon_postButton" id="postButton" type="button" onClick={()=>{handleSubmitPost()}}>Post</button>
      </div>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    selectedBoard:state.selectedBoard
  }
}

export default connect(mapStateToProps)(Composer)
