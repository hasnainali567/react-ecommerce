import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const products = useSelector((state) => state.products.products);

  // Parse query string to get q param
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q');

  return (
    <Breadcrumb style={{ margin: '7px 0', color: 'white' }} >
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        let isLast = index === pathnames.length - 1;

        // agar query param hai to Products ko last treat na karo
        if (q && name === "products") {
          isLast = false;
        }

        // check if this segment is a product ID
        const product = products.find((p) => p.id.toString() === name);

        if (product && isLast) {
          return (
            <React.Fragment key={routeTo}>
              <Breadcrumb.Item className='text-white'>
                <Link to={`/products?q=${product.category}`}>
                  {product.category}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
            </React.Fragment>
          );
        }

        const displayName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <Breadcrumb.Item key={routeTo}>
            {isLast ? displayName : <Link to={routeTo}>{displayName}</Link>}
          </Breadcrumb.Item>
        );
      })}

      {/* q param hamesha last item banega */}
      {q && (
        <Breadcrumb.Item key="queryParam">
          {decodeURIComponent(q)}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default BreadCrumb;
