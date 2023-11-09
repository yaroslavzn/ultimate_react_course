import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export const useUpdateSetting = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success('Setting was successfully updated');
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      });
    },
  });

  return {
    updateSetting: mutate,
    isUpdating: isPending,
  };
};
