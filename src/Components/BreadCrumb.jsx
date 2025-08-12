import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Parse query string to get q param
  const searchParams = new URLSearchParams(location.search);
  const q = searchParams.get('q');

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        // Capitalize or transform name for better display
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);

        return (
          <Breadcrumb.Item  key={routeTo}>
            {isLast ? (
              displayName
            ) : (
              <Link to={routeTo}>{displayName}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}

      {/* Agar q param hai to last item ke baad dikhayen */}
      {q && (
        <Breadcrumb.Item key="queryParam">
          {q}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default BreadCrumb;
