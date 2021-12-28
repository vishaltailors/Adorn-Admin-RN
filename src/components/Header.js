import React from "react";
import Logo from "../images/logo.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-3 py-2 border-b-2">
      <div className="flex items-center">
        <img src={Logo} alt="AppLogo" width={45} />
        <h1 className="text-2xl font-bold text-slate-700 ml-2">Adorn</h1>
      </div>
      <div>{/* <button className="btn btn-primary">Login</button> */}</div>
    </div>
  );
};

export default Header;
