import flattenComponents from './internal/flattenComponents';
import collectActions from './internal/collectActions';

const dispatchFetchers = (dispatch, components, locals) => {
  const arrayOfComponents = Array.isArray(components) ? components : [components];
  const flattenedComponents = flattenComponents(arrayOfComponents);
  const actions = collectActions(flattenedComponents, locals);

  if (typeof dispatch === 'function' && actions.length > 0) {
    actions.forEach(dispatch);
  }
};

export default dispatchFetchers;
