import React from "react";

import "./imgModal.css";
import { FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { modalsActions } from "../../actions/modals";
import { modalsSelectors } from "../../selectors/modals";

export default function ImgModal({ id = "modal", item }) {
  const dispatch = useDispatch();
  const showImg = useSelector(modalsSelectors.getImgModalState);

  const handleOutsideClick = (e) => {
    if (e.target.id === id) dispatch(modalsActions.handleCloseImg());
  };

  return (
    <div
      data-testid="img-modal"
      id={id}
      className={showImg ? "modal-img" : "modal-img modal-img--hide"}
      onClick={handleOutsideClick}
    >
      <div className="img-modal__poster">
        <FiX
          className="icon icon--close-modal"
          onClick={() => dispatch(modalsActions.handleCloseImg())}
        />
        {!item.image ? (
          <img
            className="img-modal__img img-modal__img--null"
            src={
              "https://via.placeholder.com/470x594/FFFFFF/?text=Imagem+Indisponível"
            }
            alt="Null"
          />
        ) : (
          <img className="img-modal__img" src={item.image} alt="imgModal" />
        )}
      </div>
    </div>
  );
}
