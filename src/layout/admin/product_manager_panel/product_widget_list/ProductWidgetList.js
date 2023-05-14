import ProductWidget from "./ProductWidget";
import AddButton from "./AddButton";

import styles from "./ProductWidgetList.module.css";

function ProductWidgetList() {
  return (
    <div className={styles.productWidgetList}>
      <ProductWidget data={{ name: "우산" }} />
      <AddButton />
    </div>
  );
}

export default ProductWidgetList;
