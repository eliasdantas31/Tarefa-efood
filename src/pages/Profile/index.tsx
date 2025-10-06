// src/pages/Profile/index.tsx
import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  PageContainer,
  TopBar,
  Logo,
  CartInfo,
  Banner,
  CategoryLabel,
  RestaurantTitle,
  ProductsGrid,
  ProductCard,
  ProductImage,
  ProductBody,
  ProductTitle,
  ProductDescription,
  ProductActions,
  AddButton
} from './style'

import Pizza from '../../assets/Pizza.png'
import Macarrao from '../../assets/Macarrao.png'
import Sushi from '../../assets/Sushi.png'
import LogoImg from '../../assets/logo.png'
import type { JSX } from 'react/jsx-runtime'
import Footer from '../../components/Footer'

type Product = {
  id: string
  title: string
  description: string
  image: string
  category: string
  price: number
}

// 🍕 Pizzas
const pizzaProducts: Product[] = [
  { id: 'p1', title: 'Pizza Marguerita', description: 'Molho de tomate, mussarela e manjericão fresco.', image: Pizza, category: 'Italiana', price: 39.9 },
  { id: 'p2', title: 'Pizza Calabresa', description: 'Calabresa fatiada, cebola e queijo derretido.', image: Pizza, category: 'Italiana', price: 42.0 },
  { id: 'p3', title: 'Pizza de cogumelo', description: 'Massa al dente com molho de cogumelos.', image: Pizza, category: 'Italiana', price: 32.5 },
  { id: 'p4', title: 'Pizza de ricota', description: 'Massa de ricota com molho de tomate.', image: Pizza, category: 'Italiana', price: 35.0 },
  { id: 'p5', title: 'Pizza de sashimi', description: 'Variedade de sashimis frescos.', image: Pizza, category: 'Italiana', price: 59.0 },
  { id: 'p6', title: 'Pizza de 4 queijos', description: 'Molho de tomate, mussarela, provolone e parmesão.', image: Pizza, category: 'Italiana', price: 65.0 }
]

// 🍣 Sushis
const sushiProducts: Product[] = [
  { id: 's1', title: 'Sashimi de atum', description: 'Sashimi de atum fresco.', image: Sushi, category: 'Japonesa', price: 25.0 },
  { id: 's2', title: 'Sashimi de salmão', description: 'Sashimi de salmão fresco.', image: Sushi, category: 'Japonesa', price: 27.0 },
  { id: 's3', title: 'Sashimi de tilápia', description: 'Sashimi de tilápia fresco.', image: Sushi, category: 'Japonesa', price: 28.0 },
  { id: 's4', title: 'Sashimi de tobiko', description: 'Sashimi de tobiko fresco.', image: Sushi, category: 'Japonesa', price: 30.0 },
  { id: 's5', title: 'Sashimi mix', description: 'Variedade de sashimis selecionados.', image: Sushi, category: 'Japonesa', price: 38.0 },
  { id: 's6', title: 'Temaki especial', description: 'Temaki com salmão, cream cheese e cebolinha.', image: Sushi, category: 'Japonesa', price: 34.0 }
]

// 🍝 Massas
const macarraoProducts: Product[] = [
  { id: 'm1', title: 'Espaguete ao sugo', description: 'Massa ao molho de tomate fresco.', image: Macarrao, category: 'Italiana', price: 25.0 },
  { id: 'm2', title: 'Macarrão aos cogumelos', description: 'Massa salteada com cogumelos e parmesão.', image: Macarrao, category: 'Italiana', price: 28.0 },
  { id: 'm3', title: 'Fettuccine Alfredo', description: 'Molho branco cremoso e queijo parmesão.', image: Macarrao, category: 'Italiana', price: 30.0 },
  { id: 'm4', title: 'Ravioli de ricota', description: 'Recheado com ricota e espinafre.', image: Macarrao, category: 'Italiana', price: 32.0 },
  { id: 'm5', title: 'Lasanha à bolonhesa', description: 'Molho bolonhesa e queijo gratinado.', image: Macarrao, category: 'Italiana', price: 35.0 },
  { id: 'm6', title: 'Penne ao pesto', description: 'Molho pesto de manjericão com parmesão.', image: Macarrao, category: 'Italiana', price: 33.0 }
]

// 🔹 Dados que chegam via navegação
type LocationState = {
  image?: string
  title?: string
  category?: string
}

export default function Profile(): JSX.Element {
  const [cartCount, setCartCount] = useState(0)
  const [, setCartItems] = useState<Product[]>([])
  const location = useLocation()
  const navigate = useNavigate()
  const state = (location.state || {}) as LocationState

  // Escolhe a lista de produtos conforme a imagem
  const visibleProducts = useMemo(() => {
    if (state.image === Pizza) return pizzaProducts
    if (state.image === Macarrao) return macarraoProducts
    if (state.image === Sushi) return sushiProducts
    return pizzaProducts
  }, [state.image])

  function addToCart(prod: Product) {
    setCartItems(prev => [...prev, prod])
    setCartCount(prev => prev + 1)
  }

  const title = state.title ?? 'Restaurante'
  const category = state.category ?? ''
  const bannerImage = state.image ?? Pizza

  return (
    <>
      <PageContainer>
        {/* HEADER / TOPBAR */}
        <TopBar>
          <span className="link" onClick={() => navigate('/')}>
            Restaurantes
          </span>
          <Logo
            src={LogoImg}
            alt="Logo efood"
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
          <CartInfo>
            <strong>{cartCount}</strong> produto(s) no carrinho
          </CartInfo>
        </TopBar>

        {/* BANNER DO RESTAURANTE */}
        <Banner style={{ backgroundImage: `url(${bannerImage})` }}>
          <CategoryLabel>{category}</CategoryLabel>
          <RestaurantTitle>{title}</RestaurantTitle>
        </Banner>

        {/* GRID DE PRODUTOS */}
        <ProductsGrid>
          {visibleProducts.map(prod => (
            <ProductCard key={prod.id}>
              <ProductImage src={prod.image} alt={prod.title} />
              <ProductBody>
                <ProductTitle>{prod.title}</ProductTitle>
                <ProductDescription>{prod.description}</ProductDescription>
              </ProductBody>
              <ProductActions>
                <span>R$ {prod.price.toFixed(2)}</span>
                <AddButton onClick={() => addToCart(prod)}>
                  Adicionar ao carrinho
                </AddButton>
              </ProductActions>
            </ProductCard>
          ))}
        </ProductsGrid>
      </PageContainer>
      <Footer />
    </>
  )
}