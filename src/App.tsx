import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import CarsPage from "./pages/CarsPage";
import SingleCarPage from "./pages/SingleCarPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCarsPage from "./pages/ManageCarsPage";
import ManageBookingsPage from "./pages/ManageBookingsPage";
import CreateCarPage from "./pages/CreateCarPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./assets/Layout";
import Home from "./pages/Home";
import EditCarPage from "./pages/EditCarPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<Auth />} />

        {/* USER ROUTES */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <Layout>
                <UserDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cars"
          element={
            <ProtectedRoute>
              <Layout>
                <CarsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cars/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <SingleCarPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <Layout>
                <MyBookingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/cars"
          element={
            <ProtectedRoute>
              <Layout>
                <ManageCarsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create"
          element={
            <ProtectedRoute>
              <Layout>
                <CreateCarPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route path="/admin/edit-car/:id" element={<EditCarPage />} />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <Layout>
                <ManageBookingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;