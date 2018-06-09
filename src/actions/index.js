import {redirect} from 'redux-first-router';

export const verifyFacebookToken = (response) => {
    return async dispatch => {
        const res = await fetch('http://localhost:3000/api/auth/facebook', {
            method: 'post',
            body: JSON.stringify({access_token: response.accessToken, appName:'betPool'}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.ok) {
            const data = await res.json();
            dispatch({type: 'USER_LOGGED_IN', payload: data});
            dispatch(redirect({type: 'HOME'}));
        }
    }
}


export const registerWithFacebookToken = (response) => {
    return async dispatch => {
        const res = await fetch('http://localhost:3000/api/auth/register/facebook', {
            method: 'post',
            body: JSON.stringify({access_token: response.accessToken, appName:'betPool'}),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (res.ok) {
            const data = await res.json();
            dispatch({type: 'USER_LOGGED_IN', payload: data});
            dispatch(redirect({type: 'HOME'}));
        }
    }
}

export const register = (details) => {
    return async (dispatch, getState) => {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            body: JSON.stringify(details),
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
        if (res.ok) {
            dispatch(redirect({type: 'LOGIN'}));
        }
    }
}
export const loginUser = (credentials) => {
    return async (dispatch, getState) => {
        const loginResponse = await fetch('http://localhost:3000/api/auth/login',
            {
                method: 'post',
                body: JSON.stringify(credentials),
                headers: {'Content-Type': 'application/json'}
            }
        );
        const data = await loginResponse.json();
        if (loginResponse.ok) {
            dispatch({type: 'USER_LOGGED_IN', payload: data});
            dispatch(redirect({type: 'HOME'}));
        }
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        const {apiAccessToken, username} = getState().auth;
        const logoutResponse = await fetch('http://localhost:3000/api/auth/logout',
            {
                method: 'post',
                body: JSON.stringify({apiAccessToken, username}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiAccessToken}`
                }
            }
        );
        const data = await logoutResponse.json();
        if (logoutResponse.ok) {
            dispatch({type: 'USER_LOGGED_OUT'});
            dispatch(redirect({type: 'LOGIN'}));
        }
    }
}