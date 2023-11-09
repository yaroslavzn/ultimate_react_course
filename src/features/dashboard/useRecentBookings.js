import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getBookingsAfterDate } from '../../services/apiBookings';

export const useRecentBookings = () => {
  const [searchParams] = useSearchParams();
  const selectedLastDaysFilter = !searchParams.get('last')
    ? 7
    : parseInt(searchParams.get('last'));
  const queryDate = subDays(new Date(), selectedLastDaysFilter).toISOString();

  const { data: bookings, isPending: isLoading } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ['bookings', `last-${selectedLastDaysFilter}`],
  });

  return {
    bookings,
    isLoading,
  };
};
