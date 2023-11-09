import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBooking as deleteBookingApi } from '../../services/apiBookings';
import toast from 'react-hot-toast';

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: (data) => {
      toast.success('Booking was successfully deleted');
      queryClient.invalidateQueries({
        queryKey: ['bookings'],
      });
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteBooking, isDeleting };
};
