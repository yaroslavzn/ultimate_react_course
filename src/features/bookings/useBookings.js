import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_COUNT_PER_PAGE } from '../../utils/constants';

export const useBookings = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const hasStatusFilter =
    Boolean(searchParams.get('status')) && searchParams.get('status') !== 'all';
  const sortByData = searchParams.get('sortBy') || 'startDate-desc';
  const page = parseInt(searchParams.get('page')) || 1;
  let statusFilter;
  let sortBy;

  if (hasStatusFilter) {
    statusFilter = {
      field: 'status',
      value: searchParams.get('status'),
    };
  }

  if (sortByData) {
    const [fieldName, direction] = sortByData.split('-');
    sortBy = {
      fieldName,
      direction,
    };
  }

  const { data: { bookings, count } = {}, isLoading } = useQuery({
    queryKey: ['bookings', statusFilter, sortBy, page],
    queryFn: () => getBookings(statusFilter, sortBy, page),
  });

  if (count) {
    const pagesCount = Math.ceil(count / DEFAULT_COUNT_PER_PAGE);
    const isLastPage = page === pagesCount;

    if (!isLastPage) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', statusFilter, sortBy, page + 1],
        queryFn: () => getBookings(statusFilter, sortBy, page + 1),
      });
    }

    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ['bookings', statusFilter, sortBy, page - 1],
        queryFn: () => getBookings(statusFilter, sortBy, page - 1),
      });
    }
  }

  return {
    bookings,
    isLoading,
    count,
  };
};
