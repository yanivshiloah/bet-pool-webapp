const getAuthHeader = (token) => {
    if (token) {
        return {'Authorization': 'Bearer ' + token};
    } else {
        return {};
    }
}

const fetchData = async (path, getState) => {
    const {apiAccessToken, userId} = getState().auth;
    const res = await fetch(`http://localhost:3000/api/${userId}/${path}`, {
        headers: {
            ...getAuthHeader(apiAccessToken),
            Accept: 'application/json',
        }
    });
    const data = await res.json();
    return data;
};

export default fetchData;
