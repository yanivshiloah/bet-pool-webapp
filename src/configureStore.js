import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension/logOnlyInProduction';
import {connectRoutes} from 'redux-first-router';
import {loadingBarMiddleware, loadingBarReducer} from 'react-redux-loading-bar';
import reduxThunk from 'redux-thunk';
import routesMap from './routesMap';
import options from './options';
import * as reducers from './reducers';
import * as actionCreators from './actions';

export default (history, preLoadedState) => {
    const {
        reducer, middleware, enhancer, thunk
    } = connectRoutes(
        history,
        routesMap,
        options
    );
    const rootReducer = combineReducers({
        ...reducers,
        loadingBar: loadingBarReducer,
        location: reducer
    });
    const middlewares = applyMiddleware(middleware, reduxThunk, loadingBarMiddleware());
    const enhancers = composeEnhancers(enhancer, middlewares);
    const store = createStore(rootReducer, preLoadedState, enhancers);
    if (module.hot && process.env.NODE_ENV === 'development') {
        module.hot.accept('./reducers/index', () => {
            // eslint-disable-next-line global-require
            const reducersForDev = require('./reducers/index');
            const rootReducerForDev = combineReducers({
                ...reducersForDev,
                location: reducer
            });
            store.replaceReducer(rootReducerForDev);
        });
    }
    return {store, thunk};
};

const composeEnhancers = (...args) =>
    typeof window !== 'undefined'
        ? composeWithDevTools({actionCreators})(...args)
        : compose(...args);
