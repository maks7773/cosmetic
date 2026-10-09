import products from "../data/products";
import ProductCard from "../ProductCard/ProductCard";
import "./Catalog.css"

function Catalog() {
  return (
    <>
      <h1 className="title">Каталог</h1>
      <div className="catalog">
        {products.map((pr) => {
          return (
            <ProductCard
              key={pr.id}
              id={pr.id}
              name={pr.name}
              price={pr.price}
              img={pr.img}
            />
          );
        })}
      </div>
    </>
  );
}

export default Catalog;
