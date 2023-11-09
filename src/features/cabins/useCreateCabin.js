import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin was successfully created');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
  });

  return {
    createCabin: mutate,
    isCreating: isPending,
  };
};
