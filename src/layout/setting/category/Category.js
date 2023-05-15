import styles from "./Category.module.css";

function Category({ children }) {
  return <div className={styles.category}>{children}</div>;
}

export default Category;
