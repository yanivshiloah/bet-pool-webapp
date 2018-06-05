import React from 'react';
import {connect} from 'react-redux';
import Error from './Error';
import Switcher from './Switcher';
import styles from '../css/App.css';

const App = ({error}) => {
    if (error.size) {
        return <Error />;
    }
    return <div className={styles.app}><Switcher /></div>;
};

const mapState = ({page, direction, error}) => ({
    page,
    direction,
    error
});

export default connect(mapState)(App);
