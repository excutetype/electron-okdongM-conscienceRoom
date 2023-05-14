import styles from "./Identifier.module.css";

function Identifier({ data }) {
  return (
    <span className={styles.identifier}>
      {data.grade}학년 {data.class}반 {data.name}
    </span>
  );
}

export default Identifier;
