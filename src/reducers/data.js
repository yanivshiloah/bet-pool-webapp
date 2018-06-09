import _ from 'lodash';

const INITIAL_STATE = {pools: [], bets: {}};

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case 'CLEAR_DATA': {
            return _.assign({}, state, INITIAL_STATE);
        }
        case 'POOLS_RECEIVED': {
            return _.assign({}, state, {pools: action.payload.pools});
        }
        case 'BETS_RECEIVED': {
            const newBets = _.assign({}, state.bets, {[action.payload.poolId]: action.payload.bets});
            return _.assign({}, state, {bets: newBets});
        }
        default:
            return state;
    }
};
