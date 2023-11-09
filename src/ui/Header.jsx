import React from 'react';
import styled from 'styled-components';
import Logout from '../features/authentication/Logout';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
  padding: 2rem;
  border-bottom: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 2.4rem;
`;

const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
