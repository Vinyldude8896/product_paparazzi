import React from "react";
// import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function Nav() {
  //   function showNavigation() {
  // if (Auth.loggedIn()) {
  return (
    <header>
      <nav>
        <ul className="flex-row">
        <li className="mx-1">
            Price
            {/* <Link to="/orderHistory">Order History</Link> */}
          </li>
          <li className="mx-1">
           Login/Signup
            {/* <Link to="/orderHistory">Order History</Link> */}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Nav;
