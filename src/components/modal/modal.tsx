import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("react-modals");

interface IModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<IModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal}>
        <div
          data-test="header"
          className={
            title ? styles.header_with_title : styles.header_without_title
          }
        >
          {title && (
            <p data-test="header_title" className="text text_type_main-large">
              {title}
            </p>
          )}
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot!
  );
};

export default Modal;
