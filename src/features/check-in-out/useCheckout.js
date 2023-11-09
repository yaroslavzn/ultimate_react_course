import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBooking } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (id) => updateBooking(id, { status: 'checked-out' }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} successfully checked out`);
    },
    onError: () => toast.error('There was an error while checking in'),
  });

  return {
    checkout,
    isCheckingOut,
  };
};
