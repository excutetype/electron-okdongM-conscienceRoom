import { useState, useEffect } from "react";
import HoverableButton from "components/hoverable_button/HoverableButton";
import dayjs from "dayjs";
import ipcSend from "api/ipcSend";
import styles from "./BorrowTable.module.css";

const borrowRow = ["물품 이름", "빌린 날짜", "반납 예정일", "남은 반납일", "연체일", " "];
const overdueRow = ["물품 이름", "빌린 날짜", "반납 예정일", "연체일", " "];
const returnedRow = ["물품 이름", "빌린 날짜", "반납일", "연체일"];

function BorrowTable({ recordDatas, filter, rerendering }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    let columns = getColumns(filter, recordDatas, rerendering);
    // eslint-disable-next-line default-case
    setColumns(() => {
      return columns;
    });
  }, [recordDatas, filter]);

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            {getRow(filter).map((rowName, index) => {
              return (
                <th key={index} className={styles.th}>
                  {rowName}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {columns.length
            ? columns.map((column, index) => {
                return (
                  <tr key={index} className={styles.tr}>
                    {column.map((rowValue, index) => {
                      return (
                        <td key={index} className={styles.td}>
                          {rowValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

function getRow(filter) {
  // eslint-disable-next-line default-case
  switch (filter) {
    case "borrow":
      return borrowRow;
    case "overdue":
      return overdueRow;
    case "returned":
      return returnedRow;
  }
}

function getColumns(filter, recordDatas, rerendering) {
  return recordDatas.map((data) => {
    const column = [];

    const { id, product_name, borrow_date, due_date, returned_date } = data;
    const howAfterDaysCurrentFromDueDate = howAfterDaysAfromB(dayjs().format("YYYY-MM-DD"), due_date);
    const remainingDays =
      howAfterDaysCurrentFromDueDate === 0 ? (
        <span style={{ color: "#e74a3b" }}>오늘까지</span>
      ) : howAfterDaysCurrentFromDueDate < 0 ? (
        `${-howAfterDaysCurrentFromDueDate}일`
      ) : (
        "-"
      );
    let overdueDays = null;
    if (filter === "borrow" || filter === "overdue") {
      overdueDays =
        howAfterDaysCurrentFromDueDate > 0 ? (
          <span style={{ color: "#e74a3b" }}>{howAfterDaysCurrentFromDueDate}일</span>
        ) : (
          "-"
        );
    } else {
      const howAfterDaysReturnedDateFromDueDate = howAfterDaysAfromB(returned_date, due_date);
      overdueDays =
        howAfterDaysReturnedDateFromDueDate > 0 ? (
          <span style={{ color: "#e74a3b" }}>{howAfterDaysReturnedDateFromDueDate}일</span>
        ) : (
          "-"
        );
    }
    const returnButton = getReturnButton(id, rerendering);

    // eslint-disable-next-line default-case
    switch (filter) {
      case "borrow":
        column.push(product_name, borrow_date, due_date, remainingDays, overdueDays, returnButton);
        break;
      case "overdue":
        column.push(product_name, borrow_date, due_date, overdueDays, returnButton);
        break;
      case "returned":
        column.push(product_name, borrow_date, returned_date, overdueDays);
        break;
    }

    return column;
  });
}

function howAfterDaysAfromB(a, b) {
  return dayjs(dayjs(a).format("YYYY-MM-DD")).diff(dayjs(b).format("YYYY-MM-DD"), "day");
}

function getReturnButton(borrowId, rerendering) {
  const style = { width: "80px", height: "35px", color: "#e74a3b", fontSize: "1.2rem" };
  return (
    <HoverableButton
      style={style}
      onClick={async () => {
        await ipcSend("db-borrow-update", {
          id: borrowId,
          updateData: { returned_date: dayjs().format("YYYY-MM-DD") },
        });
        rerendering();
      }}
    >
      반납
    </HoverableButton>
  );
}

export default BorrowTable;
