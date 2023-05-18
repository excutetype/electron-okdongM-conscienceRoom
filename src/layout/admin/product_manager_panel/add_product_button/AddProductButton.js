import styles from "./AddProductButton.module.css";

function AddProductButton({ openCreateProductModal }) {
  return (
    <span className={styles.addButton}>
      <button className={styles.trigger} onClick={openCreateProductModal}>
        +
      </button>
    </span>
  );
}

export default AddProductButton;
