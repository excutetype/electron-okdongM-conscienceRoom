import styles from "./HeaderButton.module.css";
import homeImage from "images/header/home.png";
import adminImage from "images/header/admin.png";
import settingImage from "images/header/setting.png";

const typeMapping = {
  home: homeImage,
  admin: adminImage,
  setting: settingImage,
};

function HeaderButton({ type, setPage }) {
  return (
    <button
      className={styles.headerButton}
      onClick={() => {
        setPage(type);
      }}
    >
      <img src={typeMapping[type]} className={styles.image} alt="" />
    </button>
  );
}

export default HeaderButton;
