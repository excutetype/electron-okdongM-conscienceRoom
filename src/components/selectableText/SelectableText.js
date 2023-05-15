import styles from "./SelectableText.module.css";

function SelectableText({ selected, onClick, size, children }) {
  return (
    <span
      className={`${styles.text} ${selected ? styles.selected : null}`}
      style={{ fontSize: size }}
      onClick={onClick}
    >
      {children}
    </span>
  );
}

export default SelectableText;
