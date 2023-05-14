import { useState } from "react";
import SettingContext from "context/page/SettingPage";
import styles from "./SettingWidgetPasswordInput.module.css";
import viewIcon from "images/page/setting/widget/password_input/view.png";
import hideIcon from "images/page/setting/widget/password_input/hide.png";

function SettingWidgetPasswordInput({ style, data }) {
  const [hideText, setHideText] = useState(true);

  return (
    <SettingContext.Consumer>
      {({ settingValue, setSettingValue }) => {
        return (
          <span className={styles.inputBox}>
            <input
              id="input"
              type={hideText ? "password" : "text"}
              className={styles.settingWidgetTextInput}
              style={{ width: style.width }}
              value={settingValue[data.key] || ""}
              onChange={(e) => {
                setSettingValue((prev) => {
                  let obj = { ...prev };
                  obj[data.key] = e.target.value;
                  return obj;
                });
              }}
            />
            <img
              src={hideText ? viewIcon : hideIcon}
              alt="패스워드 숨김 여부"
              width="22px"
              className={`${styles.eye} ${hideText ? styles.view : null}`}
              onClick={() => {
                setHideText((prev) => {
                  return !prev;
                });
              }}
            />
          </span>
        );
      }}
    </SettingContext.Consumer>
  );
}

export default SettingWidgetPasswordInput;
