import styles from "./BorrowButton.module.css";

function BorrowButton() {
  return (
    <div className={styles.root}>
      <button className={styles.borrowButton}>대출</button>
    </div>
  );
}

export default BorrowButton;
