import { useState } from "react";
import ipcOn from "api/ipcOn";
import ipcSend from "api/ipcSend";
import RegisterModal from "modal/home/RegisterModal";
import styles from "./Home.module.css";
import IDCardImage from "images/page/home/ID_card.png";

function Home({ setAccessUser }) {
  ipcOn("app-scanning-card", async (payload) => {
    const { userId } = payload;

    if (await isExistUser(userId)) {
      setAccessUser(userId);
    } else {
      setUserId(userId);
      setShowRegisterModal(true);
    }
  });

  const [userId, setUserId] = useState("");
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <div className={styles.root}>
      <div className={styles.home}>
        <img src={IDCardImage} width="200px" alt="student ID card" className={styles.image} />
        <span className={styles.message}>학생증을 리더기에 찍어주세요</span>
        {showRegisterModal && (
          <RegisterModal
            userId={userId}
            close={() => {
              setShowRegisterModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

async function isExistUser(userId) {
  const user = await ipcSend("db-student-read-id", { id: userId });

  if (Object.keys(user).length === 0) {
    return false;
  }

  return true;
}

export default Home;
