import styles from "./Tag.module.css";

function Tag({ color, description, children }) {
  return (
    <div className={styles.tag} style={{ borderLeft: `8px solid ${color}` }}>
      <div className={styles.tagName} style={{ color: `${color}` }}>
        {children}
      </div>
      <div className={styles.tagValue}>{description}</div>
    </div>
  );
}

export default Tag;
