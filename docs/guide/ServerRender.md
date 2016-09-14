### Server render - use `dispatchFetchers` and special `END` action from `redux-saga`
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
    return next(err);
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
    .catch(next);
});

```
