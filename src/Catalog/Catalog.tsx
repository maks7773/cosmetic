import { Search } from "lucide-react";
import products from "../data/products";
import ProductCard from "../ProductCard/ProductCard";
import "./Catalog.css"
import { useState } from "react";

type CatalogProps = {
  onBuy: (id:number) => void
}

function Catalog(props: CatalogProps) {
  
  const [ search, setSearch ] = useState<string>("");
  const [ sorting, setSorting ] = useState<string>("default")
  
  const visibleProducts = products.filter((pr) => {
    return pr.name.toLowerCase().includes(search.toLowerCase().trim())
    
  });

  if (sorting === "cheap") {
    visibleProducts.sort((a,b) => a.price - b.price)
  } else if (sorting === "expensive") {
    visibleProducts.sort((a,b) => b.price - a.price)
  }

  return (
    <>
      <h1 className="title">Каталог</h1>

      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={18} strokeWidth={1.8} aria-hidden="true" />
          <input type="search" placeholder="Найти товар…" aria-label="Поиск по каталогу" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>

        <select className="catalog-sort" aria-label="Сортировка" value={sorting} onChange={(e) => setSorting(e.target.value)}>
          <option value="default">По умолчанию</option>
          <option value="cheap">Сначала дешевле</option>
          <option value="expensive">Сначала дороже</option>
        </select>
      </div>

      {visibleProducts.length === 0 && <p className="catalog-empty">Ничего не нашлось. Попробуйте другой запрос</p> }
      

      <div className="catalog">
        {visibleProducts.map((pr) => {
          return (
            <ProductCard
              key={pr.id}
              id={pr.id}
              name={pr.name}
              price={pr.price}
              img={pr.img}
              onBuy={props.onBuy}
            />
          );
        })}
      </div>
    </>
  );
}

export default Catalog;
