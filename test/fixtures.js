import React from 'react';

export const App = () => (<br />);

export class Page extends React.Component {
  componentDidMount() {

  }
  render() {
    return (<br />);
  }
}

export const SideBar = () => (<br />);

export const appFetcher = () => ({ type: 'TEST_APP' });

export const pageFetcher = ({ local }) => ({ type: 'TEST_PAGE', payload: local });

export const sideBarFetcher = ({ local }) => ([
  { type: 'TEST_SIDEBAR_1' },
  { type: 'TEST_SIDEBAR_2', payload: local }
]);

export const emptyFetcher = () => {};
