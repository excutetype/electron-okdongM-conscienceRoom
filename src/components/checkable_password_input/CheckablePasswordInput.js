import { useState } from "react";
import styles from "./CheckablePasswordInput.module.css";
import viewIcon from "images/page/setting/widget/password_input/view.png";
import hideIcon from "images/page/setting/widget/password_input/hide.png";

function CheckablePasswordInput({ style, wrong, value, onChange }) {
  const [view, setView] = useState(false);

  return (
    <span className={styles.inputBox} style={{ width: style.width }}>
      <input
        type={view ? "input" : "password"}
        className={`${styles.input} ${wrong.status ? styles.wrong : null}`}
        style={{ fontSize: style.fontSize }}
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
      <div className={styles.wrongMessage}>{wrong.status && wrong.message}</div>
    </span>
  );
}

export default CheckablePasswordInput;
