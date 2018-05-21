/* eslint-disable consistent-return */
import React from 'react';
import ReactDOM from 'react-dom/server';
import {Provider} from 'react-redux';
import {flushChunkNames} from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import configureStore from './configureStore';
import App from '../src/components/App';

export default ({clientStats}) => async (req, res) => {
    const store = await configureStore(req, res);
    if (!store) return; // no store means redirect was already served
    const app = createApp(App, store);
    const appString = ReactDOM.renderToString(app);
    const stateJson = JSON.stringify(store.getState());
    const chunkNames = flushChunkNames();
    const {js, styles, cssHash} = flushChunks(clientStats, {chunkNames});
    res.send(`<!doctype html>
      <html>
        <head>        
          <title>Supply Dashboard</title>
          ${styles}
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css" />
          <style>
            #root {
                width: 100%;
                height: 100%;
            }  
        </style>
        </head>
        <body>
          <script>window.REDUX_STATE = ${stateJson}</script>
          <div id="root">${appString}</div>
          ${cssHash}
          <script type='text/javascript' src='/static/vendor.js'></script>
          ${js}
        </body>
      </html>`);
};

const createApp = (App, store) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};
