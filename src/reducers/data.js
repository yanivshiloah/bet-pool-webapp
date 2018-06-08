import _ from 'lodash';
export default (state = {pools: []}, action = {}) => {
    switch (action.type) {
        case 'POOLS_RECEIVED': {
            return _.assign({}, state, {pools: state.pools.concat(action.payload.pools)});
        }
        default:
            return state;
    }
};
