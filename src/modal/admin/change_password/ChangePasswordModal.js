import { useState } from "react";
import Modal from "components/modal/Modal";
import CheckablePasswordInput from "components/checkable_password_input/CheckablePasswordInput";
import HoverableButton from "components/hoverable_button/HoverableButton";
import ipcSend from "api/ipcSend";
import styles from "./ChangePasswordModal.module.css";

const checkablePasswordInputStyle = {
  width: "100%",
  fontSize: "1.6rem",
};
const hoverableButtonStyle = {
  width: "75px",
  height: "35px",
  fontSize: "1.3rem",
};

function ChangePasswordModal({ close }) {
  const [inputValue, setInputValue] = useState("");
  const [wrong, setWrong] = useState({});

  return (
    <Modal
      style={{
        content: {
          width: "450px",
          height: "230px",
        },
      }}
    >
      <div className={styles.inputPasswordModal}>
        <div className={styles.title}>비밀번호 수정</div>
        <div className={styles.inputBox}>
          <CheckablePasswordInput
            style={checkablePasswordInputStyle}
            value={inputValue}
            wrong={wrong}
            onChange={(value) => {
              setInputValue(value);
            }}
          />
        </div>
        <div className={styles.buttonBox}>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#4e73df" }}
            onClick={async () => {
              const result = await changePassword(inputValue);

              if (!result.status) {
                setWrong(() => {
                  return { status: true, message: result.message };
                });
                return;
              }

              close();
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

async function changePassword(value) {
  const prevPassword = await ipcSend("electronStore-get", {
    key: "password",
    nonexistentKeyValue: "",
  });

  const valid = isValid(value, prevPassword);

  if (!valid.status) {
    return { status: false, message: valid.message };
  }

  ipcSend("electronStore-set", {
    key: "password",
    value,
  });

  return { status: true };
}

function isValid(value, prevPassword) {
  if (!value) {
    return { status: false, message: "* 빈칸 없이 채워 주십시오" };
  }

  if (value === prevPassword) {
    return { status: false, message: "* 이전 비밀번호와 동입합니다" };
  }

  return { status: true };
}

export default ChangePasswordModal;
