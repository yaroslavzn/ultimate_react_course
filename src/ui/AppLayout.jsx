import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import styled from 'styled-components';

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 2rem 2rem;
`;

const StyledLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  width: 100%;
  max-width: 140rem;
  margin: 0 auto;
`;

const AppLayout = () => {
  return (
    <StyledLayout>
      <Header />
      <Sidebar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
};

export default AppLayout;
