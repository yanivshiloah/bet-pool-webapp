import React, {Component} from 'react';
import {Icon} from 'semantic-ui-react';
import textProvider from '../texts';
import styles from '../css/Error';

export default class Error extends Component {
  render() {
    return (
      <div className={styles.error}>
        <div className={styles['error-icon']}>
          <Icon name="bug" circular size="massive" />
          <div>{textProvider.getText('error', 'message')}</div>
        </div>
      </div>
    );
  }
}

Error.propTypes = {};
Error.defaultProps = {};
