import { useState, useEffect } from "react";
import AppContext from "context/app/AppContext";
import SystemModal from "components/system_modal/SystemModal";
import HoverableButton from "components/hoverable_button/HoverableButton";
import ipcSend from "api/ipcSend";
import styles from "./InputPasswordModal.module.css";

function InputPasswordModal() {
  const [password, setPassword] = useState("");
  const [correct, setCorrect] = useState("");
  const [wrongPassword, setWrongPassword] = useState(false);

  useEffect(() => {
    (async () => {
      const correctPassword = await ipcSend("electronStore-get-password");
      setCorrect(correctPassword);
    })();
  }, []);

  useEffect(() => {
    setWrongPassword(false);
  }, [password]);

  return (
    <AppContext.Consumer>
      {({ setPage, needPassword, setNeedPassword }) => {
        return (
          <SystemModal.Body
            isOpen={needPassword}
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
                <input
                  className={`${styles.input} ${
                    wrongPassword ? styles.wrongPassword : null
                  }`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <SystemModal.Footer order={"end"}>
                <HoverableButton
                  size={20.8}
                  color="#4e73df"
                  onClick={() => {
                    if (password !== correct) {
                      setWrongPassword(true);
                      return;
                    }

                    setPassword("");
                    setWrongPassword(false);
                    setNeedPassword(false);
                  }}
                >
                  확인
                </HoverableButton>
                <HoverableButton
                  size={20.8}
                  color="#c72d1f"
                  onClick={() => {
                    setPassword("");
                    setWrongPassword(false);
                    setNeedPassword(false);
                    setPage("home");
                  }}
                >
                  취소
                </HoverableButton>
              </SystemModal.Footer>
            </div>
          </SystemModal.Body>
        );
      }}
    </AppContext.Consumer>
  );
}

export default InputPasswordModal;
