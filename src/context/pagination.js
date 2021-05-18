import React, { useState } from 'react';

export const PageContext = React.createContext();

const PageProvider = (props) => {
  const [display, setDisplay] = useState(false);
  const [itemCount, setItemCount] = useState(3);
  const [sortField, setSortField] = useState('difficulty');
  const [startingPage, setStartingPage] = useState(1);

  const state = {
    display,
    itemCount,
    sortField,
    startingPage,
    setDisplay,
    setItemCount,
    setSortField,
    setStartingPage,
  };
  return (
    <PageContext.Provider value={state}>{props.children}</PageContext.Provider>
  );
};

export default PageProvider;
