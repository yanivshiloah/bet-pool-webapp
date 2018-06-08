import {fetchData} from './utils';

const ROUTES_NAMES = {
    HOME: 'HOME',
    LOGIN: 'LOGIN',
    POOL: 'POOL',
    REGISTER: 'REGISTER'
};

export default {
    [ROUTES_NAMES.HOME]: {
        path: '/',
        thunk: async (dispatch, getState) => {
            const pools = await fetchData('pools', getState);
            dispatch({type: 'POOLS_RECEIVED', payload: {pools}});
        }
    },
    [ROUTES_NAMES.POOL]: {
        path: '/pools/:poolId',
        thunk: async (dispatch, getState) => {
            const {poolId} = getState().location.payload;
            const bets = await fetchData(`pools/${poolId}/bets`, getState);
            console.log(bets);
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
