import { useEffect, useState } from "react";
import ProductWidget from "./product_widget/ProductWidget";
import AddProductButton from "./add_product_button/AddProductButton";
import ipcSend from "api/ipcSend";
import styles from "./ProductManagerPanel.module.css";

function ProductManagerPanel({ openCreateProductModal }) {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    (async () => {
      const products = await ipcSend("db-product-read-all");
      setProductList(() => {
        return products;
      });
    })();
  }, [productList]);

  return (
    <div className={styles.productManager}>
      <div className={styles.title}>물품 관리 창</div>
      <div className={styles.productWidgetList}>
        {productList.map((product, index) => {
          return (
            <ProductWidget
              key={index}
              deleteProduct={async () => {
                await ipcSend("db-product-delete", { id: product.id });
                setProductList(() => []);
              }}
            >
              {product.name}
            </ProductWidget>
          );
        })}
        <AddProductButton openCreateProductModal={openCreateProductModal} />
      </div>
    </div>
  );
}

export default ProductManagerPanel;
