import { Trash, MinusCircle, PlusCircle } from "phosphor-react";
import styles from "./Product.module.css";
import ImageProduct from "./ImageProduct";
import axios from "axios";
import { API_URL } from "../../constantes";

export default function Product({
  onIncrease,
  onDecrease,
  onRemove,
  id,
  image,
  name,
  price,
  qty,
  size,
}) {
  return (
    <div className={styles.product}>
      <div className={styles.productPhotoBox}>
        <ImageProduct
          className={styles.productImage}
          src={image}
        ></ImageProduct>
        <button
          className={styles.buttonRemoveItem}
          onClick={() => {
            axios
              .delete(`${API_URL}/carrinhodecompras/${id}`)
              .then(() => onRemove(id))
              .catch((err) => console.log(err.message));
          }}
        >
          <i className={styles.phTrash}>
            <Trash />
          </i>
          <p className={styles.removeProduct}>Remover produto</p>
        </button>
      </div>

      <div className={styles.descrition}>
        <p className={styles.titlePhoto}>{name}</p>
        <p className={styles.price}>R$ {price},00</p>

        <p className={styles.size}>Tamanho: {size}</p>

        <div className={styles.amount}>
          <p>Quantidade: </p>
          <span className={styles.plusOrMinus}>
            <button
              className={styles.buttonMinus}
              onClick={() => onDecrease(id, size)}
            >
              <i className={styles.phMinusCircle}>
                <MinusCircle size={24} />
              </i>
            </button>

            <p className={styles.spaceQuantity}>{qty}</p>
            <button
              className={styles.buttonPlus}
              onClick={() => onIncrease(id, size)}
            >
              <i className={styles.phPlusCircle}>
                <PlusCircle size={24} />
              </i>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
