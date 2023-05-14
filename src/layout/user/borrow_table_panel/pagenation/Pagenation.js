import styles from "./Pagenation.module.css";

function Pagenation() {
  const dataAmount = 27;
  const pageAmount = Math.floor(dataAmount / 7) + 1;

  return (
    <div className={styles.pagenation}>{getPageSelectionList(pageAmount)}</div>
  );
}

function getPageSelectionList(pageAmount) {
  let pageSelectionList = [];

  for (let i = 1; i <= pageAmount; i++) {
    pageSelectionList.push(
      <button key={i} className={styles.pageSelection}>
        {i}
      </button>
    );
  }

  return pageSelectionList;
}

export default Pagenation;
