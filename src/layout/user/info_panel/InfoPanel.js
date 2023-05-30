import styles from "./InfoPanel.module.css";

function InfoPanel({ children }) {
  return <div className={styles.panel}>{children}</div>;
}

export default InfoPanel;
