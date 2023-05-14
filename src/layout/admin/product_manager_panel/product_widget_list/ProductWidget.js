import styles from "./ProductWidget.module.css";

function ProductWidget({ data }) {
  const fontSize = 40 - data.name.length * 2;

  return (
    <span className={styles.productWidget}>
      <div
        style={{ fontSize: `${fontSize < 24 ? 24 : fontSize}px` }}
        className={styles.name}
      >
        {data.name}
      </div>
      <button className={styles.deleteButton}>삭제</button>
    </span>
  );
}

export default ProductWidget;
