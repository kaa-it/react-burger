import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose, children }: any) => {
  const selfRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e: any) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={selfRef} onClick={onClose} className={styles.overlay}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ModalOverlay;
