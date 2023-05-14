import SettingContext from "context/page/SettingPage";
import ipcSend from "api/ipcSend";
import styles from "./ApplyButton.module.css";

function ApplyButton() {
  return (
    <SettingContext.Consumer>
      {({ settingValue, setShowSuccessModal }) => {
        return (
          <div className={styles.applyBox}>
            <button
              className={styles.applyButton}
              onClick={() => {
                applySetting(settingValue, setShowSuccessModal);
              }}
            >
              확인
            </button>
          </div>
        );
      }}
    </SettingContext.Consumer>
  );
}

function applySetting(value, setter) {
  ipcSend("electronStore-set-database-setting", value).then((res) => {
    setter(true);
  });
}

export default ApplyButton;
