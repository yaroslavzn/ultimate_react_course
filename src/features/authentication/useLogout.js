import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logOut as logOutApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logOut, isPending } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.resetQueries();
      navigate('/login', { replace: true });
    },
  });

  return {
    logOut,
    isLoading: isPending,
  };
};
