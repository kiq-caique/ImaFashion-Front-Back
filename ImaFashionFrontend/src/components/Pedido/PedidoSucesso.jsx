import React from 'react'
import styles from "../Checkout/Checkout.module.css";

function PedidoSucesso() {
  return (
    <div>
        <h1>Parabéns!</h1>
        <footer className={styles.footer}>
        <a href="/">Voltar para o site</a>
        </footer>
        
    </div>
  )
}

export default PedidoSucesso