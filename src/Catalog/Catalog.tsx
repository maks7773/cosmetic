import { CircleAlert, Heart, Loader2, Search } from "lucide-react";
import  { type Product } from "../data/products";
import ProductCard from "../ProductCard/ProductCard";
import "./Catalog.css"
import { useState } from "react";

type CatalogProps = {
  onBuy: (id:number) => void
  products: Product[]
  isLoading: boolean
  isError: boolean
  onFav: (id:number) => void
  favCart: number[]
  
}

function Catalog(props: CatalogProps) {
  const products = props.products
  const isLoading = props.isLoading
  const isError = props.isError
  const [ search, setSearch ] = useState<string>("");
  const [ sorting, setSorting ] = useState<string>("default")
  const [ isFavOn, setIsFavOn ] = useState<boolean>(false)

  
  let visibleProducts = products.filter((pr) => {
    return pr.name.toLowerCase().includes(search.toLowerCase().trim())
    
  });

  if (isFavOn) {
    visibleProducts = visibleProducts.filter((pr) => props.favCart.includes(pr.id))
  }

  

  if (sorting === "cheap") {
    visibleProducts.sort((a,b) => a.price - b.price)
  } else if (sorting === "expensive") {
    visibleProducts.sort((a,b) => b.price - a.price)
  } 

  

  if (isLoading) {
    return (
      <section id="catalog">
        <h1 className="title">Каталог</h1>
        <div className="catalog-status">
          <Loader2 size={32} strokeWidth={1.6} className="catalog-spinner" aria-hidden="true" />
          <p>Загружаем товары…</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="catalog">
        <h1 className="title">Каталог</h1>
        <div className="catalog-status catalog-status-error">
          <CircleAlert size={32} strokeWidth={1.6} aria-hidden="true" />
          <p>Не удалось загрузить товары. Попробуйте обновить страницу.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="catalog">
      <h1 className="title">Каталог</h1>

      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={18} strokeWidth={1.8} aria-hidden="true" />
          <input type="search" placeholder="Найти товар…" aria-label="Поиск по каталогу" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>

        
        <button
          className={isFavOn ? "catalog-fav-toggle active" : "catalog-fav-toggle"}
          aria-pressed={isFavOn}
          onClick={() => setIsFavOn(!isFavOn)}
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            fill={isFavOn ? "currentColor" : "none"}
            aria-hidden="true"
          />
          Только избранное
        </button>

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
              onFav={props.onFav}
              // TODO: true, если этот товар в избранном
              isFav={props.favCart.includes(pr.id) ? true : false}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Catalog;
