import SystemModal from "components/system_modal/SystemModal";
import HoverableButton from "components/hoverable_button/HoverableButton";
import styles from "./SuccessApplyModal.module.css";

const hoverableButtonStyle = {
  fontSize: "20.8px",
  color: "#4e73df",
  width: "75px",
  height: "35px",
};

function SuccessApplyModal({ close }) {
  return (
    <SystemModal.Body
      style={{
        content: {
          width: "400px",
          height: "fit-content",
        },
      }}
    >
      <div className={styles.article}>설정이 저장되었습니다.</div>
      <SystemModal.Footer>
        <HoverableButton style={hoverableButtonStyle} onClick={close}>
          확인
        </HoverableButton>
      </SystemModal.Footer>
    </SystemModal.Body>
  );
}

export default SuccessApplyModal;
