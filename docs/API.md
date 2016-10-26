### `prefetch` container
Wrapper that adds `fetcher` function to react component as static property

```js
type FetcherFn = (locals: Object) => Array<Action> | Action | void;
type PrefetchFn = (fetcher: FetcherFn) => (component: ReactComponent) => ReactComponent;
```

### `dispatchFetchers`
Collects results (redux actions) of `fetcher` functions from wrapped route handlers.
Then dispatches this actions.

```js
type DispatchFetchersFn = (
  // redux `store.dispatch`
  dispatch: (action: Action) => any,
  // react-router route handler components from `routerProps.components`
  components: Array<ReactComponent | { [key: string]: ReactComponent }>,
  // locals can be used to give some data to `fetcher` functions
  locals: Object | (component: ReactComponent) => Object
) => void;
```

### `useSagaFetcher` middleware for react-router 2.x/3.x

React router v2.x/3.x middleware.
Used for client side rendering.
Initiates fetches when location has changed.

```js
type Params = {
  dispatch: (action: Action) => any,
  getLocals: (routerProps: Object) => Object
}

type UseSagaFetcherFn = (params: Params) => ReactRouterMiddleware;
```
