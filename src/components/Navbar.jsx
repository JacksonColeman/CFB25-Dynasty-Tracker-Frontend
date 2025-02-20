import { Link } from "react-router-dom";
import { useAuth } from "../services/contexts/AuthContext";
import { useDynasty } from "../services/contexts/DynastyContext";

const Navbar = () => {
  const { user } = useAuth();
  const { currentDynasty } = useDynasty();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   await logout();
  //   navigate("/login");
  // };

  // If no user is logged in, show minimal navbar
  if (!user) {
    return (
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="space-x-4">
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-gray-300">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="">
        <div className="nav NavFlex">
          {/* Only show these links if a dynasty is selected */}
          {currentDynasty ? (
            <>
              <Link to="/" className="hover:text-gray-300 transition-colors">
                My Dynasties
              </Link>
              <Link
                to="/roster"
                className="hover:text-gray-300 transition-colors"
              >
                Roster
              </Link>
              <Link
                to="/recruiting"
                className="hover:text-gray-300 transition-colors"
              >
                Recruits
              </Link>
              <Link
                to="/mydynasty"
                className="hover:text-gray-300 transition-colors"
              >
                Edit Dynasty
              </Link>
              <Link
                to="/account"
                className="hover:text-gray-300 transition-colors"
              >
                Account
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-gray-300 transition-colors">
                My Dynasties
              </Link>
              <Link
                to="/account"
                className="hover:text-gray-300 transition-colors"
              >
                Account
              </Link>
            </>
          )}

          {/* <div className="flex items-center space-x-4">
            <span className="text-gray-300">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
