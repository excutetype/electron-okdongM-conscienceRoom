import SystemModal from "components/system_modal/SystemModal";
import HoverableButton from "components/hoverable_button/HoverableButton";
import styles from "./SuccessApplyModal.module.css";

function SuccessApplyModal({ setIsSuccessfulApply }) {
  return (
    <SystemModal.Body
      isOpen={true}
      style={{
        content: {
          width: "400px",
          height: "fit-content",
        },
      }}
    >
      <div className={styles.article}>설정이 저장되었습니다.</div>
      <SystemModal.Footer>
        <HoverableButton
          size={20.8}
          color="#4e73df"
          onClick={() => {
            setIsSuccessfulApply(false);
          }}
        >
          확인
        </HoverableButton>
      </SystemModal.Footer>
    </SystemModal.Body>
  );
}

export default SuccessApplyModal;
