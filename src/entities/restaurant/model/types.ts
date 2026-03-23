export type Restaurant = {
  id: string;
  general_info: {
    name: string;
  };
  rating: number;
  deliveryEta?: string;
  ratingCount?: number;
  cuisine?: string;
  image?: {
    url?: string;
  };
  logo?: {
    url?: string;
  };
};
