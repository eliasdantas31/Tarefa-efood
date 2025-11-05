import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ApiMenuItem } from '../../types/api'

export type CartItem = ApiMenuItem & { quantity: number }

type CartState = {
  items: CartItem[]
}

const load = (): CartItem[] => {
  try {
    const raw = localStorage.getItem('efood_cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const save = (items: CartItem[]) => {
  try {
    localStorage.setItem('efood_cart', JSON.stringify(items))
  } catch { /* empty */ }
}

const initialState: CartState = {
  items: load()
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ApiMenuItem>) => {
      const exists = state.items.find(i => i.id === action.payload.id)
      if (exists) {
        exists.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
      save(state.items)
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(i => i.id !== action.payload)
      save(state.items)
    },
    setQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id)
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity)
        save(state.items)
      }
    },
    clearCart: (state) => {
      state.items = []
      save(state.items)
    }
  }
})

export const { addToCart, removeFromCart, setQuantity, clearCart } = cartSlice.actions

// Seletores para usar no useSelector
export const selectItems = (state: { cart: CartState }) => state.cart.items
export const selectTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((acc, item) => acc + item.preco * item.quantity, 0)

export default cartSlice.reducer