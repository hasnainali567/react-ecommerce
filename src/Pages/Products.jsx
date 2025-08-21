import { BreadCrumb, LoadingCard } from "../Components";
import { useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { ProductCard } from "../Components";
import { useState, useEffect } from "react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const searchQuery = searchParams.get("search");

  const { products, productStatus } = useSelector((state) => state.products);

  const [filteredbyCategory, setFilteredByCategory] = useState([]);

  useEffect(() => {
  let filtered = [...products];

  // category / query filter
  if (query) {
    switch (query) {
      case "sale":
        filtered = filtered.filter((p) => p.onSale);
        break;
      case "new-arrival":
        filtered = filtered.filter((p) => p.newArrival);
        break;
      case "best-sellers":
        filtered = [...filtered].sort((a, b) => b.salesCount - a.salesCount);
        break;
      default:
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === query.toLowerCase()
        );
        break;
    }
  }

  // search filter
  if (searchQuery) {
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  setFilteredByCategory(filtered);
}, [products, query, searchQuery]);


  return (
    <div className='w-full px-5 sm:px-10 md:px-15 lg:px-20 xl:px-30 py-6 flex flex-col gap-2.5 sm:gap-4 md:gap-6'>
      <BreadCrumb />
      <h1 className='text-3xl font-semibold text-light-text capitalize'>
        {query ? query : searchQuery ? searchQuery : "All Products"}
      </h1>

      {(searchQuery || query) && filteredbyCategory.length === 0 && (
        <h3 className='text-lg font-medium text-gray-500 mb-5 text-center'>
          No Products found! Sorry for the inconvenience.
        </h3>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5'>
        {productStatus === "loading" ? (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        ) : filteredbyCategory.length > 0 ? (
          filteredbyCategory.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
