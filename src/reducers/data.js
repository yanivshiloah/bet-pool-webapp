import _ from 'lodash';
export default (state = {pools: [], bets: {}}, action = {}) => {
    switch (action.type) {
        case 'POOLS_RECEIVED': {
            return _.assign({}, state, {pools: state.pools.concat(action.payload.pools)});
        }
        case 'BETS_RECEIVED': {
            const newBets = _.assign({}, state.bets, {[action.payload.poolId]: action.payload.bets});
            return _.assign({}, state, {bets: newBets});
        }
        default:
            return state;
    }
};
