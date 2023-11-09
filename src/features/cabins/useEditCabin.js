import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export const useEditCabin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ id, data }) => updateCabin(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('Cabin was successfully updated');
    },
  });

  return {
    editCabin: mutate,
    isEditing: isPending,
  };
};
