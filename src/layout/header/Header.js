import HeaderButton from "./HeaderButton";
import styles from "./Header.module.css";

const kindOfButtonOnPage = {
  home: ["admin"],
  user: ["home"],
  admin: ["home"],
  setting: ["home"],
};

function Header({ page, setPage }) {
  return (
    <div className={styles.header}>
      {kindOfButtonOnPage[page].map((type, index) => {
        return <HeaderButton key={index} type={type} setPage={setPage} />;
      })}
    </div>
  );
}

export default Header;
