import React, { useContext } from 'react';
import { LoginContext } from '../../context/auth.js';
import { If, Then } from 'react-if';

const Acl = ({ capability, children }) => {
  const context = useContext(LoginContext);
  let okToRender = false;
  try {
    okToRender =
      context.loggedIn && capability
        ? context.user.capabilities.includes(capability)
        : false;
  } catch (error) {
    console.warn('NOT AUTHORIZED', error.message);
  }
  return (
    <If condition={okToRender}>
      <Then>
        <div>{children}</div>
      </Then>
    </If>
  );
};
export default Acl;
