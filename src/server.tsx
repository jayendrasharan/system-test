import express from 'express'
import inline from 'glamor/inline'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import createStore from './store/create-store'
import { Tasks } from './tasks'

let assets: any;
const store = createStore()
const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const context = {};
    const element = (
      <StaticRouter context={context} location={req.url}>
        <Provider store={store}>
          <Tasks />
        </Provider>
      </StaticRouter>
    )
    const html = inline(renderToString(element))
    res.send(
      `<!doctype html>
    <html lang=''>
    <head>
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta charSet='utf-8' />
        <title>Razzle TypeScript</title>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        ${
          assets.client.css
            ? `<link rel='stylesheet' href='${assets.client.css}'>`
            : ''
        }
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src='${assets.client.js}' defer></script>`
              : `<script src='${assets.client.js}' defer crossorigin></script>`
          }
    </head>
    <body>
        <div id='root'>${html}</div>
    </body>
</html>`
    );
  });

export default server;
