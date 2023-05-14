import Tag from "./tag/Tag";
import Identifier from "./identifier/Identifier";
import styles from "./InfoPanel.module.css";

function InfoPanel() {
  return (
    <div className={styles.panel}>
      <Identifier data={{ grade: 1, class: 2, name: "신재훈" }} />
      <Tag data={{ name: "빌린 물품", value: "111" }} color="#1cc88a" />
      <Tag data={{ name: "연체 물품", value: "222" }} color="#f6c23e" />
      <Tag data={{ name: "연체 횟수", value: "333" }} color="#e74a3b" />
    </div>
  );
}

export default InfoPanel;
