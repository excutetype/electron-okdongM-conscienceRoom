import styles from "./Category.module.css";

function Category({ children }) {
  return (
    <div className={styles.root}>
      <div className={styles.category}>{children}</div>
    </div>
  );
}

export default Category;
