import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";


const Main = () => {
    return (
      <div>
        <Navbar></Navbar>
        <div className="max-w-[1640px] mx-auto">

        <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
};

export default Main;