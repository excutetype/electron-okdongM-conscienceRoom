import ReactModal from "react-modal";

function Modal({ style, children }) {
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
      isOpen={true}
      style={{ content: { ...basicStyle.content, ...style.content } }}
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
