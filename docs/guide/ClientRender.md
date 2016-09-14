## Client render - use `sagaFetcher` middleware for `react-router`
```js
// ./clientStart.js
import ReactDOM from 'react-dom';
import { Router, applyRouterMiddleware, browserHistory } from 'react-router';
import { createStore, applyMiddleware, Provider } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { useSagaFetcher } from 'redux-saga-fetcher';
import routes from './routes';
import rootSaga from './rootSaga';

/* ... client side initialization part */
const saga = createSagaMiddleware();

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(saga)
);

// Without `match` we don't have an access to routerProps,
// sagaFetcher middleware calls `getLocals` with routerProps
const getLocals = (routerProps) => ({
  getState: store.getState,
  params: routerProps.params
});

saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
      render={applyRouterMiddleware(
        useSagaFetcher({ dispatch: store.dispatch, getLocals })
      )}
    />
  </Provider>,
  container
);

```
