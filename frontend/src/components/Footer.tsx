const Footer = () => {
  return (
    <div className="bg-blue-800 p-5">
      <div className="container flex justify-between items-center">
        <span className="text-2xl text-white font-bold tracking-tight ">
          StayWise.com
        </span>
        <span className="text-white  tracking-tight flex gap-4">
          <p className="cursor-pointer">Privacy Policy</p>
          <p className="cursor-pointer">Terms of Service</p>
        </span>
      </div>
    </div>
  );
};
export default Footer;
