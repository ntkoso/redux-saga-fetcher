import flatten from 'lodash.flatten';
import propName from './propName';

const collectActions = (components, locals = {}) => {
  const actions = components.filter((component) => typeof component[propName] === 'function')
                   .map((component) => {
                     const fetcher = component[propName];
                     const currentLocals = typeof locals === 'function' ?
                                           locals(component) :
                                           locals;

                     return fetcher(currentLocals);
                   })
                   .filter((actns) => actns);

  return flatten(actions);
};

export default collectActions;
