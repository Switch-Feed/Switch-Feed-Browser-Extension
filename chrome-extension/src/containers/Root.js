import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import AsyncApp from './AsyncApp'

const store = configureStore()

export default class Root extends Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   toggle: true
    // }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    console.log('hit toggle button')
  }

  render() {
    return (
      <Provider store={store}>
        <AsyncApp />
      </Provider>
    )
  }
}
