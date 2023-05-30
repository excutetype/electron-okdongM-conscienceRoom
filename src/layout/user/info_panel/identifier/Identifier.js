import styles from "./Identifier.module.css";

function Identifier({ grade, class_NM, name }) {
  return (
    <span className={styles.identifier}>
      {grade}학년 {class_NM}반 {name}
    </span>
  );
}

export default Identifier;
