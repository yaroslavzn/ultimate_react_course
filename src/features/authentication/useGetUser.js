import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../services/apiAuth';

export const useGetUser = () => {
  const { data, isPending } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
  });

  const { user } = data || {};

  return {
    user,
    isLoading: isPending,
    isAuthenticated: user?.role === 'authenticated',
  };
};
