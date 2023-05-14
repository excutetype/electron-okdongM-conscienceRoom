import styles from "./FilterSelection.module.css";

function FilterSelection({ data }) {
  return <button className={styles.filterSelection}>{data.name}</button>;
}

export default FilterSelection;
