// import React, { useState } from "react";
// import { Pagination, Card } from "antd";
// import { useSelector } from "react-redux";
// import ProductCard from "./PorductCard";
// const ProductPagination = () => {
//   const products = useSelector((state) => state.products.products);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 4; // Products per page

//   // Calculate products for current page
//   const startIndex = (currentPage - 1) * pageSize;
//   const currentProducts = products.slice(startIndex, startIndex + pageSize);

//   const onPageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div className="pb-10">
//         <div className='w-full my-2 mb-15 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
//           {currentProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//       <Pagination
//         current={currentPage}
//         pageSize={pageSize}
//         align="center"
//         total={products.length}
//         onChange={onPageChange}
//         style={{ marginTop: 20, textAlign: "center" }}
//       />
//     </div>
//   );
// };

// export default ProductPagination;
