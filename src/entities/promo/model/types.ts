export type TPromoCard = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export type TPromoApiItem = {
  id?: string | number;
  title: string;
  button_text?: string | null;
  media?: {
    id: number;
    url: string;
    type: string;
  } | null;
};
