import { BrowserRouter, Routes, Route } from "react-router-dom"; // ← yahan react-router-dom hoga
import { Home, Products, Signup, Login, UserProfile, Product, Dashboard } from "../Pages";
import { Layout, PrivateRoute, PublicRoute } from "../Components";
import { AuthProvider } from "../Components"; // Import AuthProvider
import { useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion'

function Router() {
  const location = useLocation();


  return (
      <AuthProvider>
        <AnimatePresence mode='popLayout'>
          <Routes location={location} key={location.pathname}>
            <Route
              path='/'
              element={
                <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path='/products/:id'
            element={
              <Layout>
                <Product />
              </Layout>
            }
          />
          <Route
            path='/products'
            element={
              <Layout>
                <Products />
              </Layout>
            }
          />

          {/* Public routes - only for non-logged-in users */}
          <Route
            path='/signup'
            element={
              <PublicRoute>
                <Layout>
                  <Signup />
                </Layout>
              </PublicRoute>
            }
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Layout>
                  <Login />
                </Layout>
              </PublicRoute>
            }
          />
          <Route
            path='/user-profile'
            element={
              <PrivateRoute>
                <Layout>
                  <UserProfile />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route 
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
           />
        </Routes>
        </AnimatePresence>
      </AuthProvider>
  );
}

export default Router;
