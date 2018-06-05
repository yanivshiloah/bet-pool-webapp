import React from 'react';
import {connect} from 'react-redux';
import universal from 'react-universal-component';
import Loading from './Loading';
import Err from './Error';

const UniversalComponent = universal(({page}) => import(`./${page}`), {
    minDelay: 100,
    loading: Loading,
    error: Err
});

const Switcher = ({page}) => {
    return <UniversalComponent page={page} isLoading={false} />;
};

const mapState = ({page, direction}) => ({
    page,
    direction
});

export default connect(mapState)(Switcher);
