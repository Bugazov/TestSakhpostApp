import { useQuery } from '@tanstack/react-query';
import { TPromoApiItem, TPromoCard } from './types';
import { http } from '@shared/api/http';

type TPromosResponse = TPromoApiItem[] | { data: TPromoApiItem[] };

const keys = {
  root: () => ['promo'],
  all: () => [...keys.root(), 'all'],
};

export const useGetPromos = () => {
  const { data, isError, isFetching, isLoading, isSuccess, status } = useQuery<
    TPromosResponse,
    Error,
    TPromoCard[]
  >({
    queryKey: keys.all(),
    queryFn: () =>
      http<TPromosResponse>(
        'https://delivery-app-api.sakhdev.ru/api/customer/ads/hero-banners',
      ),
    select: response => {
      const source = Array.isArray(response) ? response : response.data ?? [];

      return source
        .filter(item => Boolean(item?.media?.url))
        .map((item, index) => ({
          id: String(item.id ?? item.media?.id ?? index),
          title: item.title,
          subtitle: item.button_text ?? '',
          imageUrl: item.media?.url ?? '',
        }));
    },
  });

  return {
    data,
    isError,
    isFetching,
    isPending: isLoading,
    isSuccess,
    status,
  };
};
