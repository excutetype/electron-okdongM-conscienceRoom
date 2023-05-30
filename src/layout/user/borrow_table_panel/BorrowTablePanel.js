import styles from "./BorrowTablePanel.module.css";

function BorrowTablePanel({ children }) {
  return <div className={styles.panel}>{children}</div>;
}

export default BorrowTablePanel;
