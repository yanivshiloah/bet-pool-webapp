import React from 'react';
import {connect} from 'react-redux';
import Error from './Error';
import Switcher from './Switcher';

const App = ({error}) => {
    if (error.size) {
        return <Error />;
    }
    return <Switcher />;
};

const mapState = ({page, direction, error}) => ({
    page,
    direction,
    error
});

export default connect(mapState)(App);
