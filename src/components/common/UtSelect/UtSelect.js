/* eslint-disable */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cx from 'classnames'
import Select from 'react-select'
import UtSelectOption from './UtSelectOption'
import menuRenderer from './menuRenderer'
import utSelectValueWrapper from './utSelectValueWrapper'
import clearRenderer from './clearRenderer'

export default class UtSelect extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.getSelectComponent = this.getSelectComponent.bind(this)
    this.isOptionUnique = this.isOptionUnique.bind(this)
    this.newOptionCreator = this.newOptionCreator.bind(this)
    this.shouldKeyDownEventCreateNewOption = this.shouldKeyDownEventCreateNewOption.bind(
      this
    )
    this.onPaste = this.onPaste.bind(this)
    this.select = null
  }

  onChange(value) {
    if (!this.props.multi) {
      const valuesObj = { values: value }
      return this.props.onChange(valuesObj, this.props.name)
    }
    const transformedValues = _.reduce(
      value,
      (initial, val) => {
        const transformedValue = this.props.createdOptionTransformer(
          val[this.props.labelKey]
        )
        const doesAlreadyExist = _.some(
          initial.values,
          initialValue => initialValue[this.props.labelKey] === transformedValue
        )
        if (!doesAlreadyExist) {
          initial.values.push(
            _.assign({}, val, { [this.props.labelKey]: transformedValue })
          )
        }
        if (!this.props.isValueValid(transformedValue)) {
          initial.numOfInvalid += 1
        }
        return initial
      },
      { numOfInvalid: 0, values: [] }
    )
    return this.props.onChange(transformedValues, this.props.name)
  }

  getSelectComponent() {
    const { async, creatable } = this.props
    if (creatable && async) {
      return Select.AsyncCreatable
    }
    if (creatable) {
      return Select.Creatable
    }
    if (async) {
      return Select.Async
    }
    return Select
  }

  onPaste(evt) {
    evt.preventDefault()
    const { labelKey, valueKey, createdOptionTransformer } = this.props
    const existingValues = _.map(this.props.value, val => val[labelKey])
    const clipboard = evt.clipboardData.getData('Text')
    if (!clipboard || !this.select || !this.select.select) {
      return
    }
    const values = _.chain(clipboard)
      .trim()
      .split(/[\s,;]/)
      .reduce((initial, curr) => {
        const trimmedVal = curr.trim()
        if (trimmedVal !== '') {
          const transformedVal = createdOptionTransformer(trimmedVal)
          if (
            !_.some(
              existingValues,
              existingValue => existingValue === trimmedVal
            )
          ) {
            initial.push({
              [labelKey]: transformedVal,
              [valueKey]: transformedVal
            })
          }
        }
        return initial
      }, [])
      .value()
    this.select.select.selectValue(values)
  }

  isOptionUnique({ option, options, labelKey }) {
    if (!options) {
      return true
    }
    return _.isUndefined(
      _.find(options, currOpt => {
        return currOpt[labelKey] === option[labelKey]
      })
    )
  }

  newOptionCreator({ label, labelKey, valueKey }) {
    const newVal = this.props.createdOptionTransformer(label)
    return {
      [labelKey]: newVal,
      [valueKey]: newVal
    }
  }

  shouldKeyDownEventCreateNewOption(evt) {
    return _.includes(this.props.newValueDelimiters, evt.keyCode)
  }

  render() {
    const {
      disabled,
      loadOptions,
      options,
      isValueValid,
      className,
      async,
      multi,
      placeholder,
      valueKey,
      labelKey,
      extendedMode,
      ...otherProps
    } = this.props
    const selectClassName = cx(UtSelect.DEFAULT_CLASS_NAME, className, {
      'extended-mode': extendedMode
    })
    const SelectComponent = this.getSelectComponent()
    const arrowRenderer = !async ? this.props.arrowRenderer : null
    return (
      <SelectComponent
        {...otherProps}
        value={this.props.value}
        className={selectClassName}
        onChange={this.onChange}
        placeholder={placeholder}
        arrowRenderer={arrowRenderer}
        labelKey={labelKey}
        valueKey={valueKey}
        multi={multi}
        openOnClick={!async}
        options={options}
        optionComponent={UtSelectOption}
        newOptionCreator={this.newOptionCreator}
        menuRenderer={menuRenderer}
        disabled={disabled}
        valueComponent={utSelectValueWrapper({
          isValueValid,
          valueKey,
          labelKey
        })}
        loadOptions={loadOptions}
        isValueValid={isValueValid}
        isOptionUnique={this.isOptionUnique}
        isLoading={false}
        clearRenderer={clearRenderer}
        inputProps={{
          onPaste: this.onPaste
        }}
        ref={select => (this.select = select)}
        shouldKeyDownEventCreateNewOption={
          this.shouldKeyDownEventCreateNewOption
        }
      />
    )
  }
}

UtSelect.DEFAULT_CLASS_NAME = 'ut-select'

UtSelect.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  newValueDelimiters: PropTypes.array,
  value: PropTypes.array,
  multi: PropTypes.bool,
  async: PropTypes.bool,
  disabled: PropTypes.bool,
  creatable: PropTypes.bool,
  isLoading: PropTypes.bool,
  extendedMode: PropTypes.bool,
  createdOptionTransformer: PropTypes.func,
  arrowRenderer: PropTypes.func,
  isValueValid: PropTypes.func,
  onChange: PropTypes.func,
  loadOptions: PropTypes.func
}

UtSelect.defaultProps = {
  valueKey: 'id',
  labelKey: 'text',
  multi: false,
  value: [],
  async: false,
  creatable: false,
  disabled: false,
  isLoading: false,
  extendedMode: false,
  newValueDelimiters: [9, 13, 186, 188],
  createdOptionTransformer: val => val,
  loadOptions: () => Promise.resolve([]),
  isValueValid: () => true
}
