import 'babel-polyfill'

import React from 'react'
import {
  render
} from 'react-dom'
import Root from './containers/Root'
import $ from 'jquery'





$(document).ready(() => {

if (window.location.href == "https://www.facebook.com/"){
  //for facebook

  $('#contentArea').prepend('<div id="switchfeedapp"></div>');
  $('#universalNav ul').append('<li id="toggle_switch-feed">Switch Feed</li>')
  var switchfeedapp = document.getElementById("switchfeedapp")

    $('#u_0_5').click(() => {
      console.log('home button clicked')
      setTimeout(() => {
        $('#contentArea').prepend('<div id="switchfeedapp"></div>')
        var switchfeedapp = document.getElementById("switchfeedapp")
        render(
          <Root /> ,
          switchfeedapp
        )
      }, 3000)
    })

    render(
      <Root />,
      switchfeedapp
    )

  }

})
