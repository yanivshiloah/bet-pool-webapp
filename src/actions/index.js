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
        }
    }
}