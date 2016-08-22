import React, { PropTypes } from 'react';
import dispatchFetchers from '../dispatchFetchers';

class ReduxSagaFetcherContext extends React.Component {
  componentDidUpdate(prevProps) {
    const { routerProps } = this.props;
    const prevRouterProps = prevProps.routerProps;

    if (routerProps.location === prevRouterProps.location) {
      return;
    }

    this.triggerDispatch(this.props);
  }

  triggerDispatch({ dispatch, routerProps, locals }) {
    if (typeof dispatch !== 'function') {
      return;
    }

    dispatchFetchers(dispatch, routerProps.components, locals);
  }

  render() {
    return this.props.children;
  }
}

ReduxSagaFetcherContext.propTypes = {
  routerProps: PropTypes.isRequired,
  locals: PropTypes.object,
  dispath: PropTypes.func,
  children: PropTypes.element.isRequired
};

export default ReduxSagaFetcherContext;
