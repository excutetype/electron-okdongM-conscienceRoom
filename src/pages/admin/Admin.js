import { useState } from "react";
import ProductManagerPanel from "layout/admin/product_manager_panel/ProductManagerPanel";
import Tool from "layout/admin/tool_panel/Tool";
import ToolButton from "layout/admin/tool_panel/tool_button/ToolButton";
import ChangePasswordModal from "modal/admin/change_password/ChangePasswordModal";
import AdminContext from "context/admin/AdminContext";

import styles from "./Admin.module.css";

function Admin() {
  const [modal, setModal] = useState("");

  return (
    <AdminContext.Provider value={{ modal, setModal }}>
      <div className={styles.root}>
        <ProductManagerPanel />
        <Tool>
          <ToolButton
            style={{ key: "", color: "#4e73df" }}
            data={{ name: "학생 페이지 관리" }}
          />
          <ToolButton
            style={{ key: "", color: "#33C481" }}
            data={{ name: "대출 목록 출력" }}
          />
          <ToolButton
            style={{ color: "#858796" }}
            data={{ key: "change-password", name: "비밀번호 변경" }}
          />
        </Tool>
        {getModal(modal)}
      </div>
    </AdminContext.Provider>
  );
}

function getModal(kind) {
  switch (kind) {
    case "change-password":
      return <ChangePasswordModal />;
    default:
      return null;
  }
}

export default Admin;
