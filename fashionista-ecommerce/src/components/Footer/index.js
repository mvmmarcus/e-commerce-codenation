import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";

import "./footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <>
        <h1>Fashionista</h1>
        <div className="icons-container">
          <FiInstagram size={28} color="#000" />
          <FiFacebook size={28} color="#000" />
        </div>
      </>
    </div>
  );
}
