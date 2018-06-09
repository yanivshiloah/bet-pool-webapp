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
        protected: true,
        thunk: async (dispatch, getState) => {
            const pools = await fetchData('pools', getState, dispatch);
            dispatch({type: 'POOLS_RECEIVED', payload: {pools}});
        }
    },
    [ROUTES_NAMES.POOL]: {
        path: '/pools/:poolId',
        protected: true,
        thunk: async (dispatch, getState) => {
            const {poolId} = getState().location.payload;
            const bets = await fetchData(`pools/${poolId}/bets`, getState, dispatch);
            dispatch({type: 'BETS_RECEIVED', payload: {bets, poolId}});
            console.log(bets);
        }
    },
    [ROUTES_NAMES.REGISTER]: {
        path: '/register',
        thunk: async (dispatch, getState) => {
            dispatch({type: 'CLEAR_DATA'});
        }
    },
    [ROUTES_NAMES.LOGIN]: {
        path: '/login',
        thunk: async (dispatch, getState) => {
            dispatch({type: 'CLEAR_DATA'});
        }
    }
};
