import ReactModal from "react-modal";
import styles from "./SystemModal.module.css";

function Body({ isOpen, style, children }) {
  const basicStyle = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      padding: "0px",
      backgroundColor: "#FFFFFF",
      boxShadow: "rgba(149, 157, 165, 0.4) 0px 0px 18px",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      style={{ content: { ...basicStyle.content, ...style.content } }}
    >
      <div className={styles.body}>
        <div className={styles.headerDesign} />
        {children}
      </div>
    </ReactModal>
  );
}

function Footer({ children }) {
  return <div className={styles.footer}>{children}</div>;
}

const SystemModal = { Body, Footer };

export default SystemModal;
