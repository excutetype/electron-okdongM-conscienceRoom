import { useState } from "react";
import Modal from "components/modal/Modal";
import FocusableInput from "components/focusable_input/FocusableInput";
import HoverableButton from "components/hoverable_button/HoverableButton";
import ipcSend from "api/ipcSend";
import styles from "./CreateProductModal.module.css";

const focusableInputStyle = {
  width: "100%",
  height: "45px",
  fontSize: "1.6rem",
};
const hoverableButtonStyle = {
  width: "75px",
  height: "35px",
  fontSize: "1.3rem",
};

function CreateProductModal({ close }) {
  const [productName, setProductName] = useState("");

  return (
    <Modal
      style={{
        content: {
          width: "450px",
          height: "220px",
        },
      }}
    >
      <div className={styles.root}>
        <div className={styles.article}>
          <div className={styles.title}>등록할 물품의 이름을 입력하세요</div>
          <FocusableInput
            style={{ ...focusableInputStyle }}
            value={productName}
            onChange={(value) => {
              setProductName(value);
            }}
          />
        </div>
        <div className={styles.buttonBox}>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#4e73df" }}
            onClick={async () => {
              await createProduct(productName);
              close();
            }}
          >
            등록
          </HoverableButton>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#e74a3b" }}
            onClick={close}
          >
            취소
          </HoverableButton>
        </div>
      </div>
    </Modal>
  );
}

async function createProduct(productName) {
  await ipcSend("db-product-create", { name: productName });
}

export default CreateProductModal;
