/* eslint-disable */

import React from 'react'
import { Option } from 'react-select'
import Highlighter from 'react-highlight-words'
import cx from 'classnames'

const blockEvent = event => {
  event.preventDefault()
  event.stopPropagation()
  if (event.target.tagName !== 'A' || !('href' in event.target)) {
    return
  }
  if (event.target.target) {
    window.open(event.target.href, event.target.target)
  } else {
    window.location.href = event.target.href
  }
}

export default class UtSelectOption extends Option {
  render() {
    const { option, instancePrefix, inputValue, optionIndex } = this.props
    const className = cx(
      this.props.className,
      option.className,
      UtSelectOption.DEFAULT_CLASS_NAMES.BASE
    )
    return option.disabled
      ? <div
          className={className}
          onMouseDown={blockEvent}
          onClick={blockEvent}
        >
          {this.props.children}
        </div>
      : <div
          className={className}
          style={option.style}
          role="option"
          aria-label={option.label}
          onMouseDown={this.handleMouseDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseMove={this.handleMouseMove}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          id={`${instancePrefix}-option-${optionIndex}`}
          title={option.title}
        >
          <Highlighter
            highlightClassName={UtSelectOption.DEFAULT_CLASS_NAMES.HIGHLIGHT}
            searchWords={[inputValue]}
            autoEscape
            textToHighlight={this.props.children}
          />
        </div>
  }
}

UtSelectOption.DEFAULT_CLASS_NAMES = {
  BASE: 'ut-select-option',
  HIGHLIGHT: 'ut-select-option-highlight'
}
