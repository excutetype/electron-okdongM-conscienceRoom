import styles from "./FocusableInput.module.css";

function FocusableInput({ length, fontSize, value, onChange }) {
  return (
    <input
      className={styles.input}
      style={{ fontSize, width: length }}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default FocusableInput;
