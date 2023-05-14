import styles from "./SettingWidget.module.css";

function SettingWidget({ data, children }) {
  return (
    <div className={styles.settingWidget}>
      <div className={styles.title}>{data.title}</div>
      {children}
    </div>
  );
}

export default SettingWidget;
