import React, { ReactNode } from "react";
import styles from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay: React.FC<IModalOverlayProps> = ({ onClose, children }) => {
  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlay}
      className={styles.overlay}
      data-test="modal_overlay"
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
