import styles from "./Filter.module.css";

function Filter({ children }) {
  return <div className={styles.filter}>{children}</div>;
}

export default Filter;
