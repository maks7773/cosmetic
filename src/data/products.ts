export type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
}

export type CartItem = {
  id: number;
  quantity: number;
}

export type propsProductCard = Pick<Product, "id" | "name" | "price" | "img"> & {
  onBuy: (id: number) => void
  onFav: (id: number) => void
  isFav: boolean
}

