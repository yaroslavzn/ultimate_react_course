import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export const useCabins = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  return {
    isLoading,
    cabins: data,
    error,
  };
};
