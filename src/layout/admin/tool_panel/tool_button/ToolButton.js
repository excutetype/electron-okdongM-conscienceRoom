import { useState } from "react";
import AdminContext from "context/admin/AdminContext";
import styles from "./ToolButton.module.css";

function ToolButton({ style, data }) {
  const { color } = style;

  const normalStyle = {
    border: `2px solid ${color}`,
    backgroundColor: "#ffffff",
    color,
  };

  const hoverStyle = {
    border: `2px solid ${color}`,
    backgroundColor: color,
    color: "#ffffff",
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <AdminContext.Consumer>
      {({ setModal }) => {
        return (
          <button
            className={styles.toolButton}
            style={isHover ? hoverStyle : normalStyle}
            onClick={() => {
              setModal(data.key);
            }}
            onMouseOver={() => {
              setIsHover(true);
            }}
            onMouseOut={() => {
              setIsHover(false);
            }}
          >
            {data.name}
          </button>
        );
      }}
    </AdminContext.Consumer>
  );
}

export default ToolButton;
