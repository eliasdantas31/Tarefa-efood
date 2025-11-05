// src/components/CartDrawer/index.tsx
import { useDispatch, useSelector } from 'react-redux'
import {
  Drawer,
  DrawerItems,
  DrawerItem,
  Thumb,
  Info,
  Name,
  Meta,
  TrashButton,
  TotalRow,
  ContinueBtn,
  Empty} from './style'
import trashImg from '../../assets/lixeira-de-reciclagem.png'
import { formatBRL } from '../../utils/price'
import { selectItems, selectTotal, removeFromCart } from '../../store/slices/cartSlice'
import type { RootState } from '../../store'


export default function CartDrawer() {
  const dispatch = useDispatch()
  const items = useSelector((s: RootState) => selectItems(s))
  const total = useSelector((s: RootState) => selectTotal(s))

  return (
    <Drawer role="dialog" aria-label="Carrinho">
      {items.length === 0 ? (
        <Empty>
          <p>Seu carrinho está vazio</p>
        </Empty>
      ) : (
        <>
          <DrawerItems>
            {items.map(item => (
              <DrawerItem key={item.id}>
                <Thumb src={item.foto} alt={item.nome} />
                <Info>
                  <Name>{item.nome}</Name>
                  <Meta>{formatBRL(item.preco)}</Meta>
                </Info>

                <TrashButton
                  aria-label={`Remover ${item.nome}`}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  <img src={trashImg} alt="Remover" />
                </TrashButton>
              </DrawerItem>
            ))}
          </DrawerItems>
          <TotalRow>
            <span>Valor total</span>
            <span>{formatBRL(total)}</span>
          </TotalRow>
          <ContinueBtn onClick={() => alert('Continuar com a entrega')}>
            Continuar com a entrega
          </ContinueBtn>
        </>
      )}
    </Drawer>
  )
}