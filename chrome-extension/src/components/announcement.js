import React, { Component, PropTypes } from 'react'

export default class Announcement extends Component {

  handleText() {
    if(this.props.board === 'random'){
      return 'The random board is reserved for jibber jabber, hubbub, anything and everything.'
    } else if(this.props.board === 'meta'){
      return 'The meta board is for talking about all things Switch Feed. Feed back, criticism, improvements, suggestions are all relevant.'
    } else if(this.props.board === 'politics'){
      return 'The politics board is here to discuss all things politics. Post a link or snippet of an article or piece of news you found particularly interesting.'
    } else if(this.props.board === 'qa'){
      return 'The Question and Answer board is for posting questions. Any question, personal or not, is acceptable.'
    } else {
      return 'Welcome to Switch Feed!'
    }
  }

  render() {

    return (
      <div id='announcement'>
        <p>{this.handleText()}</p>
      </div>
    )
  }
}

Announcement.propTypes = {
  board: PropTypes.string.isRequired
}
