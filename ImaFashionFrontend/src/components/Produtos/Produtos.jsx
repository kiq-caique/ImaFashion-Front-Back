import styles from './Produtos.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { CartContext } from '../../context/CartContext/cartContext'

export default function Produtos() {
  const { estoque } = useContext(CartContext)

  return (
    <section id="produtos" className={styles.shopsection}>
      {estoque?.map(produto => {
        return (
          <div key={produto.id}>
            <div className={styles.carditem}>
              <Link to={`/productPage/${produto.id}`}>
                <img src={produto.img} />
                <div>
                  <h3>{produto.productName}</h3>
                  <p>
                    <span>R$ </span>
                    <span>{produto.productPrice}</span>
                    <span>,00</span>
                  </p>
                  <p>
                    <span>{produto.productDivision}</span>
                  </p>
                  <p>
                    <button className={styles.addproductbtn}>
                      Ver Produto
                    </button>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </section>
  )
}
