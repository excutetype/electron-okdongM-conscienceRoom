import styles from "./ProductWidget.module.css";

function ProductWidget({ children, deleteProduct }) {
  const fontSize = 40 - children.length * 2;

  return (
    <span className={styles.productWidget}>
      <div
        style={{ fontSize: `${fontSize < 24 ? 24 : fontSize}px` }}
        className={styles.name}
      >
        {children}
      </div>
      <button className={styles.deleteButton} onClick={deleteProduct}>
        삭제
      </button>
    </span>
  );
}

export default ProductWidget;
