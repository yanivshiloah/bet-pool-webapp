import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import UtSelectOption from './UtSelectOption';

const CREATE_OPTION_PREFIX = 'Create option ';

const menuRenderer = ({
  focusedOption,
  focusOption,
  inputValue,
  instancePrefix,
  onFocus,
  onOptionRef,
  onSelect,
  optionClassName,
  optionRenderer,
  options,
  removeValue,
  selectValue,
  valueArray,
  valueKey,
  labelKey
}) => {
  return _.reduce(
    options,
    (result, option, i) => {
      if (
        _.isString(option[labelKey]) &&
        option[labelKey].indexOf(CREATE_OPTION_PREFIX) === 0
      ) {
        return result;
      }
      const isSelected =
        valueArray && valueArray.some(x => x[valueKey] === option[valueKey]);
      const isFocused = option === focusedOption;
      const optionClass = cx(optionClassName, {
        'Select-option': true,
        'is-selected': isSelected,
        'is-focused': isFocused,
        'is-disabled': option.disabled
      });
      result.push(<UtSelectOption
          className={optionClass}
          focusOption={focusOption}
          inputValue={inputValue}
          instancePrefix={instancePrefix}
          isDisabled={option.disabled}
          isFocused={isFocused}
          isSelected={isSelected}
          key={`option-${i}-${option[valueKey]}`}
          onFocus={onFocus}
          onSelect={onSelect}
          option={option}
          optionIndex={i}
          ref={ref => {
            onOptionRef(ref, isFocused);
          }}
          removeValue={removeValue}
          selectValue={selectValue}
      >
          {optionRenderer(option, i, inputValue)}
                  </UtSelectOption>);
      return result;
    },
    []
  );
};

menuRenderer.propTypes = {
  focusOption: PropTypes.func,
  focusedOption: PropTypes.object,
  inputValue: PropTypes.string,
  instancePrefix: PropTypes.string,
  onFocus: PropTypes.func,
  onOptionRef: PropTypes.func,
  onSelect: PropTypes.func,
  optionClassName: PropTypes.string,
  optionComponent: PropTypes.func,
  optionRenderer: PropTypes.func,
  options: PropTypes.array,
  removeValue: PropTypes.func,
  selectValue: PropTypes.func,
  valueArray: PropTypes.array,
  valueKey: PropTypes.string
};

export default menuRenderer;
