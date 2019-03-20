import React, { Component } from 'react'

export default class Grid extends Component {

  render () {

    return (
      <div className="grid">
        {this.props.children}
      </div>
    )
  }
}
