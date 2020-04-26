import React from "react";
import { FiFacebook, FiInstagram } from "react-icons/fi";

import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <>
        <Link className="link link--home" to="/">Fashionista</Link>
        <div className="footer__icons">
          <FiInstagram className="icon icon--insta" />
          <FiFacebook className="icon icon--face" />
        </div>
      </>
    </div>
  );
}
