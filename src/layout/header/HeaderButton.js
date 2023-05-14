import AppContext from "context/app/AppContext";
import styles from "./HeaderButton.module.css";
import homeImage from "images/header/home.png";
import adminImage from "images/header/admin.png";
import settingImage from "images/header/setting.png";

function HeaderButton({ data }) {
  const typeMapping = {
    home: homeImage,
    admin: adminImage,
    setting: settingImage,
  };

  return (
    <AppContext.Consumer>
      {({ setPage, setNeedPassword }) => {
        return (
          <button
            className={styles.headerButton}
            onClick={() => {
              if (data.type === "admin" || data.type === "setting") {
                setNeedPassword(true);
              }
              setPage(data.type);
            }}
          >
            <img src={typeMapping[data.type]} className={styles.image} alt="" />
          </button>
        );
      }}
    </AppContext.Consumer>
  );
}

export default HeaderButton;
