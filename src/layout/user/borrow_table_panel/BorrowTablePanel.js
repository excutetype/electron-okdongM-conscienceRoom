import Filter from "./filter/Filter";
import FilterSelection from "./filter/FilterSelection";
import Table from "./table/Table";
import Pagenation from "./pagenation/Pagenation";

import styles from "./BorrowTablePanel.module.css";

function BorrowListPanel() {
  return (
    <div className={styles.panel}>
      <Filter>
        <FilterSelection data={{ name: "전체" }} />
        <FilterSelection data={{ name: "빌린 물품만" }} />
        <FilterSelection data={{ name: "연체 물품만" }} />
      </Filter>
      <Table />
      <Pagenation />
    </div>
  );
}

export default BorrowListPanel;
