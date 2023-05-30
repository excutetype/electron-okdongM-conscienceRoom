import styles from "./FocusableInput.module.css";

function FocusableInput({ style, placeholder, value, onChange }) {
  return (
    <input
      placeholder={placeholder}
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
