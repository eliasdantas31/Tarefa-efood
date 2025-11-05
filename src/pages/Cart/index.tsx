// src/pages/Cart/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCart, selectItems, selectTotal, setQuantity } from '../../store/slices/cartSlice'
import { formatBRL } from '../../utils/price'
import { Container, CTA, ItemCard, Meta, QtyInput, QtyRow, Remove, Thumb, Title, TotalBox, Wrapper } from './style'

export default function CartPage() {
  const items = useSelector(selectItems)
  const total = useSelector(selectTotal)
  const dispatch = useDispatch()

  return (
    <Container>
      <Wrapper>
        {items.map(item => (
          <ItemCard key={item.id}>
            <Thumb src={item.foto} alt={item.nome} />
            <div>
              <Title>{item.nome}</Title>
              <Meta>{formatBRL(item.preco)} • {item.porcao}</Meta>
              <QtyRow>
                <span>Qtde:</span>
                <QtyInput
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    dispatch(setQuantity({ id: item.id, quantity: Number(e.target.value || 1) }))
                  }
                />
              </QtyRow>
            </div>
            <Remove aria-label="Remover" onClick={() => dispatch(removeFromCart(item.id))}>
              ×
            </Remove>
          </ItemCard>
        ))}

        <TotalBox>
          <span>Valor total</span>
          <span>{formatBRL(total)}</span>
        </TotalBox>

        <CTA>Continuar com a entrega</CTA>
      </Wrapper>
    </Container>
  )
}