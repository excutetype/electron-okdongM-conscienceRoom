import { useState, useEffect, useCallback } from "react";
import InfoPanel from "../../layout/user/info_panel/InfoPanel";
import Tag from "layout/user/info_panel/tag/Tag";
import Identifier from "layout/user/info_panel/identifier/Identifier";
import BorrowTablePanel from "layout/user/borrow_table_panel/BorrowTablePanel";
import Filter from "layout/user/borrow_table_panel/filter/Filter";
import SelectableText from "components/selectableText/SelectableText";
import BorrowTable from "layout/user/borrow_table_panel/borrow_table/BorrowTable";
import Pagenation from "layout/user/borrow_table_panel/pagenation/Pagenation";
import HoverableButton from "components/hoverable_button/HoverableButton";
import BorrowModal from "modal/user/BorrowModal";
import ipcSend from "api/ipcSend";
import dayjs from "dayjs";
import styles from "./User.module.css";

const hoverableButtonStyle = {
  gridArea: "borrow-button",
  width: "100%",
  height: "75px",
  color: "#4e73df",
  fontSize: "2.4rem",
};
const AMOUNT_OF_BORROW_IN_PAGE = 7;

function User({ userId }) {
  const [student, setStudent] = useState({});
  const [borrows, setBorrows] = useState([]);
  const [filter, setFilter] = useState("borrow");
  const [borrowTableData, setBorrowTableData] = useState({ record: [], filter: "borrow" });
  const [borrowTablePage, setBorrowTablePage] = useState(0);
  const [showBorrowModal, setShowBorrowModal] = useState(false);

  const [rerender, setRerender] = useState();
  const rerendering = useCallback(() => {
    setRerender({});
  }, []);

  useEffect(() => {
    (async () => {
      // 학생 정보 요청
      const student = await ipcSend("db-student-read-id", { id: userId });
      setStudent(() => {
        return student;
      });

      // 대출 정보 요청
      const allBorrows = await ipcSend("db-borrow-read-all-id-join-product", { borrowerId: userId });
      setBorrows(() => {
        return allBorrows;
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerender]);

  useEffect(() => {
    let columnData = null;
    // eslint-disable-next-line default-case
    switch (filter) {
      case "borrow":
        columnData = getBorrowingProduct(borrows);
        break;
      case "overdue":
        columnData = getOverdueProduct(borrows);
        break;
      case "returned":
        columnData = getReturnedProduct(borrows);
        break;
    }
    setBorrowTableData(() => {
      return { record: columnData, filter };
    });
  }, [borrows, filter, borrowTablePage]);

  useEffect(() => {
    setBorrowTablePage(0);
  }, [filter]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <InfoPanel>
          <Identifier grade={student.grade ?? 0} class_NM={student.class_NM ?? 0} name={student.name ?? "홍길동"} />
          <Tag description={`${getBorrowingProduct(borrows).length}개`} color="#1cc88a">
            대출 중
          </Tag>
          <Tag description={`${getOverdueProduct(borrows).length}개`} color="#f6c23e">
            연체 중
          </Tag>
          <Tag description={`${getOverdueCount(borrows)}번`} color="#e74a3b">
            연체 횟수
          </Tag>
        </InfoPanel>
        <BorrowTablePanel>
          <Filter>
            <SelectableText
              selected={filter === "borrow"}
              size={"28px"}
              onClick={() => {
                setFilter("borrow");
              }}
            >
              빌린 물품만
            </SelectableText>
            <SelectableText
              selected={filter === "overdue"}
              size={"28px"}
              onClick={() => {
                setFilter("overdue");
              }}
            >
              연체 물품만
            </SelectableText>
            <SelectableText
              selected={filter === "returned"}
              size={"28px"}
              onClick={() => {
                setFilter("returned");
              }}
            >
              반납된 물품만
            </SelectableText>
          </Filter>
          <BorrowTable
            recordDatas={getBorroTableColumnDataInPage(borrowTableData.record, borrowTablePage)}
            filter={borrowTableData.filter}
            rerendering={rerendering}
          />
          <Pagenation
            amountOfPage={Math.ceil(borrowTableData.record.length / AMOUNT_OF_BORROW_IN_PAGE)}
            page={borrowTablePage}
            setPage={setBorrowTablePage}
          />
        </BorrowTablePanel>
        <HoverableButton
          style={{ ...hoverableButtonStyle }}
          onClick={() => {
            setShowBorrowModal(true);
          }}
        >
          대출
        </HoverableButton>
        {showBorrowModal && (
          <BorrowModal
            userId={userId}
            rerendering={rerendering}
            close={() => {
              setShowBorrowModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function getBorrowingProduct(borrows) {
  return borrows.filter((borrow) => !borrow.returned_date);
}

function getReturnedProduct(borrows) {
  return borrows.filter((borrow) => borrow.returned_date);
}

function getOverdueProduct(borrows) {
  const borrowingProduct = getBorrowingProduct(borrows);
  const overdueProduct = borrowingProduct.filter((borrow) => {
    return dayjs().isAfter(borrow.due_date, "day");
  });
  return overdueProduct;
}

function getOverdueCount(borrows) {
  const overdueProduct = getOverdueProduct(borrows);
  const returnedWhenOverdueProduct = getReturnedProduct(borrows).filter((borrow) => {
    return dayjs(borrow.returned_date).isAfter(borrow.due_date, "day");
  });
  return overdueProduct.length + returnedWhenOverdueProduct.length;
}

function getBorroTableColumnDataInPage(columnData, page) {
  const startIndex = page * AMOUNT_OF_BORROW_IN_PAGE;
  const endIndex = startIndex + AMOUNT_OF_BORROW_IN_PAGE;
  const data = columnData.slice(startIndex, endIndex);
  return data;
}

export default User;
