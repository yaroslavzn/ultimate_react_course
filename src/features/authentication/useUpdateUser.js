import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUser as updateUserApi } from '../../services/apiAuth';

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      toast.success('User information was successfully update');
    },
    onError: (error) => toast.error(error),
  });

  return {
    updateUser,
    isUpdating,
  };
};
