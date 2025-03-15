import { Link } from "react-router";
import { useAuthStore } from "../store/authStore";

function Navbar() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    const { message } = await logout();
    toast.success(message);
  };

  return (
    <nav className="bg-[#252422] flex justify-between text-[#FFFCF2] items-center px-4 md:px-12 py-4 md:py-6">
      <Link to="/">
        <label className="font-semibold tracking-wider md:text-lg lg:text-xl cursor-pointer">
          FavLib
        </label>
      </Link>
      {!user ? (
        <div className="flex items-center space-x-5 md:text-lg">
          <Link to={"/login"}>
            <span>Add book</span>
          </Link>

          <Link to={"/login"}>
            <span>Log in</span>
          </Link>

          <Link to={"/signup"}>
            <button className="bg-[#403D39] px-3 py-2">Sign up</button>
          </Link>
        </div>
      ) : (
        <div className="flex items-center space-x-5 md:text-lg">
          <Link to={"/add-book"}>
            <button className="cursor-pointer" >Add book</button>
          </Link>
          <button className="bg-[#403D39] px-3 py-2 cursor-pointer" onClick={handleLogout}>Log out{user.username}</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
