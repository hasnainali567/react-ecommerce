import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "./Features/ProductsSlice";
import { Timestamp } from "firebase/firestore";
export const AddProduct = ({ product, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { register, handleSubmit, reset, setValue, getValues, watch } =
    useForm();

  const images = watch("images");

  const [showDiscount, setShowDiscount] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      reset({
        title: "",
        price: "",
        stock: "",
        description: "",
        discountedPrice: "",
        images: [],
        category: 'Select Category'
        
      });
      setShowDiscount(false);
    }
  }, [isOpen, product, reset]);

  const onSubmit = async (data) => {
    if (data.category === 'Select Category') {
        messageApi.open({
            type: 'warning',
            content: 'Please Select a Category'
        })

        return;
    }
    if (!data.images || data.images.length < 4) {
      messageApi.open({
        type: "error",
        content: "At least 4 images are required!",
      });
      return;
    }

    if (data.images.length > 4) {
      messageApi.open({ type: "error", content: "Maximum 4 images allowed!" });
      return;
    } // if sale is on, discounted price validation
    if (showDiscount) {
      if (!data.discountedPrice) {
        messageApi.open({
          type: "error",
          content: "Discounted price is required!",
        });
        return;
      }
      if (data.discountedPrice >= data.price) {
        messageApi.open({
          type: "error",
          content: "Discounted price must be less than actual price!",
        });
        return;
      }
      data.onSale = true;
    } else {
      data.onSale = false;
      data.discountedPrice = 0;
    }

    messageApi.open({
      type: "loading",
      content: "Updating product...",
      duration: 0,
    });

    try {
        const product = {
            ...data,
            newArrival: true,
            createdAt: new Date().toISOString(),
            rating: 0.0,
            salesCount: 0
        }

        await dispatch(addProduct(product)).unwrap()
        messageApi.destroy()
        messageApi.open({
            type:'success',
            content: 'Added Successfully'
        })
    } catch (error) {
        messageApi.destroy();
        messageApi.open({
            type:'error',
            content: 'Failed to Add',
        })
        
    }

    messageApi.destroy();
    messageApi.open({
      type: "success",
      content: "Form Submitted Successfully!",
    });
    setIsOpen(false);
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
    "camera",
    "smart-home",
  ];

  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`absolute ${
        isOpen ? "top-0 scale-100" : "top-full scale-0"
      } transition-all duration-300 left-0 w-full h-full  bg-black/50 backdrop-blur-md flex items-center justify-center p-4`}
    >
      {" "}
      {contextHolder}
      <div
        onClick={(e) => e.stopPropagation()}
        className='bg-dark-secondary p-4 rounded-lg w-full  max-w-150'
      >
        <div className='flex items-center justify-between text-light-text gap-4 mb-4'>
          <h2 className='text-2xl font-semibold'>Add Product</h2>
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
              required
            />
            <textarea
            placeholder="Enter Description (Max : 200 words)"
              maxLength={200}
              {...register("description")}
              className='bg-light-primary resize-none text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded-md w-full'
              name='description'
              id='description'
              required
            ></textarea>
            <h4 className='text-dark-text text-lg font-semibold pb-2'>
              Categories
            </h4>
            <div className='flex gap-2 mb-4 flex-wrap'>
              <select
                defaultValue={'Select Category'}
                required
                className='w-full flex items-center justify-between p-3.5 text-sm md:text-md bg-light-primary text-dark-text capitalize rounded-md'
                
                {...register('category')}
              >
                <option value="Select Category" disabled>Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <input
              className='bg-light-primary text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded-md w-full'
              type='number'
              {...register("price")}
              placeholder='Price'
              required
              min={1}
            />
            <input
              className='bg-light-primary text-dark-text mb-4 p-3.5 text-sm md:text-md  rounded-md w-full'
              type='number'
              {...register("stock")}
              placeholder='Stock'
              required
              min={0}
            />
            <input
              type='url'
              placeholder='Enter image URL and press Enter'
              className='bg-light-primary text-dark-text p-3 rounded-md w-full'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  const url = e.currentTarget.value.trim();

                  if (url) {
                    const current = getValues("images") || [];
                    if (current.length < 4) {
                      setValue("images", [...current, url]);
                      e.target.value = "";
                    } else {
                      messageApi.destroy();
                      messageApi.open({
                        type: "warning",
                        content: "You can only add Upto 4 Urls",
                      });
                    }
                  }
                }
              }}
            />
            <div className=' rounded-lg flex flex-wrap gap-2 py-3 pb-4 overflow-hidden'>
              {images &&
                images.map((image, index) => (
                  <div
                    onClick={() => {
                      const current = getValues("images") || [];
                      setValue(
                        "images",
                        current.filter((img) => img !== image)
                      );
                    }}
                    key={image + index}
                    className='relative'
                  >
                    <FaXmark
                      className='absolute top-[-12%] right-[-12%] bg-light-primary cursor-pointer text-dark-text rounded-full p-1 border-dark-secondary border-4'
                      size={32}
                    />
                    <img
                      src={image}
                      alt=''
                      className='rounded-lg h-20 w-20 object-cover aspect-square'
                    />
                  </div>
                ))}
            </div>
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
                {...register("discountedPrice", { valueAsNumber: true })}
                placeholder='Discounted Price'
                required={showDiscount}
                min={0}
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
