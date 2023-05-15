import SettingBox from "./setting_box/SettingBox";
import FocusableNumberInput from "components/focusable_number_input/FocusableNumberInput";

function GeneralPage({ values, setter }) {
  return (
    <>
      <SettingBox title="대출 기간">
        <FocusableNumberInput
          length="100px"
          fontSize="1.3rem"
          value={values["BORROW_PERIOD"] || ""}
          onChange={(value) => {
            setter((prev) => {
              const obj = { ...prev };
              obj["BORROW_PERIOD"] = value;
              return obj;
            });
          }}
        />
      </SettingBox>
    </>
  );
}

export default GeneralPage;
