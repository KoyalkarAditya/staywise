import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-blue-800 py-5">
      <div className="mx-7 md:mx-16 flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>StayWise.com</Link>
        </span>
        <span className="flex space-x-2">
          <Link
            to={"/sign-in"}
            className="flex items-center text-xl bg-[#f2f2f2] rounded-xl px-4 text-blue-500 py-2 font-bold hover:bg-[#ffff] hover:text-blue-800"
          >
            Sign In
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;
