import React,  {useMemo} from "react";
import CategoryBadge from "./ui/CategoryBadge";
import ProductCard from "./PorductCard";
import { useSelector } from "react-redux";
import LoadingCard from "./LoadingCard.jsx";

const FeaturedProducts = () => {
  const { productStatus, products } = useSelector((state) => state.products);

  const featuredProducts = useMemo(() => {
    return products.filter((p) => p.newArrival).slice(0, 4);
  }, [products]);

  return (
    <div className='w-full mt-6'>
      <h2 className='text-2xl font-semibold mb-3 text-light-text'>
        Featured Products
      </h2>
      <div className='flex flex-wrap gap-2 gap-y-2'>
        <CategoryBadge cat={"allproducts"} text='All Products' />
        <CategoryBadge cat={"earbuds"} text='Earbuds' />
        <CategoryBadge cat={"laptops"} text='Laptops' />
        <CategoryBadge cat={"audio"} text='Audio' />
        <CategoryBadge cat={"accessories"} text='Accessories' />
      </div>
      <div className='mt-8 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {productStatus === "succeeded" ? (
          featuredProducts.map((product) => (
               <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <>
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
