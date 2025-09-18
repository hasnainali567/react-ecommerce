import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Products, Signup, Login, UserProfile, Product, Dashboard } from "../Pages";
import { Layout, PaymentForm, PrivateRoute, PublicRoute } from "../Components";
import { AuthProvider } from "../Components";
import { AnimatePresence } from "framer-motion";

function Router() {
  const location = useLocation();

  return (
    <AuthProvider>
      <AnimatePresence mode="popLayout">
        <Routes location={location} key={location.pathname}>
          {/* Wrap sab children with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<Product />} />

            {/* Public Routes */}
            <Route
              path="signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            {/* Private Routes */}
            <Route
              path="user-profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
            <Route
              path="user-profile/checkout"
              element={
                <PrivateRoute>
                  <PaymentForm />
                </PrivateRoute>
              }
            />
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default Router;
