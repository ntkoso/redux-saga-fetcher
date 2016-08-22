# redux-saga-fetcher [![npm](https://img.shields.io/npm/v/redux-saga-fetcher.svg?style=flat-square)](https://www.npmjs.com/package/redux-saga-fetcher)

redux-saga-fetcher is an universal data fetching library for [Redux Saga](https://github.com/yelouafi/redux-saga) and [React Router](https://github.com/reactjs/react-router).

### Installation

```shell
$ npm i -S react react-router redux redux-saga
$ npm i -S redux-saga-fetcher
```

## API

### `prefetch`
pure HoC, takes locals returns actions.

### `dispatchFetchers`
collects actions from `prefetch` containers and dispatches them.

### `useSagaFetcher`
middleware for react-router, used for client side fetching.

## Usage example

### Wrap route components with `prefetch`
```js
// ./components/Main.js
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { prefetch } from 'redux-saga-fetcher';
import userSelector from '...';

const Main = ({ user }) => <div>{user}</div>

const container = compose(
  // prefetch container should always be on top
  prefetch(({ getState, params: { id } } /* locals */) => {
    // if needs fetching
    if (!getState().users[id]) {
      // can return array of actions. e.g. [fetchUser(id), fetchUserComments(id)]
      return { type: 'FETCH_USER', payload: id };
    }
  }),
  connect(userSelector)
);

export default container(Main);
```
```js
// ./routes.js
import { Route, IndexRoute } from 'react-router';
import { App, Main } from './components';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Main} />
  </Route>
);

```

### Write fetch saga
```js
// ./sagas/fetchUser.js
import { call, put } from 'redux-saga/effects';
import { fetchUserRequest, fetchUserSuccess, fetchUserFailure } from '../actions';

export default function *fetchUser(action) {
  yield put(fetchUserRequest());

  try {
    const result = yield call(fetch, action.payload);
    yield put(fetchUserSuccess(result));
  } catch (err) {
    yield put(fetchUserFailure(err));
  }
}

```
```js
// ./rootSaga.js
import { takeEvery } from 'redux-saga';
import fetchUser from './sagas/fetchUser';

export default function* rootSaga() {
  yield* takeEvery('FETCH_USER', fetchUser)
}
```

### Server side - use `dispatchFetchers` and special `END` action from `redux-saga`
```js
// ./serverMiddleware.js
import { match } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';  
import { dispatchFetchers } from 'redux-saga-fetcher';
import reducer from '...';
import routes from './routes';
import rootSaga from './rootSaga';

/* ... server middleware part */
match({ location, routes }, (err, redirectLocation, routerProps) => {
  if (err) {
    return next(err)
  }

  const saga = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(saga)
  );

  const sagaPromise = saga.run(rootSaga).done;

  // could be a function, e.g. (component) => ({ name: component.name })
  const locals = {
    getState: store.getState,
    params: routerProps.params
  };

  // collects and dispatches actions for every component wrapped with `prefetch`
  dispatchFetchers(
    store.dispatch,
    routerProps.components,
    locals
  );

  store.dispatch(END); // Stops saga loops

  sagaPromise // resolves when all sagas are finished
    .then(/* typical rendering code... */)
    .catch(next)
});

```

## Client side - Use `sagaFetcher` middleware for `react-router`
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
)

```
