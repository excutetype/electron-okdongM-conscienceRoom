import ReactModal from "react-modal";
ReactModal.setAppElement("#root");

function BorrowModal({ data }) {
  return <ReactModal isOpen={data.isOpen}>hello world</ReactModal>;
}

export default BorrowModal;
