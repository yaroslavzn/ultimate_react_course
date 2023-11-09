import { useQuery } from '@tanstack/react-query';
import { subDays } from 'date-fns';
import { useSearchParams } from 'react-router-dom';
import { getStaysAfterDate } from '../../services/apiBookings';

export const useRecentStays = () => {
  const [searchParams] = useSearchParams();
  const selectedLastDaysFilter = !searchParams.get('last')
    ? 7
    : parseInt(searchParams.get('last'));
  const queryDate = subDays(new Date(), selectedLastDaysFilter).toISOString();

  const { data: stays, isPending: isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ['stays', `last-${selectedLastDaysFilter}`],
  });

  const confirmedStays = stays?.filter(
    ({ status }) => status === 'checked-in' || status === 'checked-out'
  );

  return {
    confirmedStays,
    isLoading,
    numDays: selectedLastDaysFilter,
  };
};
