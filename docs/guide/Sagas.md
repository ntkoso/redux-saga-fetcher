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


### Use it in root saga
```js
// ./rootSaga.js
import { takeEvery } from 'redux-saga';
import fetchUser from './sagas/fetchUser';

export default function* rootSaga() {
  yield* takeEvery('FETCH_USER', fetchUser);
}
```
