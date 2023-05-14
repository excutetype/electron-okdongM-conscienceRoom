import SettingContext from "context/page/SettingPage";
import Modal from "components/modal/Modal";
import styles from "./SuccessApplyModal.module.css";

function SuccessApplyModal() {
  return (
    <SettingContext.Consumer>
      {({ showSuccessModal, setShowSuccessModal }) => {
        return (
          <Modal
            style={{
              content: {
                width: "350px",
                height: "fit-content",
              },
            }}
            data={{ isOpen: showSuccessModal }}
          >
            <div className={styles.successApplyModal}>
              <div className={styles.headerDesign} />
              <div className={styles.article}>설정이 변경되었습니다.</div>
              <div className={styles.submitBox}>
                <button
                  className={styles.submit}
                  onClick={() => {
                    setShowSuccessModal(false);
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </Modal>
        );
      }}
    </SettingContext.Consumer>
  );
}

export default SuccessApplyModal;
