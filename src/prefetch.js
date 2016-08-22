import propName from './internal/propName';

const prefetch = (fetcher) => (BaseComponent) => {
  const component = BaseComponent;

  component[propName] = fetcher;

  return component;
};

export default prefetch;
