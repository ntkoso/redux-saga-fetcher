import React, { PropTypes } from 'react';
import dispatchFetchers from '../dispatchFetchers';

class ReduxSagaFetcherContext extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { routerProps } = this.props;
    const nextRouterProps = nextProps.routerProps;

    if (routerProps.location === nextRouterProps.location) {
      return;
    }

    this.triggerDispatch(nextProps);
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
  routerProps: PropTypes.object.isRequired,
  locals: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  dispath: PropTypes.func,
  children: PropTypes.element.isRequired
};

export default ReduxSagaFetcherContext;
