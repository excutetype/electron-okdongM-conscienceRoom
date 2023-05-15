import styles from "./ApplyButtonBox.module.css";

function ApplyButtonBox({ children }) {
  return <div className={styles.applyBox}>{children}</div>;
}

export default ApplyButtonBox;
