import styles from "./SettingPage.module.css";

function SettingPage({ children }) {
  return <div className={styles.settingPage}>{children}</div>;
}

export default SettingPage;
