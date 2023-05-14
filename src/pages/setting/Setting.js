import { useState, useEffect } from "react";
import SettingContext from "context/page/SettingPage";
import ipcSend from "api/ipcSend";
import Category from "layout/setting/category/Category";
import CategorySelection from "layout/setting/category/CategorySelection";
import DatabaseSettingPage from "layout/setting/setting_page/DatabaseSettingPage";
import ApplyButton from "layout/setting/apply_button/ApplyButton";
import SuccessApplyModal from "modal/setting/SuccessApplyModal";
import styles from "./Setting.module.css";

function Setting() {
  const [settingPage, setSettingPage] = useState("normal");
  const [settingValue, setSettingValue] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    (async () => {
      // eslint-disable-next-line default-case
      switch (settingPage) {
        case "database":
          setSettingValue(await ipcSend("electronStore-get-database-setting"));
          break;
      }
    })();
  }, [settingPage]);

  return (
    <div className={styles.root}>
      <div className={styles.setting}>
        <SettingContext.Provider
          value={{
            settingPage,
            setSettingPage,
            settingValue,
            setSettingValue,
            showSuccessModal,
            setShowSuccessModal,
          }}
        >
          <Category>
            <CategorySelection data={{ name: "일반", pageName: "normal" }} />
            <CategorySelection
              data={{ name: "데이터베이스", pageName: "database" }}
            />
          </Category>
          <div className={styles.settingPage}>
            {getSettingPage(settingPage)}
          </div>
          <ApplyButton />
          <SuccessApplyModal />
        </SettingContext.Provider>
      </div>
    </div>
  );
}

function getSettingPage(page) {
  // eslint-disable-next-line default-case
  switch (page) {
    case "database":
      return <DatabaseSettingPage />;
  }
}

export default Setting;
