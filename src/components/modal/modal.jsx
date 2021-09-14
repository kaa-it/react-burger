import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";

const modalRoot = document.getElementById("react-modals");

const Modal = (props) => {
  // @ts-ignore
  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
