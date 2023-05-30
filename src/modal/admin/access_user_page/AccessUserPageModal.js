import { useEffect, useState } from "react";
import Modal from "components/modal/Modal";
import HoverableButton from "components/hoverable_button/HoverableButton";
import FocusableInput from "components/focusable_input/FocusableInput";
import FocusableNumberInput from "components/focusable_number_input/FocusableNumberInput";
import ipcSend from "api/ipcSend";
import styles from "./AccessUserPageModal.module.css";

const inputStyle = {
  width: "100px",
  fontSize: "1.6rem",
};
const hoverableButtonStyle = {
  width: "75px",
  height: "35px",
  fontSize: "1.3rem",
};

function AccessUserPageModal({ setAccessUser, close }) {
  const [userData, setUserData] = useState({ grade: null, class_NM: null, number: null });
  const [wrong, setWrong] = useState({});

  useEffect(() => {
    setWrong(() => {
      return { isWrong: false };
    });
  }, [userData]);

  return (
    <Modal
      style={{
        content: {
          width: "450px",
          height: "245px",
        },
      }}
    >
      <div className={styles.accessuserPageModal}>
        <div className={styles.title}>학생 페이지 관리</div>
        <div className={styles.article}>
          <div className={styles.inputBox}>
            <FocusableNumberInput
              style={inputStyle}
              placeholder="학년"
              value={userData.grade}
              onChange={(value) => {
                setUserData((prev) => {
                  return { ...prev, grade: value };
                });
              }}
            />
            <FocusableNumberInput
              style={inputStyle}
              placeholder="반"
              value={userData.class_NM}
              onChange={(value) => {
                setUserData((prev) => {
                  return { ...prev, class_NM: value };
                });
              }}
            />
            <FocusableInput
              style={inputStyle}
              placeholder="번호"
              value={userData.number}
              onChange={(value) => {
                setUserData((prev) => {
                  return { ...prev, number: value };
                });
              }}
            />
          </div>
          <div className={styles.wrongMessageBox}>{wrong.isWrong ? wrong.message : null}</div>
        </div>

        <div className={styles.buttonBox}>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#4e73df" }}
            onClick={async () => {
              const result = await accessUserPage(userData, setAccessUser);

              if (!result.success) {
                setWrong(() => {
                  return { isWrong: true, message: result.message };
                });
              }
            }}
          >
            확인
          </HoverableButton>
          <HoverableButton style={{ ...hoverableButtonStyle, color: "#c72d1f" }} onClick={close}>
            취소
          </HoverableButton>
        </div>
      </div>
    </Modal>
  );
}

async function accessUserPage(userData, setAccessUser) {
  const valid = isValid(userData);
  if (!valid.valid) {
    return { success: false, message: valid.message };
  }

  const { id } = await ipcSend("db-student-read-attributes", userData);
  if (!id) {
    return { success: false, message: "* 존재하지 않는 학생입니다" };
  }

  setAccessUser(id);
  return { success: true };
}

function isValid(data) {
  for (const key in data) {
    if (!data[key]) {
      return { valid: false, message: "* 빈칸 없이 채워 주십시오" };
    }
  }

  return { valid: true };
}

export default AccessUserPageModal;
