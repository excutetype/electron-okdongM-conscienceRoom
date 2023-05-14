import { useState, useEffect } from "react";
import AppContext from "context/app/AppContext";
import Modal from "components/modal/Modal";
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
          <Modal
            data={{ isOpen: needPassword }}
            style={{
              content: {
                width: "450px",
                height: "220px",
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
              <div className={styles.buttonBox}>
                <button
                  className={`${styles.button} ${styles.submit}`}
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
                </button>
                <button
                  className={`${styles.button} ${styles.cancel}`}
                  onClick={() => {
                    setPassword("");
                    setWrongPassword(false);
                    setNeedPassword(false);
                    setPage("home");
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </Modal>
        );
      }}
    </AppContext.Consumer>
  );
}

export default InputPasswordModal;
