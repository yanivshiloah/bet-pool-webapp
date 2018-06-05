const ROUTES_NAMES = {
    HOME: 'HOME',
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER'
};

export default {
    [ROUTES_NAMES.HOME]: {
        path: '/',
        thunk: async (dispatch, getState) => {
            return null;
        }
    },
    [ROUTES_NAMES.REGISTER]: {
        path: '/register',
        thunk: async (dispatch, getState) => {
            return null;
        }
    },
    [ROUTES_NAMES.LOGIN]: {
        path: '/login',
        thunk: async (dispatch, getState) => {
            return null;
        }
    }
};
