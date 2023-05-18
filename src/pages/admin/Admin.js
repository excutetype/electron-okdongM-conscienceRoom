import { useState } from "react";
import ProductManagerPanel from "layout/admin/product_manager_panel/ProductManagerPanel";
import Tool from "layout/admin/tool_panel/Tool";
import HoverableButton from "components/hoverable_button/HoverableButton";
import CreateProductModal from "modal/admin/create_product_modal/CreateProductModal";
import ChangePasswordModal from "modal/admin/change_password/ChangePasswordModal";
import AdminContext from "context/admin/AdminContext";
import styles from "./Admin.module.css";

const hoverableButtonStyle = {
  width: "100%",
  height: "65px",
  fontSize: "2rem",
};

function Admin() {
  const [modal, setModal] = useState("");

  return (
    <AdminContext.Provider value={{ modal, setModal }}>
      <div className={styles.root}>
        <ProductManagerPanel
          openCreateProductModal={() => {
            setModal("create-product");
          }}
        />
        <Tool>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#4e73df" }}
          >
            학생 페이지 관리
          </HoverableButton>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#33c481" }}
          >
            대출 목록 출력
          </HoverableButton>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#858796" }}
            onClick={() => {
              setModal("change-password");
            }}
          >
            비밀번호 변경
          </HoverableButton>
        </Tool>
        {getModal(modal, () => {
          setModal(false);
        })}
      </div>
    </AdminContext.Provider>
  );
}

function getModal(kind, close) {
  switch (kind) {
    case "create-product":
      return <CreateProductModal close={close} />;
    case "change-password":
      return <ChangePasswordModal close={close} />;
    default:
      return null;
  }
}

export default Admin;
