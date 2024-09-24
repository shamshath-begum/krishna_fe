import React from "react";
import logo from "../assets/logo.jfif";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header>
        <div>
            <Link to="/">
          <img src={logo} alt="logo" /></Link>
        </div>
        <div className="title">The Krishna Institute of Neet Coaching Centre</div>
        <div>
          
          <button><Link to="/login">Login</Link></button>
        </div>
      </header>
    </>
  );
}

export default Header;
