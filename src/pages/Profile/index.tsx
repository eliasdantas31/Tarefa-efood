// src/pages/Profile/index.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
  TopBarContainer,
  ModalText,
  CheckoutOverlay,
  CheckoutDrawer,
  CheckoutTitle,
  CheckoutForm,
  CheckoutFormGroup,
  CheckoutLabel,
  CheckoutInput,
  CheckoutInputRow,
  CheckoutButton,
  ConfirmationText
} from './style'

import LogoImg from '../../assets/logo.png'
import CloseIcon from '../../assets/close button.png'
import Footer from '../../components/Footer'
import { formatBRL } from '../../utils/price'
import type { JSX } from 'react/jsx-runtime'
import { addToCart, selectItems, selectTotal, clearCart } from '../../store/slices/cartSlice'
import type { RootState } from '../../store'
import CartDrawer from '../../components/CartDrawer'

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

type CheckoutStep = 'delivery' | 'payment' | 'confirmation'

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

  const dispatch = useDispatch()
  const cartItems = useSelector((s: RootState) => selectItems(s))
  const total = useSelector((s: RootState) => selectTotal(s))
  const cartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [restaurant, setRestaurant] = useState<ApiRestaurant | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selected, setSelected] = useState<ApiProduct | null>(null)
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('delivery')

  const [deliveryForm, setDeliveryForm] = useState({
    receiver: '',
    address: '',
    city: '',
    zipCode: '',
    number: '',
    complement: ''
  })

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardCode: '',
    expiresMonth: '',
    expiresYear: ''
  })

  const [loadingPayment, setLoadingPayment] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderData, setOrderData] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch('https://api-ebac.vercel.app/api/efood/restaurantes', {
          cache: 'no-store'
        } as RequestInit)
        if (!res.ok) throw new Error('Falha ao buscar restaurantes')
        const data: ApiRestaurant[] = await res.json()

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
      if (e.key === 'Escape') {
        setModalOpen(false)
        setDrawerOpen(false)
        setCheckoutOpen(false)
      }
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
      setModalImageSrc(null)
    }
  }, [modalOpen])

  const bannerImage = normalizeImgUrl(restaurant?.capa ?? state.image)
  const title = restaurant?.titulo ?? state.title ?? 'Restaurante'
  const category = restaurant?.tipo ?? state.category ?? ''
  const products = useMemo(() => (restaurant?.cardapio ?? []).slice(0, 6), [restaurant])

  function openModal(prod: ApiProduct, btn: HTMLButtonElement | null) {
    setSelected(prod)
    setModalOpen(true)
    openButtonRef.current = btn
    try {
      const imgEl = document.querySelector(`img[data-prod-id="${prod.id}"]`) as HTMLImageElement | null
      const src = imgEl?.src || normalizeImgUrl(prod.foto)
      setModalImageSrc(src)
    } catch {
      setModalImageSrc(normalizeImgUrl(prod.foto))
    }
  }

  function confirmAdd() {
    if (selected) {
      dispatch(addToCart({
        id: selected.id,
        foto: selected.foto,
        nome: selected.nome,
        descricao: selected.descricao,
        porcao: selected.porcao,
        preco: selected.preco
      }))
      setDrawerOpen(true)
    }
    setModalOpen(false)
  }

  function openCheckout() {
    setDrawerOpen(false)
    setCheckoutOpen(true)
    setCheckoutStep('delivery')
  }

  const canGoToPayment = () => {
    const { receiver, address, city, zipCode, number } = deliveryForm

    if (
      receiver.trim() === '' ||
      address.trim() === '' ||
      city.trim() === '' ||
      zipCode.trim() === '' ||
      number.trim() === ''
    ) {
      return { valid: false, message: 'Preencha todos os campos obrigatórios de entrega.' }
    }

    if (zipCode.replace(/\D/g, '').length !== 8) {
      return { valid: false, message: 'O CEP deve conter exatamente 8 dígitos.' }
    }

    return { valid: true, message: '' }
  }

  const handleGoToPayment = () => {
    const validation = canGoToPayment()
    if (!validation.valid) {
      alert(validation.message)
      return
    }
    setCheckoutStep('payment')
  }

  const validatePaymentForm = () => {
    const { cardName, cardNumber, cardCode, expiresMonth, expiresYear } = paymentForm

    if (
      cardName.trim() === '' ||
      cardNumber.trim() === '' ||
      cardCode.trim() === '' ||
      expiresMonth.trim() === '' ||
      expiresYear.trim() === ''
    ) {
      return { valid: false, message: 'Preencha todos os campos obrigatórios de pagamento.' }
    }

    const nameParts = cardName.trim().split(/\s+/)
    if (nameParts.length < 2) {
      return { valid: false, message: 'O nome no cartão deve conter pelo menos nome e sobrenome.' }
    }

    const cardNumberDigits = cardNumber.replace(/\D/g, '')
    if (cardNumberDigits.length < 13 || cardNumberDigits.length > 16) {
      return { valid: false, message: 'O número do cartão deve conter entre 13 e 16 dígitos.' }
    }

    if (cardCode.replace(/\D/g, '').length !== 3) {
      return { valid: false, message: 'O CVV deve conter exatamente 3 dígitos.' }
    }

    const month = parseInt(expiresMonth, 10)
    if (isNaN(month) || month < 1 || month > 12) {
      return { valid: false, message: 'O mês de vencimento deve estar entre 01 e 12.' }
    }

    const year = parseInt(expiresYear, 10)
    const currentYear = new Date().getFullYear()
    if (isNaN(year) || expiresYear.length !== 4 || year < currentYear) {
      return { valid: false, message: `O ano de vencimento deve ter 4 dígitos e ser ${currentYear} ou posterior.` }
    }

    return { valid: true, message: '' }
  }

  const handleFinishPayment = async () => {
    const { receiver, address, city, zipCode, number } = deliveryForm

    const deliveryValidation = canGoToPayment()
    if (!deliveryValidation.valid) {
      alert(deliveryValidation.message)
      setCheckoutStep('delivery')
      return
    }

    const paymentValidation = validatePaymentForm()
    if (!paymentValidation.valid) {
      alert(paymentValidation.message)
      return
    }

    try {
      setLoadingPayment(true)

      const payload = {
        products: cartItems.map((item) => ({
          id: item.id,
          price: item.preco
        })),
        delivery: {
          receiver: deliveryForm.receiver,
          address: {
            description: deliveryForm.address,
            city: deliveryForm.city,
            zipCode: deliveryForm.zipCode,
            number: Number(deliveryForm.number),
            complement: deliveryForm.complement
          }
        },
        payment: {
          card: {
            name: paymentForm.cardName,
            number: paymentForm.cardNumber,
            code: Number(paymentForm.cardCode),
            expires: {
              month: Number(paymentForm.expiresMonth),
              year: Number(paymentForm.expiresYear)
            }
          }
        }
      }

      const response = await fetch(
        'https://api-ebac.vercel.app/api/efood/checkout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      if (!response.ok) {
        throw new Error('Erro ao processar pagamento')
      }

      const data = await response.json()
      setOrderData(data)
      setCheckoutStep('confirmation')
      dispatch(clearCart())
    } catch (e) {
      console.error(e)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setLoadingPayment(false)
    }
  }

  return (
    <>
      <PageContainer>
        <TopBar>
          <TopBarContainer>
            <span className="link" onClick={() => navigate('/')}>Restaurantes</span>
            <Logo src={LogoImg} alt="Logo efood" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
            <CartInfo
              onClick={() => setDrawerOpen((v) => !v)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setDrawerOpen((v) => !v) }}
              style={{ cursor: 'pointer' }}
            >
              <strong>{cartCount}</strong> produto(s) no carrinho
            </CartInfo>
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
              loading="lazy"
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

      {drawerOpen && <CartDrawer onClose={() => setDrawerOpen(false)} onContinue={openCheckout} />}

      {/* CHECKOUT DRAWER */}
      {checkoutOpen && (
        <>
          <CheckoutOverlay onClick={() => setCheckoutOpen(false)} />
          <CheckoutDrawer onClick={(e) => e.stopPropagation()}>
            
            {/* ETAPA 1: ENTREGA */}
            {checkoutStep === 'delivery' && (
              <>
                <CheckoutTitle>Entrega</CheckoutTitle>
                <CheckoutForm>
                  <CheckoutFormGroup>
                    <CheckoutLabel>Quem irá receber *</CheckoutLabel>
                    <CheckoutInput
                      type="text"
                      value={deliveryForm.receiver}
                      onChange={(e) =>
                        setDeliveryForm({ ...deliveryForm, receiver: e.target.value })
                      }
                    />
                  </CheckoutFormGroup>

                  <CheckoutFormGroup>
                    <CheckoutLabel>Endereço *</CheckoutLabel>
                    <CheckoutInput
                      type="text"
                      value={deliveryForm.address}
                      onChange={(e) =>
                        setDeliveryForm({ ...deliveryForm, address: e.target.value })
                      }
                    />
                  </CheckoutFormGroup>

                  <CheckoutFormGroup>
                    <CheckoutLabel>Cidade *</CheckoutLabel>
                    <CheckoutInput
                      type="text"
                      value={deliveryForm.city}
                      onChange={(e) =>
                        setDeliveryForm({ ...deliveryForm, city: e.target.value })
                      }
                    />
                  </CheckoutFormGroup>

                  <CheckoutInputRow>
                    <CheckoutFormGroup>
                      <CheckoutLabel>CEP *</CheckoutLabel>
                      <CheckoutInput
                        type="text"
                        maxLength={8}
                        value={deliveryForm.zipCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setDeliveryForm({ ...deliveryForm, zipCode: value })
                        }}
                      />
                    </CheckoutFormGroup>

                    <CheckoutFormGroup>
                      <CheckoutLabel>Número *</CheckoutLabel>
                      <CheckoutInput
                        type="text"
                        value={deliveryForm.number}
                        onChange={(e) =>
                          setDeliveryForm({ ...deliveryForm, number: e.target.value })
                        }
                      />
                    </CheckoutFormGroup>
                  </CheckoutInputRow>

                  <CheckoutFormGroup>
                    <CheckoutLabel>Complemento (opcional)</CheckoutLabel>
                    <CheckoutInput
                      type="text"
                      value={deliveryForm.complement}
                      onChange={(e) =>
                        setDeliveryForm({ ...deliveryForm, complement: e.target.value })
                      }
                    />
                  </CheckoutFormGroup>

                  <CheckoutButton
                    type="button"
                    onClick={handleGoToPayment}
                  >
                    Continuar com o pagamento
                  </CheckoutButton>

                  <CheckoutButton
                    type="button"
                    onClick={() => setCheckoutOpen(false)}
                  >
                    Voltar para o carrinho
                  </CheckoutButton>
                </CheckoutForm>
              </>
            )}

            {/* ETAPA 2: PAGAMENTO */}
            {checkoutStep === 'payment' && (
              <>
                <CheckoutTitle>
                  Pagamento - Valor a pagar {formatBRL(total)}
                </CheckoutTitle>
                <CheckoutForm>
                  <CheckoutFormGroup>
                    <CheckoutLabel>Nome no cartão *</CheckoutLabel>
                    <CheckoutInput
                      type="text"
                      placeholder="Nome Sobrenome"
                      value={paymentForm.cardName}
                      onChange={(e) =>
                        setPaymentForm({ ...paymentForm, cardName: e.target.value })
                      }
                    />
                  </CheckoutFormGroup>

                  <CheckoutInputRow>
                    <CheckoutFormGroup>
                      <CheckoutLabel>Número do cartão *</CheckoutLabel>
                      <CheckoutInput
                        type="text"
                        maxLength={16}
                        value={paymentForm.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setPaymentForm({ ...paymentForm, cardNumber: value })
                        }}
                      />
                    </CheckoutFormGroup>

                    <CheckoutFormGroup>
                      <CheckoutLabel>CVV *</CheckoutLabel>
                      <CheckoutInput
                        type="text"
                        maxLength={3}
                        value={paymentForm.cardCode}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setPaymentForm({ ...paymentForm, cardCode: value })
                        }}
                      />
                    </CheckoutFormGroup>
                  </CheckoutInputRow>

                  <CheckoutInputRow>
                    <CheckoutFormGroup>
                      <CheckoutLabel>Mês de vencimento *</CheckoutLabel>
                      <CheckoutInput
                        type="text"
                        maxLength={2}
                        placeholder="MM"
                        value={paymentForm.expiresMonth}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setPaymentForm({ ...paymentForm, expiresMonth: value })
                        }}
                      />
                    </CheckoutFormGroup>

                    <CheckoutFormGroup>
                      <CheckoutLabel>Ano de vencimento *</CheckoutLabel>
                      <CheckoutInput
                        type="text"
                        maxLength={4}
                        placeholder="AAAA"
                        value={paymentForm.expiresYear}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          setPaymentForm({ ...paymentForm, expiresYear: value })
                        }}
                      />
                    </CheckoutFormGroup>
                  </CheckoutInputRow>

                  <CheckoutButton
                    type="button"
                    disabled={loadingPayment}
                    onClick={handleFinishPayment}
                  >
                    {loadingPayment ? 'Finalizando...' : 'Finalizar pagamento'}
                  </CheckoutButton>

                  <CheckoutButton
                    type="button"
                    disabled={loadingPayment}
                    onClick={() => setCheckoutStep('delivery')}
                  >
                    Voltar para a edição de endereço
                  </CheckoutButton>
                </CheckoutForm>
              </>
            )}

            {/* ETAPA 3: CONFIRMAÇÃO */}
            {checkoutStep === 'confirmation' && orderData && (
              <>
                <CheckoutTitle>
                  Pedido realizado - {orderData.orderId}
                </CheckoutTitle>

                <ConfirmationText>
                  <p>
                    Estamos felizes em informar que seu pedido já está em processo de
                    preparação e, em breve, será entregue no endereço fornecido.
                  </p>
                  <p>
                    Gostaríamos de ressaltar que nossos entregadores não estão
                    autorizados a realizar cobranças extras.
                  </p>
                  <p>
                    Lembre-se da importância de higienizar as mãos após o recebimento
                    do pedido, garantindo assim sua segurança e bem-estar durante a
                    refeição.
                  </p>
                  <p>
                    Esperamos que desfrute de uma deliciosa e agradável experiência
                    gastronômica. Bom apetite!
                  </p>
                </ConfirmationText>

                <CheckoutButton
                  type="button"
                  onClick={() => {
                    setCheckoutOpen(false)
                    setCheckoutStep('delivery')
                    setOrderData(null)
                  }}
                >
                  Concluir
                </CheckoutButton>
              </>
            )}
          </CheckoutDrawer>
        </>
      )}
    </>
  )
}