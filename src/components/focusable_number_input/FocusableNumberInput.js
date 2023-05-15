import styles from "./FocusableNumberInput.module.css";

function FocusableNumberInput({ length, fontSize, value, onChange }) {
  return (
    <input
      type="number"
      className={styles.input}
      style={{ fontSize, width: length }}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default FocusableNumberInput;
