import { useEffect, useState } from "react";
import styles from "./HoverableButton.module.css";

function HoverableButton({ size, color, onClick, children }) {
  const basicStyle = {
    width: `${75 * (size / 20.8)}px`,
    height: `${36 * (size / 20.8)}px`,
    border: `2px solid ${color}`,
    fontSize: size,
  };
  const normalStyle = {
    backgroundColor: color,
    border: `2px solid ${color}`,
  };
  const hoverStyle = {
    backgroundColor: color,
    color: "#ffffff",
  };

  const [isHovered, setIsHoverd] = useState(false);
  const [style, setStyle] = useState({});

  useEffect(() => {
    let style = isHovered ? { ...hoverStyle } : { normalStyle };
    style = { ...style, ...basicStyle };
    setStyle(style);
  }, [isHovered]);

  return (
    <button
      className={styles.button}
      style={style}
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
