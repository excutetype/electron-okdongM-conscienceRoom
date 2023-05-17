import styles from "./FocusableInput.module.css";

function FocusableInput({ style, value, onChange }) {
  return (
    <input
      className={styles.input}
      style={style}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}

export default FocusableInput;
