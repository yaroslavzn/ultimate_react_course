import { useQuery } from '@tanstack/react-query';
import { getBooking } from '../../services/apiBookings';

export const useBooking = (id) => {
  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBooking(id),
  });

  return {
    booking,
    isLoading,
  };
};
