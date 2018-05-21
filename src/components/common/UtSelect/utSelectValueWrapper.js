/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import { Value } from 'react-select'
import cx from 'classnames'
import { Icon } from 'semantic-ui-react'

export default function utSelectValueWrapper({ isValueValid, labelKey }) {
  class UtSelectValue extends Value {
    constructor(props) {
      super(props)
      this.state = {
        isValid: isValueValid(props.value[labelKey])
      }
    }

    componentWillReceiveProps({ value }) {
      if (value !== this.props.value) {
        this.setState({ isValid: isValueValid(value[labelKey]) })
      }
    }

    renderRemoveIcon() {
      if (this.props.disabled || !this.props.onRemove) {
        return null
      }
      return (
        <Icon
          icon="times"
          className="Select-value-icon"
          aria-hidden="true"
          onMouseDown={this.onRemove}
          onTouchEnd={this.handleTouchEndRemove}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
        />
      )
    }

    renderLabel() {
      const className = cx('Select-value-label')
      return this.props.onClick || this.props.value.href
        ? <a
            className={className}
            href={this.props.value.href}
            target={this.props.value.target}
            onMouseDown={this.handleMouseDown}
            onTouchEnd={this.handleMouseDown}
          >
            {this.props.children}
          </a>
        : <span
            className={className}
            role="option"
            aria-selected="true"
            id={this.props.id}
          >
            <div className="Select-value-label-text">{this.props.children}</div>
          </span>
    }

    render() {
      return (
        <div
          className={cx('Select-value', this.props.value.className, {
            'is-invalid': !this.state.isValid
          })}
          style={this.props.value.style}
          title={this.props.value.title}
        >
          {this.renderLabel()}
          {this.renderRemoveIcon()}
        </div>
      )
    }
  }

  UtSelectValue.displayName = 'UtSelectValue'

  UtSelectValue.propTypes = {
    value: PropTypes.object
  }

  return UtSelectValue
}

utSelectValueWrapper.propTypes = {
  isValueValid: PropTypes.func,
  value: PropTypes.object,
  labelKey: PropTypes.string
}
