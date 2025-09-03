import React, { useCallback } from "react";
import { FaBars } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { EditProduct } from "./EditProduct";

const AdminProducts = ({ menu, setMenu }) => {
  const products = useSelector((state) => state.products.products);
  const [editingProduct, setEditingProduct] = React.useState(null);
  const [modalOpen, setModalOPen] = React.useState(false);
  const handleEdit = useCallback(
    (id) => {
      setEditingProduct(products.find((product) => product.id === id));
      setModalOPen(true);
    },
    [products]
  );

  return (
    <div className=' layout-content-container flex flex-col max-w-[960px] flex-1'>
      <div className='flex flex-wrap items-center  gap-2 p-2 px-0 md:p-4'>
        <div onClick={() => setMenu(!menu)} className='md:hidden'>
          <FaBars size={24} className='text-white' />
        </div>
        <div className="w-full flex items-center justify-between">
          <p className='text-white text-2xl md:text-3xl font-bold leading-tight '>
            Products
          </p>
          <button className='flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#2104af] text-white text-sm font-bold leading-normal tracking-[0.015em]'>
            <span className='truncate'>Add Product</span>
          </button>
        </div>
      </div>
      <div className='md:px-4 py-3 @container'>
        <div className='flex overflow-auto max-h-150  rounded-lg border border-[#3e3a55] bg-[#121118] scroll-bar'>
          <table className='flex-1 max-h-100'>
            <thead className='sticky top-0'>
              <tr className='bg-[#1d1b27]'>
                <th className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Product Name
                </th>
                <th className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-240 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Category
                </th>
                <th className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Price
                </th>
                <th className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal'>
                  Stock
                </th>
                <th className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-600 px-4 py-3 text-left w-60 text-[#a09bbb] text-sm font-medium leading-normal'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='overflow-auto max-h-200'>
              {products.length > 0 &&
                products.map((product) => (
                  <tr
                    className='border-t border-t-[#3e3a55]'
                    key={product.title}
                  >
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal'>
                      {product.title}
                    </td>
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-240 h-[72px] px-4 py-2 w-[400px] text-[#a09bbb] text-sm font-normal leading-normal'>
                      {product.category}
                    </td>
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-360 h-[72px] px-4 py-2 w-[400px] text-[#a09bbb] text-sm font-normal leading-normal'>
                      ${product.price}
                    </td>
                    <td className='table-ae896546-8418-4ced-b5d7-85535fe87205-column-480 h-[72px] px-4 py-2 w-[400px] text-[#a09bbb] text-sm font-normal leading-normal'>
                      {product.stock}
                    </td>
                    <td
                      onClick={() => handleEdit(product.id)}
                      className='cursor-pointer table-ae896546-8418-4ced-b5d7-85535fe87205-column-600 h-[72px] px-4 py-2 w-60 text-[#a09bbb] text-sm font-bold leading-normal tracking-[0.015em]'
                    >
                      Edit
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex px-4 py-3 justify-end'></div>
      <EditProduct
        isOpen={modalOpen}
        setIsOpen={setModalOPen}
        product={editingProduct}
      />
    </div>
  );
};

export default AdminProducts;
