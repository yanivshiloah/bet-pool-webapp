import React, {Component} from 'react';
import styles from '../css/Loading';

export default class Loading extends Component {
  render() {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader} />
      </div>
    );
  }
}

Loading.propTypes = {};
Loading.defaultProps = {};
