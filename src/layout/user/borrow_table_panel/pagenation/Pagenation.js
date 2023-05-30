import { useEffect, useState } from "react";
import styles from "./Pagenation.module.css";

const AMOUNT_OF_VIEW_PAGE_NUMBERS = 5;

function Pagenation({ amountOfPage, page, setPage }) {
  const [allPageNumbers, setAllPageNumbers] = useState([]);
  const [viewPageNumbers, setViewPageNumbers] = useState([]);

  useEffect(() => {
    let allPageNumbers = getSequenceArray(amountOfPage);
    allPageNumbers = allPageNumbers.length ? allPageNumbers : [0];
    allPageNumbers = chunk(allPageNumbers, AMOUNT_OF_VIEW_PAGE_NUMBERS);
    setAllPageNumbers(() => {
      return allPageNumbers;
    });
    setViewPageNumbers(() => {
      return allPageNumbers[parseInt(page / AMOUNT_OF_VIEW_PAGE_NUMBERS)] ?? [];
    });
  }, [amountOfPage, page]);

  return (
    <div className={styles.pagenation}>
      <button
        className={styles.pageButton}
        onClick={() => {
          setPrevPageBundle(allPageNumbers, page, setPage);
        }}
      >
        &lt;
      </button>
      {viewPageNumbers.map((number, index) => {
        return (
          <button
            key={index}
            className={`${styles.pageSelection} ${page === number ? styles.selected : null}`}
            onClick={() => {
              setPage(number);
            }}
          >
            {number + 1}
          </button>
        );
      })}
      <button
        className={styles.pageButton}
        onClick={() => {
          setNextPageBundle(allPageNumbers, page, setPage);
        }}
      >
        &gt;
      </button>
    </div>
  );
}

function setPrevPageBundle(allPageNumbers, page, setPage) {
  const prevPageBundleIndex = parseInt(page / AMOUNT_OF_VIEW_PAGE_NUMBERS) - 1;
  if (prevPageBundleIndex < 0) {
    const firstPageBundle = allPageNumbers[0];
    setPage(firstPageBundle[0]);
  } else {
    const prevPageBundle = allPageNumbers[prevPageBundleIndex];
    setPage(prevPageBundle[0]);
  }
}

function setNextPageBundle(allPageNumbers, page, setPage) {
  const nextPageBundleIndex = parseInt(page / AMOUNT_OF_VIEW_PAGE_NUMBERS) + 1;
  if (nextPageBundleIndex < allPageNumbers.length) {
    const nextPageBundle = allPageNumbers[nextPageBundleIndex];
    setPage(nextPageBundle[0]);
  } else {
    const endOfAllPageNumbers = allPageNumbers.length - 1;
    const endPageBundle = allPageNumbers[endOfAllPageNumbers];
    setPage(endPageBundle[endPageBundle.length - 1]);
  }
}

function getSequenceArray(n) {
  return Array.from(Array(n).keys());
}

function chunk(arr, size) {
  let result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default Pagenation;
