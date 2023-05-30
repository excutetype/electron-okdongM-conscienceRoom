import { useState } from "react";
import ipcOn from "api/ipcOn";
import Modal from "components/modal/Modal";
import styles from "./ErrorModal.module.css";
import icon from "images/modal/error/icon.png";
import errorMessageDict from "./errorMessageDict";

function ErrorModal() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({});

  ipcOn("error", (kindOfError) => {
    let message = null;
    switch (kindOfError) {
      case "database-connection":
        message = errorMessageDict.database.connection;
        break;
      case "database-crud":
        message = errorMessageDict.database.crud;
        break;
      case "electronStore-set":
        message = errorMessageDict.electronStore.set;
        break;
      case "electronStore-get":
        message = errorMessageDict.electronStore.get;
        break;
      case "app-open-serialport":
        message = errorMessageDict.app.openSerialport;
        break;
      case "app-print-Excel":
        message = errorMessageDict.app.printExcel;
        break;
      default:
        message = errorMessageDict.uncaught;
        break;
    }
    setMessage(() => {
      return message;
    });
    setShowModal(true);
  });

  return (
    <>
      {showModal && (
        <Modal
          style={{
            content: {
              width: "500px",
              height: "fit-content",
              minHeight: "200px",
            },
          }}
        >
          <div className={styles.errorModal}>
            <div className={styles.headerDesign} />
            <div className={styles.article}>
              <div className={styles.iconBox}>
                <img src={icon} alt="오류 모달 창 아이콘" width="45px" />
              </div>
              <div className={styles.messageBox}>
                <div className={styles.titleMessage}>{message?.title}</div>
                <div className={styles.descriptionMesage}>
                  {message?.descriptions.map((description, index) => {
                    return (
                      <span key={index}>
                        {`${index + 1}. ${description}`}
                        <br />
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={styles.submitBox}>
              <button
                className={styles.submit}
                onClick={() => {
                  setShowModal(false);
                }}
              >
                확인
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ErrorModal;
