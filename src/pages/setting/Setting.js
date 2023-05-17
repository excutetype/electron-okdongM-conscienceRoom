import { useState, useEffect } from "react";
import ipcSend from "api/ipcSend";
import Category from "layout/setting/category/Category";
import SelectableText from "components/selectableText/SelectableText";
import SettingPage from "layout/setting/setting_page/SettingPage";
import GeneralPage from "layout/setting/setting_page/GeneralPage";
import ApplyButtonBox from "layout/setting/apply_button/ApplyButtonBox";
import HoverableButton from "components/hoverable_button/HoverableButton";
import SuccessApplyModal from "modal/setting/SuccessApplyModal";
import styles from "./Setting.module.css";

const hoverableButtonStyle = {
  fontSize: "20.8px",
  color: "#4e73df",
  width: "75px",
  height: "35px",
};

function Setting() {
  const [settingPage, setSettingPage] = useState("general");
  const [settingValue, setSettingValue] = useState({});
  const [settingChange, setSettingChange] = useState(false);

  useEffect(() => {
    (async () => {
      setSettingValue(
        await ipcSend("electronStore-get", {
          key: settingPage,
          nonexistentKeyValue: {},
        })
      );
    })();
  }, [settingPage]);

  const settingPageEnum = {
    general: <GeneralPage values={settingValue} setter={setSettingValue} />,
  };

  return (
    <div className={styles.root}>
      <div className={styles.setting}>
        <Category>
          <SelectableText
            size={"2rem"}
            selected={settingPage === "general"}
            onClick={() => {
              setSettingPage("normal");
            }}
          >
            일반
          </SelectableText>
        </Category>
        <SettingPage>{settingPageEnum[settingPage]}</SettingPage>
        <ApplyButtonBox>
          <HoverableButton
            style={hoverableButtonStyle}
            onClick={() => {
              applyButtonClickHandler(
                settingPage,
                settingValue,
                setSettingChange
              );
            }}
          >
            저장
          </HoverableButton>
        </ApplyButtonBox>
        {settingChange && (
          <SuccessApplyModal
            close={() => {
              setSettingChange(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function applyButtonClickHandler(settingPage, settingValue, setSettingChange) {
  ipcSend("electronStore-set", { key: settingPage, value: settingValue }).then(
    () => {
      setSettingChange(true);
    }
  );
}

export default Setting;
