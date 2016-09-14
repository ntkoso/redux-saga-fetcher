### Wrap component with `prefetch`
```js
// ./components/Main.js
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { prefetch } from 'redux-saga-fetcher';
import userSelector from '...';

const Main = ({ user }) => (<div>{user}</div>);

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

### Use this component as route handler
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
