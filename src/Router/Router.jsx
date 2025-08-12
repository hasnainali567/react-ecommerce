import { BrowserRouter, Routes, Route } from "react-router-dom"; // ← yahan react-router-dom hoga
import { Home, Products, Signup, Login, UserProfile } from "../Pages";
import { Layout, PrivateRoute, PublicRoute } from "../Components";
import { AuthProvider } from "../Components"; // Import AuthProvider

function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path='/products/*'
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
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Router;
