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
  const [accessUser, setAccessUser] = useState("");
  const [needAuthentication, setNeedAuthentication] = useState(false);

  useEffect(() => {
    if (needAuthenticationPage.includes(page)) {
      setNeedAuthentication(true);
    }
    if (page !== "user") {
      setAccessUser("");
    }
  }, [page]);

  useEffect(() => {
    if (accessUser) {
      setPage("user");
    }
  }, [accessUser]);

  return (
    <div className={styles.App}>
      <Header page={page} setPage={setPage} />
      <div className={styles.article}>
        {
          {
            home: <Home setAccessUser={setAccessUser} />,
            user: <User userId={accessUser} />,
            admin: <Admin setAccessUser={setAccessUser} />,
            setting: <Setting />,
          }[page]
        }
      </div>
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

export default App;
