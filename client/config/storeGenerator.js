import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers/index';

const reduxDevToolsEnchancer = window.__REDUX_DEVTOOLS_EXTENSION__ && // eslint-disable-line
  window.__REDUX_DEVTOOLS_EXTENSION__(); // eslint-disable-line
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default createStoreWithMiddleware(reducers, reduxDevToolsEnchancer);
client
webpack
  .babelrc
  .eslintrc.js
  .gitignore
package.json
README.md
yarn.lockclient
webpack
  .babelrc
  .eslintrc.js
  .gitignore
package.json
README.md
yarn.lock