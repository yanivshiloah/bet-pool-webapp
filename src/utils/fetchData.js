import {redirect} from 'redux-first-router';

const getAuthHeader = (token) => {
    if (token) {
        return {'Authorization': `Bearer ${token}`};
    } else {
        return {};
    }
}

const fetchData = async (path, getState, dispatch) => {
    const {apiAccessToken, userId} = getState().auth;
    const res = await fetch(`http://localhost:3000/api/${userId}/${path}`, {
        headers: {
            ...getAuthHeader(apiAccessToken),
            Accept: 'application/json',
        }
    });
    if (res.status === 401) {
        dispatch({type: 'USER_LOGGED_OUT'});
        dispatch(redirect({type: 'LOGIN'}));
        return null;
    }
    const data = await res.json();
    return data;
};

export default fetchData;
