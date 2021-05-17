import React from 'react';

import ToDo from './components/todo/todo-connected.js';

export default class App extends React.Component {
  render() {
    return (
      <>
        <ToDo />
      </>
    );
  }
}
