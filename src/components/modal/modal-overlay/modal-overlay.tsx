import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./modal-overlay.module.css";

const ModalOverlay = (props: any) => {
  const selfRef = useRef(null);

  return (
    <div ref={selfRef} onClick={props.onClose} className={styles.overlay}>
      {props.children}
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
