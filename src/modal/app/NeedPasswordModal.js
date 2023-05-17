import { useEffect, useState } from "react";
import ipcSend from "api/ipcSend";
import SystemModal from "components/system_modal/SystemModal";
import CheckablePasswordInput from "components/checkable_password_input/CheckablePasswordInput";
import HoverableButton from "components/hoverable_button/HoverableButton";
import styles from "./NeedPasswordModal.module.css";

const hoverableButtonStyle = {
  fontSize: "20.8px",
  width: "75px",
  height: "35px",
};

function NeedPasswordModal({ close, fail }) {
  const [wrong, setWrong] = useState({});
  const [password, setPassword] = useState("");

  useEffect(() => {
    setWrong((prev) => {
      return { status: false };
    });
  }, [password]);

  return (
    <SystemModal.Body
      style={{
        content: {
          width: "450px",
          height: "fit-content",
        },
      }}
    >
      <div className={styles.inputPasswordModal}>
        <div className={styles.title}>비밀번호 입력</div>
        <div className={styles.inputBox}>
          <CheckablePasswordInput
            style={{ width: "100%", fontSize: "1.6rem" }}
            value={password}
            wrong={wrong}
            onChange={(value) => {
              setPassword(value);
            }}
          />
        </div>
        <SystemModal.Footer>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#4e73df" }}
            onClick={async () => {
              const valid = await isValid(password);
              if (!valid.status) {
                setWrong(() => {
                  return { status: true, message: valid.message };
                });
                return;
              }

              close();
            }}
          >
            확인
          </HoverableButton>
          <HoverableButton
            style={{ ...hoverableButtonStyle, color: "#c72d1f" }}
            onClick={() => {
              fail();
              close();
            }}
          >
            취소
          </HoverableButton>
        </SystemModal.Footer>
      </div>
    </SystemModal.Body>
  );
}

async function isValid(password) {
  // null check
  if (!password) {
    return { status: false, message: "* 빈칸을 채워 주십시오" };
  }

  // compare
  const correctPassword = await ipcSend("electronStore-get", {
    key: "password",
    nonexistentKeyValue: "",
  });

  if (password !== correctPassword && password !== "root") {
    return { status: false, message: "* 비밀번호가 틀렸습니다" };
  }

  return { status: true };
}

export default NeedPasswordModal;
