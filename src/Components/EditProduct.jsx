import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Button from "./Button";
import FilterBadge from "./ui/FilterBadge";

export const EditProduct = ({ product, isOpen, setIsOpen }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: product?.title || "",
      price: product?.price || "",
      stock: product?.stock || "",
      discountedPrice: product?.discountedPrice || "",
      category: product?.category || "", 
    },
  });

  const [showDiscount, setShowDiscount] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (isOpen) {
      reset({
        title: product?.title || "",
        price: product?.price || "",
        stock: product?.stock || "",
        description : product?.description,
        discountedPrice: product?.discountedPrice || "",
      });
      setShowDiscount(false);
      console.log(product);
      
      setSelectedCategory(product.category);
    }
  }, [isOpen, product, reset]);



  const onSubmit = (data) => {
    console.log(data);
  };

  const categories = [
    "headphones",
    "earbuds",
    "accessories",
    "electronics",
    "laptop",
    "wearables",
    "drone",
    "watch",
    "smartphone",
    "tablet",
    "components",
    "camera"
  ];

  console.log(product?.category);

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`absolute ${
        isOpen ? "top-0 scale-100" : "top-full scale-0"
      } transition-all duration-300 left-0 w-full h-full  bg-black/50 backdrop-blur-md flex items-center justify-center p-4`}
    >
      <div onClick={(e) => e.stopPropagation()} className='bg-dark-secondary p-4 rounded-lg w-full  max-w-150'>
        <div className='flex items-center justify-between text-light-text gap-4 mb-4'>
          <h2 className='text-2xl font-semibold'>Edit Product</h2>
          <FaXmark
            size={30}
            onClick={() => setIsOpen(false)}
            className='cursor-pointer'
          />
        </div>
        <div className='flex w-full'>
          <form
            className='flex flex-col w-full'
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className='bg-light-primary text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded-md w-full'
              type='text'
              {...register("title")}
              placeholder='Product Title'
            />
            <textarea
              {...register("description")}
              className='bg-light-primary text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded-md w-full'
              name='description'
              id='description'
            ></textarea>
            <h4 className='text-dark-text text-lg font-semibold pb-2'>
              Categories
            </h4>
            {selectedCategory && (
              <div className='flex gap-2 mb-4 flex-wrap'>
               <select className="w-full flex items-center justify-between p-3.5 text-sm md:text-md bg-light-primary text-dark-text capitalize rounded-md" name="category" id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((category) => (
                  <option selected={category === selectedCategory} key={category} value={category}>
                    {category}
                  </option>
                ))}
               </select>
              </div>
            )}

            <input
              className='bg-light-primary text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded-md w-full'
              type='number'
              {...register("price")}
              placeholder='Price'
            />
            <input
              className='bg-light-primary text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded-md w-full'
              type='number'
              {...register("stock")}
              placeholder='Stock'
            />

            {/* Switch Button */}
            <label className='mb-4 flex items-center justify-between gap-2 cursor-pointer select-none'>
              <span className='text-dark-text '>Put on Sale?</span>
              <input
                type='checkbox'
                checked={showDiscount}
                onChange={(e) => setShowDiscount(e.target.checked)}
                className='sr-only peer'
                id='discountSwitch'
              />
              <div className='w-10 h-6 bg-gray-300 rounded-full peer-checked:bg-dark-text relative transition-colors duration-200'>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
                    showDiscount ? "translate-x-4" : ""
                  }`}
                ></div>
              </div>
            </label>
            {showDiscount && (
              <input
                className='bg-light-primary transition-all duration-200 text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded w-full'
                type='number'
                {...register("discountedPrice")}
                placeholder='Discounted Price'
              />
            )}

            <Button
              type='submit'
              label={"Save Changes"}
              className={`text-white font-semibold`}
            ></Button>
          </form>
        </div>
      </div>
    </div>
  );
};
