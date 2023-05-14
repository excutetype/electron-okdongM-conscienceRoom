import SettingContext from "context/page/SettingPage";
import styles from "./SettingWidgetTextInput.module.css";

function SettingWidgetTextInput({ style, data }) {
  return (
    <SettingContext.Consumer>
      {({ settingValue, setSettingValue }) => {
        return (
          <input
            type="text"
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
        );
      }}
    </SettingContext.Consumer>
  );
}

export default SettingWidgetTextInput;
