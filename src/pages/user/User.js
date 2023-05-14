import PrivatePanel from "../../layout/user/info_panel/InfoPanel";
import ActionPanel from "../../layout/user/borrow_button/BorrowButton";
import BorrowPanel from "../../layout/user/borrow_table_panel/BorrowTablePanel";
import BorrowModal from "layout/user/borrow_modal/BorrowModal";

import styles from "./User.module.css";

function User() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <PrivatePanel />
        <BorrowPanel />
        <ActionPanel />
        <BorrowModal data={{ isOpen: false }} />
      </div>
    </div>
  );
}

export default User;
