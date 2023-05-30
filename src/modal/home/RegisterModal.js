import { useEffect, useState } from "react";
import Modal from "components/modal/Modal";
import HoverableButton from "components/hoverable_button/HoverableButton";
import FocusableInput from "components/focusable_input/FocusableInput";
import FocusableNumberInput from "components/focusable_number_input/FocusableNumberInput";
import ipcSend from "api/ipcSend";
import styles from "./RegisterModal.module.css";

const inputStyle = {
  width: "100px",
  fontSize: "1.6rem",
};
const hoverableButtonStyle = {
  width: "75px",
  height: "35px",
  fontSize: "1.3rem",
};

function RegisterModal({ userId, close }) {
  const [userData, setUserData] = useState({ grade: "", class_NM: "", number: "", name: "" });
  const [wrong, setWrong] = useState({ wrong: false, message: null });

  useEffect(() => {
    setWrong(() => {
      return { wrong: false };
    });
  }, [userData]);

  return (
    <Modal
      style={{
        content: {
          width: "550px",
          height: "270px",
        },
      }}
    >
      <div className={styles.registerModal}>
        <div className={styles.title}>학생 등록</div>
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
            <FocusableNumberInput
              style={inputStyle}
              placeholder="번호"
              value={userData.number}
              onChange={(value) => {
                setUserData((prev) => {
                  return { ...prev, number: value };
                });
              }}
            />
            <FocusableInput
              style={inputStyle}
              placeholder="이름"
              value={userData.name}
              onChange={(value) => {
                setUserData((prev) => {
                  return { ...prev, name: value };
                });
              }}
            />
          </div>
          {wrong.wrong && <div className={styles.wrongMessage}>{wrong.message}</div>}
        </div>
        <div className={styles.buttonBox}>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#4e73df" }}
            onClick={async () => {
              const result = await register(userId, userData);

              if (!result.success) {
                setWrong(() => {
                  return { wrong: true, message: result.message };
                });
              }

              close();
            }}
          >
            등록
          </HoverableButton>
          <HoverableButton style={{ ...hoverableButtonStyle, color: "#c72d1f" }} onClick={close}>
            취소
          </HoverableButton>
        </div>
      </div>
    </Modal>
  );
}

async function register(userId, userData) {
  if (!isValid(userData)) {
    return { success: false, message: "* 빈칸을 채워 주십시오" };
  }

  const { grade, class_NM, number, name } = userData;
  await ipcSend("db-student-create", { id: userId, grade, class_NM, number, name });

  return { success: true };
}

function isValid(userData) {
  if (!userData.grade || !userData.class_NM || !userData.number || !userData.name) {
    return false;
  }

  return true;
}

export default RegisterModal;
