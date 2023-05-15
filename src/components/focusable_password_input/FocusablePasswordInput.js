import { useState } from "react";
import styles from "./FocusablePasswordInput.module.css";
import viewIcon from "images/page/setting/widget/password_input/view.png";
import hideIcon from "images/page/setting/widget/password_input/hide.png";

function FocusablePasswordInput({ length, fontSize, value, onChange }) {
  const [view, setView] = useState(false);

  return (
    <span className={styles.inputBox}>
      <input
        type={view ? "input" : "password"}
        className={styles.input}
        style={{ fontSize, width: length }}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <img
        src={view ? hideIcon : viewIcon}
        alt="패스워드 숨김 여부"
        width="22px"
        className={`${styles.eye} ${view ? null : styles.view}`}
        onClick={() => {
          setView(!view);
        }}
      />
    </span>
  );
}

export default FocusablePasswordInput;
