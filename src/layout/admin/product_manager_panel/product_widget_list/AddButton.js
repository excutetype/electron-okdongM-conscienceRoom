import styles from "./AddButton.module.css";

function AddButton() {
  return (
    <span className={styles.addButton}>
      <button className={styles.trigger}>+</button>
    </span>
  );
}

export default AddButton;
