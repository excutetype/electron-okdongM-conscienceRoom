import ProductWidgetList from "./product_widget_list/ProductWidgetList";

import styles from "./ProductManagerPanel.module.css";

function ProductManagerPanel() {
  return (
    <div className={styles.productManager}>
      <div className={styles.title}>물품 관리 창</div>
      <ProductWidgetList />
    </div>
  );
}

export default ProductManagerPanel;
