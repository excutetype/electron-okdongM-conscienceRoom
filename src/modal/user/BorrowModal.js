import { useState, useEffect } from "react";
import Modal from "components/modal/Modal";
import HoverableButton from "components/hoverable_button/HoverableButton";
import ProductChoiceChip from "./product_choice_chip/ProductChoiceChip";
import ipcSend from "api/ipcSend";
import styles from "./BorrowModal.module.css";

const hoverableButtonStyle = {
  width: "100px",
  height: "40px",
  fontSize: "1.5rem",
};

function BorrowModal({ userId, rerendering, close }) {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await ipcSend("db-product-read-all");
      setAllProducts(() => {
        return products;
      });
    })();
  }, []);

  return (
    <Modal style={{ content: { width: "720px", height: "fit-content" } }}>
      <div className={styles.root}>
        <div className={styles.header}>물품 선택</div>
        <div className={styles.article}>
          {allProducts.map((product, index) => {
            const { id, name } = product;
            return (
              <ProductChoiceChip
                key={index}
                isSelected={selectedProducts.includes(id)}
                onClick={() => {
                  if (selectedProducts.includes(id)) {
                    setSelectedProducts((prev) => {
                      return [...prev].filter((ele) => ele !== id);
                    });
                  } else {
                    setSelectedProducts((prev) => {
                      return [...prev, id];
                    });
                  }
                }}
              >
                {name}
              </ProductChoiceChip>
            );
          })}
        </div>
        <div className={styles.buttonBox}>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#4e73df" }}
            disabled={!selectedProducts.length}
            onClick={async () => {
              await borrow(userId, selectedProducts);
              close();
              rerendering();
            }}
          >
            대출
          </HoverableButton>
          <HoverableButton style={{ ...hoverableButtonStyle, color: "#c72d1f" }} onClick={close}>
            취소
          </HoverableButton>
        </div>
      </div>
    </Modal>
  );
}

async function borrow(userId, selectedProducts) {
  const borrows = selectedProducts.map((product) => {
    return { borrower: userId, product };
  });
  await ipcSend("db-borrow-create-many", { borrows });
}

export default BorrowModal;
