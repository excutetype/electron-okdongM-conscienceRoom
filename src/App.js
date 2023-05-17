import { useState, useEffect } from "react";
import usePrevious from "hooks/usePrevious";
import Header from "layout/header/Header";
import Home from "pages/home/Home";
import User from "pages/user/User";
import Admin from "pages/admin/Admin";
import Setting from "pages/setting/Setting";
import ErrorModal from "modal/error/ErrorModal";
import NeedPasswordModal from "modal/app/NeedPasswordModal";
import styles from "./App.module.css";

const needAuthenticationPage = ["admin", "setting"];

function App() {
  const [page, setPage] = useState("home");
  const [prevPage] = useState(usePrevious(page) ?? "home");
  const [needAuthentication, setNeedAuthentication] = useState(false);

  console.log(page, prevPage);

  useEffect(() => {
    if (needAuthenticationPage.includes(page)) {
      setNeedAuthentication(true);
    }
  }, [page]);

  return (
    <div className={styles.App}>
      <Header page={page} setPage={setPage} />
      <div className={styles.article}>{getPage(page)}</div>
      <ErrorModal />
      {needAuthentication && (
        <NeedPasswordModal
          close={() => {
            setNeedAuthentication(false);
          }}
          fail={() => {
            setPage(prevPage);
          }}
        />
      )}
    </div>
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
