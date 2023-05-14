import styles from "./Table.module.css";

function Table() {
  const rowList = [
    "물품 이름",
    "빌린 날짜",
    "반납 예정일",
    "남은 반납일",
    "상태",
    "연체일",
  ];

  const testColumnList = [
    {
      PName: "남자 체육복 바지",
      BDate: "0000-00-00",
      RDDate: "0000-00-00",
      RDay: "00",
      status: "연체",
      ODay: "000",
    },
    {
      PName: "남자 체육복 바지",
      BDate: "0000-00-00",
      RDDate: "0000-00-00",
      RDay: "00",
      status: "연체",
      ODay: "000",
    },
    {
      PName: "남자 체육복 바지",
      BDate: "0000-00-00",
      RDDate: "0000-00-00",
      RDay: "00",
      status: "연체",
      ODay: "000",
    },
    {
      PName: "남자 체육복 바지",
      BDate: "0000-00-00",
      RDDate: "0000-00-00",
      RDay: "00",
      status: "연체",
      ODay: "000",
    },
    {
      PName: "남자 체육복 바지",
      BDate: "0000-00-00",
      RDDate: "0000-00-00",
      RDay: "00",
      status: "연체",
      ODay: "000",
    },
    {
      PName: "남자 체육복 바지",
      BDate: "0000-00-00",
      RDDate: "0000-00-00",
      RDay: "00",
      status: "연체",
      ODay: "000",
    },
    {
      PName: "남자 체육복 바지",
      BDate: "0000-00-00",
      RDDate: "0000-00-00",
      RDay: "00",
      status: "연체",
      ODay: "000",
    },
  ];

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {rowList.map((rowName, index) => {
              return (
                <th key={index} className={styles.th}>
                  {rowName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {testColumnList.map((column, index) => {
            return (
              <tr key={index} className={styles.tr}>
                <td className={styles.td}>{column.PName}</td>
                <td className={styles.td}>{column.BDate}</td>
                <td className={styles.td}>{column.RDDate}</td>
                <td className={styles.td}>{column.RDay}</td>
                <td className={styles.td}>{column.status}</td>
                <td className={styles.td}>{column.ODay}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
