import styles from "./ProductChoiceChip.module.css";

function ProductChoiceChip({ isSelected, onClick, children }) {
  const fontSize = 40 - children.length * 2;
  return (
    <div
      className={`${styles.choiceChip} ${isSelected ? styles.selected : null}`}
      style={{ fontSize }}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default ProductChoiceChip;
