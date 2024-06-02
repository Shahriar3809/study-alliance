import { FaFacebook, FaReddit, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" p-10 mt-10  bg-gradient-to-r from-[#065580] to-[#082f49] text-white">
      <div className="footer max-w-[1170px] mx-auto md:p-5">
        <aside>
          <h3 className="text-3xl font-bold">Study Alliance</h3>
          <p>
            Study Alliance Ltd.
            <br />
            Providing reliable service since 2000
          </p>
        </aside>
        <nav className="text-center">
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Study</a>
          <a className="link link-hover">Sell</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>

        <div className="space-y-3">
          <h2 className="text-xl text-center">Social Media: </h2>
          <div className="flex gap-3 text-3xl justify-center ">
            <FaFacebook />

            <FaInstagramSquare />
            <FaReddit />
          </div>
          <p className="text-center pt-5">
            {" "}
            Ⓒ All right reserved to Study Alliance- 2024
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
