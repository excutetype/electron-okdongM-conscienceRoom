import AppContext from "context/app/AppContext";
import HeaderButton from "./HeaderButton";
import styles from "./Header.module.css";

function Header() {
  const kindOfButtonOnPage = {
    home: ["setting", "admin"],
    user: ["home"],
    admin: ["home"],
    setting: ["home"],
  };

  return (
    <AppContext.Consumer>
      {({ page }) => {
        return (
          <div className={styles.header}>
            {kindOfButtonOnPage[page].map((type, index) => {
              return <HeaderButton key={index} data={{ type }} />;
            })}
          </div>
        );
      }}
    </AppContext.Consumer>
  );
}

export default Header;
