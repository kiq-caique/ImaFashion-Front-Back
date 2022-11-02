import { Link } from 'react-router-dom'
import { Container, TextLink } from './styles'

import logoImg from '../../assets/logo-dark.png'

import { MagnifyingGlass, ShoppingCart } from 'phosphor-react'
import { RiMenu3Fill } from 'react-icons/ri'

import { useContext } from 'react'
import { CartContext } from '../../context/CartContext/cartContext'

export function Header({ setMenuIsVisible }) {
  const { cart, cartItemsNumber } = useContext(CartContext)

  return (
    <Container>
      <section>
        <Link to={`/`}>
          <img src={logoImg} width="200px" alt="Logo" />
        </Link>

        <nav>
          <Link to="/">Início</Link>
          <Link to="/#produtos">Produtos</Link>
          <Link to="/#quemSomos">Quem somos</Link>
          <Link to="/#newsletter">NewsLetter</Link>
          <Link to="/#contato">Contato</Link>
        </nav>
      </section>

      <section className="icons">
        <Link to="carrinho">
          <ShoppingCart className="ShoppingIcon" />
          <TextLink className="CartLength">{cartItemsNumber}</TextLink>
        </Link>

        <Link to="busca">
          <MagnifyingGlass className="icon" />
        </Link>

        <RiMenu3Fill
          onClick={() => setMenuIsVisible(true)}
          className="mobile"
        />
      </section>
    </Container>
  )
}
