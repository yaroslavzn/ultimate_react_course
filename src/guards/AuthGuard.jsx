import styled from 'styled-components';
import { useGetUser } from '../features/authentication/useGetUser';
import Spinner from '../ui/Spinner';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FullPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

export const AuthGuard = ({ children }) => {
  const { isAuthenticated, isLoading } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading && !isAuthenticated) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) {
    return children;
  }
};
