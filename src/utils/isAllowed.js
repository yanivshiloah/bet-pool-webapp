import routesMap from '../routesMap';
import isServer from './isServer';

const fakeUser = {roles: ['admin']};
const userFromState = ({auth}) => auth === 'real' && fakeUser;
const jwt = {
    verify: jwToken => jwToken === 'real' && fakeUser
};

const isAllowed = (type, state) => {
    const role = routesMap[type] && routesMap[type].role;
    if (!role) return true;

    const user = isServer
        ? jwt.verify(state.auth, process.env.JWT_SECRET)
        : userFromState(state);

    if (!user) return false;

    return user.roles.includes(role);
};

export default isAllowed;
