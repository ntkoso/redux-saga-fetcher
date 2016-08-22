import { expect } from 'chai';
import iSpy from 'i-spy';
import {
  App,
  Page,
  SideBar,
  appFetcher,
  pageFetcher,
  sideBarFetcher,
  emptyFetcher
} from './fixtures';
import prefetch from '../src/prefetch';
import dispatchFetchers from '../src/dispatchFetchers';

describe('dispatchFetchers', () => {
  it('should dispatch actions', () => {
    const dispatch = iSpy.createSpy();

    const components = [
      prefetch(appFetcher)(App),
      {
        page: prefetch(pageFetcher)(Page),
        sidebar: prefetch(sideBarFetcher)(SideBar)
      }
    ];

    const locals = { local: 'TEST' };

    dispatchFetchers(dispatch, components, locals);

    expect(dispatch.calls.length).to.be.equal(4);
  });

  it('should skip dispatching if actions are empty', () => {
    const dispatch = iSpy.createSpy();

    const components = [
      prefetch(emptyFetcher)(App)
    ];

    dispatchFetchers(dispatch, components);

    expect(dispatch.calls.length).to.be.equal(0);
  });

  it('should support single component argument', () => {
    const dispatch = iSpy.createSpy();

    const component = prefetch(appFetcher)(App);

    dispatchFetchers(dispatch, component);

    expect(dispatch.calls.length).to.be.equal(1);
  });
});
