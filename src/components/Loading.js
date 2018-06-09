import React, {Component} from 'react';
import styles from '../css/Loading.css';

export default class Loading extends Component {
    render() {
        return (
            <div className={styles.loader} />
        );
    }
}

Loading.propTypes = {};
Loading.defaultProps = {};
