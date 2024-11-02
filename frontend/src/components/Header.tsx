import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-blue-800 py-5 px-3 md:px-0">
      <div className=" md:mx-16 flex justify-between items-center">
        <span className="text-2xl md:text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>StayWise.com</Link>
        </span>
        {isLoggedIn ? (
          <div className=" flex justify-between items-center gap-2 md:gap-5 text-white">
            <Link
              to={"/my-bookings"}
              className=" px-2  md:px-4 py-2 hover:bg-blue-600 rounded-md"
            >
              My Bookings
            </Link>
            <Link
              to={"/my-hotels"}
              className="md:px-4 py-2 hover:bg-blue-600 rounded-md"
            >
              My Hotels
            </Link>
            <SignOutButton />
          </div>
        ) : (
          <span className="flex">
            <Link
              to={"/sign-in"}
              className="flex items-center text-xl bg-[#f2f2f2] rounded-xl px-2 md:px-4 text-blue-500 py-2 font-bold hover:bg-[#ffff] hover:text-blue-800"
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
