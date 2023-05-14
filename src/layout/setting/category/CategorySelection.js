import SettingContext from "context/page/SettingPage";
import styles from "./CategorySelection.module.css";

function CategorySelection({ data }) {
  return (
    <SettingContext.Consumer>
      {({ settingPage, setSettingPage }) => {
        return (
          <button
            className={`${styles.categorySelection} ${
              settingPage === data.pageName ? styles.selected : null
            }`}
            onClick={() => {
              setSettingPage(data.pageName);
            }}
          >
            {data.name}
          </button>
        );
      }}
    </SettingContext.Consumer>
  );
}

export default CategorySelection;
