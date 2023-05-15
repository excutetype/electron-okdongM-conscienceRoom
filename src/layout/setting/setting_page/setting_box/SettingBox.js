import styles from "./SettingBox.module.css";

function SettingBox({ title, children }) {
  return (
    <div className={styles.box}>
      <div className={styles.title}>{title}</div>
      {children}
    </div>
  );
}

export default SettingBox;
