const fetchData = (path, state, dispatch) => {
  return fetch(`api/${path}`, {
    headers: {
      Accept: 'application/json',
    }
  }).then(res => {
    return res.json();
  });
};

export default fetchData;
