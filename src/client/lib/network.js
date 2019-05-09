import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setNetworkState } from '../actions/app'

const mapStateToProps = (state, ownProps) => ({
  online: state.app.online
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onNetworkChange: item => {
    dispatch(setNetworkState(item))
  }
})

// will be able to check network connection status
// this could be a fallback if having event propagation slows the app down too much
export function isOnline() {
  return (window && window.navigator && window.navigator.onLine)
}

// add offline and online event --> coud put it in a base reducer
// this could slow whole app down by causing total re-render
class Network extends Component {

  static propTypes = {
    online: PropTypes.string,
    onNetworkChange: PropTypes.func
  }

  static defaultProps = {
    online: true,
    onNetworkChange: _ => {
      console.error('Online Component: (/client/lib/network.js) onNetworkChange event doesn\'t appear to be set from container');
    }
  }

  onNetworkChange = event => {
    const online = navigator.onLine

    if (this.props.online !== online) {
      this.props.onNetworkChange(online)
    }
  }

  render () {

    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    )
  }

  componentDidMount () {
    // set up events and link them to onNetworkChange
    if (window) {
      window.addEventListener('online',  this.onNetworkChange)
      window.addEventListener('offline', this.onNetworkChange)
    }
  }

  componentWillUnmount () {
    //remove events
    window.removeEventListener('online',  this.onNetworkChange)
    window.removeEventListener('offline', this.onNetworkChange)
  }
}

// we could have component and container both in same file
const NetworkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Network)

export default NetworkContainer
