import { useState, useEffect } from "react";
import Modal from "components/modal/Modal";
import AdminContext from "context/admin/AdminContext";
import ipcSend from "api/ipcSend";
import styles from "./ChangePasswordModal.module.css";

function ChangePasswordModal() {
  const [password, setPassword] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [isValid, setIsValid] = useState({});

  useEffect(() => {
    (async () => {
      const prev = await ipcSend("electronStore-get-password");
      setPrevPassword(prev);
    })();
  }, []);

  useEffect(() => {
    setIsValid(() => {
      return { valid: true };
    });
  }, [password]);

  return (
    <AdminContext.Consumer>
      {({ setModal }) => {
        return (
          <Modal
            data={{ isOpen: true }}
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
                <input
                  className={`${styles.input}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                {isValid.valid ? null : (
                  <div className={styles.invalidMSG}>{isValid.msg}</div>
                )}
              </div>
              <div className={styles.buttonBox}>
                <button
                  className={`${styles.button} ${styles.submit}`}
                  onClick={() => {
                    if (!password) {
                      console.log("sfds");
                      setIsValid(() => {
                        return {
                          valid: false,
                          msg: "* 비밀번호를 적어 주십시오.",
                        };
                      });
                      return;
                    }

                    if (password === prevPassword) {
                      setIsValid({
                        valid: false,
                        msg: "* 이전 비밀번호와 동일합니다.",
                      });
                      return;
                    }
                  }}
                >
                  확인
                </button>
                <button
                  className={`${styles.button} ${styles.cancel}`}
                  onClick={() => {
                    setPassword("");
                    setModal("");
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </Modal>
        );
      }}
    </AdminContext.Consumer>
  );
}

export default ChangePasswordModal;
