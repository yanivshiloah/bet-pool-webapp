import {NOT_FOUND} from 'redux-first-router';

export default (state = 'HOME', action = {}) => components[action.type] || state;

const components = {
    HOME: 'Home',
    REGISTER: 'Register',
    POOL: 'Pool',
    LOGIN: 'Login',
    [NOT_FOUND]: 'NotFound'
};