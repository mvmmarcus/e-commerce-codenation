import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";

import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer__container">
      <>
        <Link to="/">
          Fashionista
        </Link>
        <div className="icons__container">
          <FiInstagram size={28} color="#000" />
          <FiFacebook size={28} color="#000" />
        </div>
      </>
    </div>
  );
}
