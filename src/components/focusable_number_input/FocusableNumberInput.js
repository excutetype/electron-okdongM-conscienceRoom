import styles from "./FocusableNumberInput.module.css";

function FocusableNumberInput({ style, placeholder, value, onChange }) {
  return (
    <input
      type="number"
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

export default FocusableNumberInput;
