// src/pages/Cart/index.tsx
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  CartContainer,
  CartSidebar,
  CartHeader,
  CartItems,
  CartItem,
  ItemThumb,
  ItemInfo,
  ItemTitle,
  ItemMeta,
  ItemQty,
  RemoveButton,
  TotalRow,
  ContinueButton,
  EmptyBox
} from './style'
import { formatBRL } from '../../utils/price'
import { selectItems, selectTotal, removeFromCart, setQuantity, clearCart } from '../../store/slices/cartSlice'

export default function CartPage() {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <CartContainer>
      <CartSidebar>
        <CartHeader>
          <h3>Carrinho</h3>
          <small>{items.length} item(s)</small>
        </CartHeader>

        {items.length === 0 ? (
          <EmptyBox>
            <p>Seu carrinho está vazio.</p>
            <button onClick={() => navigate('/')}>Voltar aos restaurantes</button>
          </EmptyBox>
        ) : (
          <>
            <CartItems>
              {items.map(item => (
                <CartItem key={item.id}>
                  <ItemThumb src={item.foto} alt={item.nome} />
                  <ItemInfo>
                    <ItemTitle>{item.nome}</ItemTitle>
                    <ItemMeta>{item.porcao ?? ''}</ItemMeta>
                    <ItemQty>
                      <label>Qtde</label>
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => dispatch(setQuantity({ id: item.id, quantity: Number(e.target.value || 1) }))}
                      />
                      <span>{formatBRL(item.preco)}</span>
                    </ItemQty>
                  </ItemInfo>
                  <RemoveButton onClick={() => dispatch(removeFromCart(item.id))} aria-label="Remover">×</RemoveButton>
                </CartItem>
              ))}
            </CartItems>

            <TotalRow>
              <span>Valor total</span>
              <strong>{formatBRL(total)}</strong>
            </TotalRow>

            <ContinueButton onClick={() => alert('Continuar com a entrega (implemente checkout)')}>
              Continuar com a entrega
            </ContinueButton>

            <div style={{ marginTop: 8 }}>
              <button onClick={() => { dispatch(clearCart()); }}>Limpar carrinho</button>
            </div>
          </>
        )}
      </CartSidebar>
    </CartContainer>
  )
}