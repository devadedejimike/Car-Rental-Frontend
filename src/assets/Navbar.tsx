import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav className="bg-black text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold"
        >
          CarRental
        </Link>

        {/* LINKS */}
        <div className="flex items-center gap-5">
          {user?.role === "user" && (
            <>
              <Link
                to="/user"
                className="hover:text-gray-300"
              >
                Dashboard
              </Link>

              <Link
                to="/cars"
                className="hover:text-gray-300"
            >
                Cars
            </Link>

              <Link
                to="/my-bookings"
                className="hover:text-gray-300"
              >
                My Bookings
              </Link>
            </>
          )}

          {/* ADMIN LINKS */}
          {user?.role === "admin" && (
            <>
              {/* <Link
                to="/admin/dashboard"
                className="hover:text-gray-300"
              >
                Admin
              </Link>

              <Link
                to="/admin/cars"
                className="hover:text-gray-300"
              >
                Manage Cars
              </Link>

              <Link
                to="/admin/bookings"
                className="hover:text-gray-300"
              >
                Manage Bookings
              </Link> */}
            </>
          )}

          {/* AUTH */}
          {!user ? (
            <Link
              to="/auth"
              className="bg-white text-black px-4 py-2 rounded-lg"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;