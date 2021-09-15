import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ title, onClose, children }) => {
  const onHeaderClick = (e) => {
    e.stopPropagation();
  };

  // @ts-ignore
  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal}>
        <div
          className={
            title ? styles.header_with_title : styles.header_without_title
          }
          onClick={onHeaderClick}
        >
          {title && <p className="text text_type_main-large">{title}</p>}
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Modal;
