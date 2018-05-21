const ROUTES_NAMES = {
  HOME: 'HOME'
};

export default {
  [ROUTES_NAMES.HOME]: {
    path: '/',
    thunk: async (dispatch, getState) => {
      return null;
    }
  }
};
