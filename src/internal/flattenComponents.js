import isPlainObject from 'lodash.isplainobject';
import values from 'lodash.values';

const flattenComponents = (components) => components.reduce(
  (acc, component) => (isPlainObject(component) ?
                       acc.concat(values(component)) :
                       acc.concat(component)),
  []
);

export default flattenComponents;
