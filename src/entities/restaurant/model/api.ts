import { useQuery } from '@tanstack/react-query';
import { Restaurant } from './types';
import { http } from '@shared/api/http';

type RestaurantsResponse = {
  data: Restaurant[];
};

const keys = {
  root: () => ['restaurants'],
  all: () => [...keys.root(), 'all'],
};

export const useGetRestaurants = () => {
  const { data, isError, isFetching, isLoading, isSuccess, status } =
    useQuery<RestaurantsResponse>({
      queryKey: keys.all(),
      queryFn: () =>
        http<RestaurantsResponse>(
          'https://delivery-app-api.sakhdev.ru/api/vendors/filters',
        ),
    });

  return {
    data: data?.data,
    isError,
    isFetching,
    isPending: isLoading,
    isSuccess,
    status: status,
  };
};
