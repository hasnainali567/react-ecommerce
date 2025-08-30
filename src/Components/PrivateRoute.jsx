import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { useLocation } from 'react-router'

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo)
  const location = useLocation();

  if (!userInfo) {
    return <Navigate to="/" replace />
  }
  if (location.pathname === '/dashboard') {
    if (userInfo.email === "hasnain5f7@gmail.com" && userInfo.role === "admin") {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }

  }

  return children
}

export default PrivateRoute;