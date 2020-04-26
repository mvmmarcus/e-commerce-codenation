import React from "react";

import "./imgModal.css";
import { FiX } from "react-icons/fi";

export default function ImgModal({ img, handleShow, handleClose }) {
  return (
    <>
      {handleShow && (
        <div className="img-modal">
          <div className="img-modal__poster">
            <FiX className="btn btn--close" onClick={handleClose} />
            <img className="img-modal__img" src={img} alt="imgModal" />
          </div>
        </div>
      )}
    </>
  );
}
