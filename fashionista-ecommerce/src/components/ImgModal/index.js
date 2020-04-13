import React from "react";

import "./imgModal.css";

export default function ImgModal({ img, handleShow, handleClose }) {

  return (
    <>
      {handleShow && (
        <div className="img-modal-container">
          <span onClick={handleClose} className="btn-close-modal">
            X
          </span>
          <img className="img-modal" src={img} alt="imgModal" />
        </div>
      )}
    </>
  );
}
