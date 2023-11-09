import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (credentials) => loginApi(credentials),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(['user'], { user });
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error(error);
      toast.error('Your email or password is incorrect');
    },
  });

  return {
    login,
    isLoading: isPending,
  };
};
