import { useMutation } from '@tanstack/react-query';
import { createUser as createUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useCreateUser = () => {
  const { mutate: createUser, isPending: isLoading } = useMutation({
    mutationFn: createUserApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
    },
  });

  return {
    createUser,
    isLoading,
  };
};
