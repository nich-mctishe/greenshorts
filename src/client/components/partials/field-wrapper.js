import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FieldWrapper extends Component {

  static propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    hasError: PropTypes.bool,
    error: PropTypes.string,
    message: PropTypes.string
  }

  static defaultProps = {
    name: 'test',
    title: 'test',
    hasError: false,
    messages: null
  }

  render () {
    const { name, title, hasError, error, messages } = this.props

    return (
      <div className="field--row">
        <label htmlFor={name}>
          {hasError && error && (
            <p>{error}</p>
          )}
          <p>{title}</p>
          {this.props.children}
        </label>
        {messages && (
          <span>{messages}</span>
        )}
      </div>
    )
  }
}
