export default (state = {}, action = {}) => {
    switch (action.type) {
        case 'FATAL_ERROR_OCCURRED': {
            return action.payload.err;
        }
        default: {
            return state;
        }
    }
};
