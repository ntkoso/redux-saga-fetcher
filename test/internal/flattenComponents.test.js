import { expect } from 'chai';
import { App, Page, SideBar } from '../fixtures';
import flattenComponents from '../../src/internal/flattenComponents';

describe('internal/flattenComponents', () => {
  it('should flatten react-router\'s components', () => {
    const components = [
      App,
      {
        page: Page,
        sidebar: SideBar
      }
    ];

    expect(flattenComponents(components)).to.have.lengthOf(3);
  });
});
