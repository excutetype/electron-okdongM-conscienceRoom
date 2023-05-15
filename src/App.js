import { useState } from "react";
import Header from "layout/header/Header";
import Home from "pages/home/Home";
import User from "pages/user/User";
import Admin from "pages/admin/Admin";
import Setting from "pages/setting/Setting";
import ErrorModal from "modal/error/ErrorModal";
import InputPasswordModal from "modal/app/InputPasswordModal";
import AppContext from "context/app/AppContext";
import styles from "./App.module.css";

function App() {
  const [page, setPage] = useState("home");
  const [needPassword, setNeedPassword] = useState(false);
  return (
    <AppContext.Provider
      value={{ page, setPage, needPassword, setNeedPassword }}
    >
      <div className={styles.App}>
        <Header />
        <div className={styles.article}>{getPage(page)}</div>
        <ErrorModal />
        <InputPasswordModal />
      </div>
    </AppContext.Provider>
  );
}

function getPage(currentPage) {
  // eslint-disable-next-line default-case
  switch (currentPage) {
    case "home":
      return <Home />;
    case "user":
      return <User />;
    case "admin":
      return <Admin />;
    case "setting":
      return <Setting />;
  }
}

export default App;
