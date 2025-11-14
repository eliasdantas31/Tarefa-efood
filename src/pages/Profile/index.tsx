// src/pages/Profile/index.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  PageContainer,
  TopBar,
  TopBarContainer,
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
  AddButton,
  ProductContainer,
  ModalOverlay,
  ModalContainer,
  ModalImage,
  ModalContent,
  ModalTitle,
  ModalDescription,
  ModalActions,
  ModalButtons,
  CloseButton,
  BannerContainer,
  ModalText
} from './style'

import LogoImg from '../../assets/logo.png'
import CloseIcon from '../../assets/close button.png'
import Footer from '../../components/Footer'
import { formatBRL } from '../../utils/price'
import type { JSX } from 'react/jsx-runtime'

type LocationState = {
  restaurantId?: number
  image?: string
  title?: string
  category?: string
}

type ApiProduct = {
  id: number
  foto: string
  nome: string
  descricao: string
  porcao?: string
  preco: number
}

type ApiRestaurant = {
  id: number
  titulo: string
  destacado: boolean
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  cardapio: ApiProduct[]
}

function normalizeImgUrl(url?: string): string {
  const trimmed = (url || '').trim()
  if (!trimmed) return ''
  if (typeof window !== 'undefined' && window.location.protocol === 'https:' && trimmed.startsWith('http://')) {
    return trimmed.replace('http://', 'https://')
  }
  return trimmed
}

export default function Profile(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const state = (location.state || {}) as LocationState

  const [cartCount, setCartCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restaurant, setRestaurant] = useState<ApiRestaurant | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState<ApiProduct | null>(null)
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null) // <- NOVO STATE
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api-ebac.vercel.app/api/efood/restaurantes', {
          cache: 'no-store'
        } as RequestInit)
        if (!res.ok) throw new Error('Falha ao buscar restaurantes')
        const data: ApiRestaurant[] = await res.json()

        // Seleciona restaurante pelo id (preferência), título ou tipo vindo do state
        const byId = state.restaurantId
          ? data.find((r) => r.id === Number(state.restaurantId))
          : undefined

        const byTitle = !byId && state.title
          ? data.find((r) => r.titulo.trim().toLowerCase() === state.title!.trim().toLowerCase())
          : undefined

        const byType = !byId && !byTitle && state.category
          ? data.find((r) => r.tipo.trim().toLowerCase() === state.category!.trim().toLowerCase())
          : undefined

        setRestaurant(byId || byTitle || byType || data[0] || null)
        setError(null)
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Erro inesperado'
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [state.restaurantId, state.title, state.category])

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false)
    }
    window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [])

  useEffect(() => {
    if (modalOpen) {
      closeButtonRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      openButtonRef.current?.focus()
      setModalImageSrc(null) // <- limpa quando fecha
    }
  }, [modalOpen])

  const bannerImage = normalizeImgUrl(restaurant?.capa ?? state.image)
  const title = restaurant?.titulo ?? state.title ?? 'Restaurante'
  const category = restaurant?.tipo ?? state.category ?? ''
  const products = useMemo(() => (restaurant?.cardapio ?? []).slice(0, 6), [restaurant])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function addToCart(_prod: ApiProduct) {
    setCartCount((prev) => prev + 1)
  }

  function openModal(prod: ApiProduct, btn: HTMLButtonElement | null) {
    setSelected(prod)
    setModalOpen(true)
    openButtonRef.current = btn

    // TENTAR PEGAR A MESMA IMAGEM DO CARD
    try {
      const imgEl = document.querySelector(
        `img[data-prod-id="${prod.id}"]`
      ) as HTMLImageElement | null

      console.log('Imagem do card encontrada para o produto', prod.id, imgEl?.src)

      const src = imgEl?.src || normalizeImgUrl(prod.foto)
      setModalImageSrc(src)
    } catch (err) {
      console.warn('Erro ao buscar imagem do card, usando foto da API', err)
      setModalImageSrc(normalizeImgUrl(prod.foto))
    }
  }

  function confirmAdd() {
    if (selected) addToCart(selected)
    setModalOpen(false)
  }

  return (
    <>
      <PageContainer>
        <TopBar>
          <TopBarContainer>
            <span className="link" onClick={() => navigate('/')}>Restaurantes</span>
            <Logo src={LogoImg} alt="Logo efood" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
            <CartInfo><strong>{cartCount}</strong> produto(s) no carrinho</CartInfo>
          </TopBarContainer>
        </TopBar>

        <Banner style={{ backgroundImage: `url(${bannerImage})` }}>
          <BannerContainer>
            <CategoryLabel>{category}</CategoryLabel>
            <RestaurantTitle>{title}</RestaurantTitle>
          </BannerContainer>
        </Banner>

        <ProductContainer>
          <ProductsGrid>
            {loading && (
              <ProductCard><ProductBody><ProductTitle>Carregando...</ProductTitle></ProductBody></ProductCard>
            )}

            {!loading && error && (
              <ProductCard>
                <ProductBody>
                  <ProductTitle>Erro</ProductTitle>
                  <ProductDescription>{error}</ProductDescription>
                </ProductBody>
              </ProductCard>
            )}

            {!loading && !error && products.map((prod) => (
              <ProductCard key={prod.id}>
                <ProductImage
                  data-prod-id={prod.id}
                  src={normalizeImgUrl(prod.foto)}
                  alt={prod.nome}
                  loading="lazy"
                />
                <ProductBody>
                  <ProductTitle>{prod.nome}</ProductTitle>
                  <ProductDescription>{prod.descricao}</ProductDescription>
                </ProductBody>
                <AddButton onClick={(e) => openModal(prod, e.currentTarget)}>
                  Mais detalhes
                </AddButton>
              </ProductCard>
            ))}
          </ProductsGrid>
        </ProductContainer>
      </PageContainer>

      <Footer />

      {modalOpen && selected && (
        <ModalOverlay onClick={() => setModalOpen(false)} aria-hidden>
          <ModalContainer
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              aria-label="Fechar"
              ref={closeButtonRef}
              onClick={() => setModalOpen(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setModalOpen(false)
                }
              }}
              tabIndex={0}
            >
              <img src={CloseIcon} alt="Fechar" />
            </CloseButton>

            <ModalImage
              src={modalImageSrc || normalizeImgUrl(selected.foto)}
              alt={selected.nome}
              loading="eager"
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement
                img.src =
                  'data:image/svg+xml;utf8,' +
                  encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="280">
                      <rect width="100%" height="100%" fill="#ffffff"/>
                      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
                        fill="#e66767" font-family="Arial" font-size="14">
                        Imagem indisponível
                      </text>
                    </svg>`
                  )
              }}
            />

            <ModalContent>
              <ModalTitle id="modal-title">{selected.nome}</ModalTitle>
              <ModalDescription id="modal-desc">
                <ModalText>
                  {selected.descricao}
                </ModalText>
                <ModalText>
                  {selected.porcao ? ` Serve: ${selected.porcao}` : null}
                </ModalText>
              </ModalDescription>

              <ModalActions>
                <ModalButtons>
                  <button className="primary" onClick={confirmAdd}>
                    Adicionar ao carrinho — {formatBRL(selected.preco)}
                  </button>
                </ModalButtons>
              </ModalActions>
            </ModalContent>
          </ModalContainer>
        </ModalOverlay>
      )}
    </>
  )
}