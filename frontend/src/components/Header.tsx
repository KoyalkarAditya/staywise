import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-5">
      <div className="mx-7 md:mx-16 flex justify-between">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>StayWise.com</Link>
        </span>
        {isLoggedIn ? (
          <div className=" flex justify-between items-center gap-5 text-white">
            <Link to={"/my-bookings"}>My Bookings</Link>
            <Link to={"/my-hotels"}>My Hotels</Link>
            <button>Sign Out</button>
          </div>
        ) : (
          <span className="flex space-x-2">
            <Link
              to={"/sign-in"}
              className="flex items-center text-xl bg-[#f2f2f2] rounded-xl px-4 text-blue-500 py-1 md:py-2 font-bold hover:bg-[#ffff] hover:text-blue-800"
            >
              Sign In
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
