import createHistory from 'history/createMemoryHistory';
import {NOT_FOUND} from 'redux-first-router';
import configureStore from '../src/configureStore';

export default async (req, res) => {
    const preLoadedState = {
        auth: JSON.parse(req.cookies.betPool)
    };
    const history = createHistory({initialEntries: [req.originalUrl]});
    const {store, thunk} = configureStore(history, preLoadedState);
    const {location} = store.getState();
    if (doesRedirect(location, res)) return false;
    await thunk(store);
    const {location: newLocation} = store.getState();
    if (doesRedirect(newLocation, res)) return false;
    const status = newLocation.type === NOT_FOUND ? 404 : 200;
    res.status(status);
    return store;
};

const doesRedirect = ({kind, pathname}, res) => {
    if (kind !== 'redirect') {
        return false;
    }
    res.redirect(302, pathname);
    return true;
};
