import SettingWidget from "layout/setting/setting_page/setting_widget/SettingWidget";
import SettingWidgetTextInput from "layout/setting/setting_page/setting_widget/SettingWidgetTextInput";
import SettingWidgetPasswordInput from "./setting_widget/SettingWidgetPasswordInput";

function DatabaseSettingPage() {
  return (
    <>
      <SettingWidget data={{ title: "호스트" }}>
        <SettingWidgetTextInput
          style={{ width: "300px" }}
          data={{ key: "DB_HOST" }}
        />
      </SettingWidget>
      <SettingWidget data={{ title: "유저" }}>
        <SettingWidgetTextInput
          style={{ width: "180px" }}
          data={{ key: "DB_USER" }}
        />
      </SettingWidget>
      <SettingWidget data={{ title: "데이터베이스" }}>
        <SettingWidgetTextInput
          style={{ width: "240px" }}
          data={{ key: "DB_DATABASE" }}
        />
      </SettingWidget>
      <SettingWidget data={{ title: "패스워드" }}>
        <SettingWidgetPasswordInput
          style={{ width: "370px" }}
          data={{ key: "DB_PASSWORD" }}
        />
      </SettingWidget>
    </>
  );
}

export default DatabaseSettingPage;
