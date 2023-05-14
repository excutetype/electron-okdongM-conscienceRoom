import styles from "./Tool.module.css";

function Tool({ children }) {
  return <div className={styles.tool}>{children}</div>;
}

export default Tool;
