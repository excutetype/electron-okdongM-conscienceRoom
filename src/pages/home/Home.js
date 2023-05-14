import styles from "./Home.module.css";

import IDCardImage from "images/page/home/ID_card.png";

import ipcSend from "api/ipcSend";

function Home() {
  return (
    <div className={styles.root}>
      <div className={styles.home}>
        <img
          src={IDCardImage}
          width="200px"
          alt="student ID card"
          className={styles.image}
        />
        <span className={styles.message}>학생증을 리더기에 찍어주세요</span>
        <button onClick={async () => {}}>테스트</button>
      </div>
    </div>
  );
}

export default Home;
