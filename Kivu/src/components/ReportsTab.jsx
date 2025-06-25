import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
const ReportsTab = () => {
  return (
    <div className="h-lvh flex flex-col justify-between">
      <div>
        <NavBar />
      </div>

      <div className="flex justify-center items-center font-quicksand text-8xl text-orange-800">Coming Soon</div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default ReportsTab;
