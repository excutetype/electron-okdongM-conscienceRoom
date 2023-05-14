import styles from "./Tag.module.css";

function Tag({ color, data }) {
  return (
    <div className={styles.tag} style={{ borderLeft: `8px solid ${color}` }}>
      <div className={styles.tagName} style={{ color: `${color}` }}>
        {data.name}
      </div>
      <div className={styles.tagValue}>{data.value}</div>
    </div>
  );
}

export default Tag;
