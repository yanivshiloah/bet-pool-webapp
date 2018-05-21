import React from 'react';
import Select from 'react-select';

export default class BaseSelect extends Select {
  constructor(props) {
    super(props);
    this.renderMenu = this.renderMenu.bind(this);
  }

  renderMenu(options, valueArray, focusedOption) {
    if (options && options.length) {
      return this.props.menuRenderer({
        focusedOption,
        focusOption: this.focusOption,
        inputValue: this.state.inputValue,
        instancePrefix: this._instancePrefix,
        labelKey: this.props.labelKey,
        onFocus: this.focusOption,
        onOptionRef: this.onOptionRef,
        onSelect: this.selectValue,
        optionClassName: this.props.optionClassName,
        optionComponent: this.props.optionComponent,
        optionRenderer: this.props.optionRenderer || this.getOptionLabel,
        options,
        removeValue: this.removeValue,
        selectValue: this.selectValue,
        valueArray,
        valueKey: this.props.valueKey,
        async: this.props.async
      });
    } else if (!this.props.async && this.props.noResultsText) {
      return (
        <div className="Select-noresults">
          {this.props.noResultsText}
        </div>
      );
    }
    return null;
  }
}

BaseSelect.propTypes = {};
BaseSelect.defaultProps = {};
