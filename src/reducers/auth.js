import _ from 'lodash';
import Cookies from 'universal-cookie';

const INITIAL_STATE = {
    token: '',
};

const cookies = new Cookies();

export default (state = INITIAL_STATE, action = {}) => {
    switch (action.type) {
        case 'USER_LOGGED_IN': {
            cookies.set('betPool', action.payload);
            return _.assign({}, state, action.payload);
        }
        case 'USER_LOGGED_OUT': {
            cookies.remove('betPool');
            return _.assign({}, state, INITIAL_STATE);
        }
        default:
            return state;
    }
};
