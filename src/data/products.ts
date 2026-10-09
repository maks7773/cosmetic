type Product = {
  id: number;
  name: string;
  price: number;
  img: string;
}

export type propsProductCard = Pick<Product, "id" | "name" | "price" | "img">

const products: Product[] = [
    { id: 1, name: "SKIN1004 Cleansing Oil", price: 1890, img: "/1.jpg" },
    { id: 2, name: "AXIS-Y Dark Spot Correcting Glow Serum", price: 1490, img: "/2.jpg" },
    { id: 3, name: "Round Lab Dokdo Water Gel Mask", price: 350, img: "/3.jpg" },
  ];

export default products