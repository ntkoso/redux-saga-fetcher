import React from 'react';
import ReduxSagaFetcherContext from './internal/ReduxSagaFetcherContext';

const useSagaFetcher = ({ dispatch, getLocals }) => ({
  renderRouterContext: (children, props) => (
    <ReduxSagaFetcherContext
      dispatch={dispatch}
      locals={getLocals(props)}
      routerProps={props}
    >
      {children}
    </ReduxSagaFetcherContext>
  )
});

export default useSagaFetcher;
