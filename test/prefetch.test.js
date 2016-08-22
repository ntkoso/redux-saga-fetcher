import { expect } from 'chai';
import { App, fetcherSingleAction } from './fixtures';
import propName from '../src/internal/propName';
import prefetch from '../src/prefetch';

describe('prefetch', () => {
  it(`should append static property ${propName} to component`, () => expect(
    prefetch(fetcherSingleAction)(App)
  ).to.have.property(propName, fetcherSingleAction));
});
