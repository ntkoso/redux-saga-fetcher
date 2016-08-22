import { expect } from 'chai';
import {
  App,
  Page,
  SideBar,
  appFetcher,
  pageFetcher,
  sideBarFetcher,
  emptyFetcher
} from '../fixtures';
import prefetch from '../../src/prefetch';
import collectActions from '../../src/internal/collectActions';

describe('internal/collectActions', () => {
  it('should collect actions', () => {
    const components = [
      prefetch(appFetcher)(App),
      prefetch(pageFetcher)(Page)
    ];

    const result = collectActions(components);

    expect(result[0]).to.be.eql({ type: 'TEST_APP' });
    expect(result[1]).to.be.eql({ type: 'TEST_PAGE', payload: undefined });
  });

  it('should skip empty actions', () => {
    const components = [
      prefetch(appFetcher)(App),
      prefetch(emptyFetcher)(Page)
    ];

    const result = collectActions(components);

    expect(result).to.be.lengthOf(1);
  });

  it('should flatten arrays of actions', () => {
    const components = [
      prefetch(appFetcher)(App),
      prefetch(sideBarFetcher)(SideBar)
    ];

    const result = collectActions(components);

    expect(result[1]).to.be.eql({ type: 'TEST_SIDEBAR_1' });
    expect(result[2]).to.be.eql({ type: 'TEST_SIDEBAR_2', payload: undefined });
  });

  it('should support plain object locals', () => {
    const components = [
      prefetch(pageFetcher)(Page)
    ];

    const result = collectActions(components, { local: 'PAYLOAD' });

    expect(result[0]).to.be.eql({ type: 'TEST_PAGE', payload: 'PAYLOAD' });
  });

  it('should support function locals', () => {
    const components = [
      prefetch(pageFetcher)(Page)
    ];

    const result = collectActions(components, ({ name }) => ({ local: name }));

    expect(result[0]).to.be.eql({ type: 'TEST_PAGE', payload: Page.name });
  });
});
