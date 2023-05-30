import { useState } from "react";
import ProductManagerPanel from "layout/admin/product_manager_panel/ProductManagerPanel";
import Tool from "layout/admin/tool_panel/Tool";
import HoverableButton from "components/hoverable_button/HoverableButton";
import CreateProductModal from "modal/admin/create_product/CreateProductModal";
import ChangePasswordModal from "modal/admin/change_password/ChangePasswordModal";
import AccessUserPageModal from "modal/admin/access_user_page/AccessUserPageModal";
import AdminContext from "context/admin/AdminContext";
import ipcSend from "api/ipcSend";
import styles from "./Admin.module.css";

const hoverableButtonStyle = {
  width: "100%",
  height: "65px",
  fontSize: "2rem",
};

function Admin({ setAccessUser }) {
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
            onClick={() => {
              setModal("access-user-page");
            }}
          >
            학생 페이지 관리
          </HoverableButton>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#33c481" }}
            onClick={async () => {
              await printExcel();
            }}
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
        {getModal(modal, setAccessUser, () => {
          setModal(false);
        })}
      </div>
    </AdminContext.Provider>
  );
}

function getModal(kind, setAccessUser, close) {
  switch (kind) {
    case "create-product":
      return <CreateProductModal close={close} />;
    case "change-password":
      return <ChangePasswordModal close={close} />;
    case "access-user-page":
      return <AccessUserPageModal setAccessUser={setAccessUser} close={close} />;
    default:
      return null;
  }
}

async function printExcel() {
  return await ipcSend("app-excel-print");
}

export default Admin;
