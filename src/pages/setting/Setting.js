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

function Setting() {
  const [settingPage, setSettingPage] = useState("general");
  const [settingValue, setSettingValue] = useState({});
  const [isSuccessfulApply, setIsSuccessfulApply] = useState(false);

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
            size={20.8}
            color="#4e73df"
            onClick={() => {
              applyButtonClickHandler(
                settingPage,
                settingValue,
                setIsSuccessfulApply
              );
            }}
          >
            저장
          </HoverableButton>
        </ApplyButtonBox>
        {isSuccessfulApply && (
          <SuccessApplyModal setIsSuccessfulApply={setIsSuccessfulApply} />
        )}
      </div>
    </div>
  );
}

function applyButtonClickHandler(
  settingPage,
  settingValue,
  setIsSuccessfulApply
) {
  ipcSend("electronStore-set", { key: settingPage, value: settingValue }).then(
    () => {
      setIsSuccessfulApply(true);
    }
  );
}

export default Setting;
