import { useState } from "react";
import styles from "./HoverableButton.module.css";

function HoverableButton({ style, onClick, disabled = false, children }) {
  const normalStyle = {
    ...style,
    backgroundColor: "#ffffff",
    border: `2px solid ${style.color}`,
  };
  const hoverStyle = {
    ...style,
    backgroundColor: style.color,
    border: `2px solid ${style.color}`,
    color: "#ffffff",
  };

  const [isHovered, setIsHoverd] = useState(false);

  return (
    <button
      className={`${styles.button} ${disabled ? styles.disabled : null}`}
      style={isHovered ? hoverStyle : normalStyle}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={() => {
        setIsHoverd(true);
      }}
      onMouseOut={() => {
        setIsHoverd(false);
      }}
    >
      {children}
    </button>
  );
}

export default HoverableButton;
