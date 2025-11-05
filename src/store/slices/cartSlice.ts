// src/store/slices/cartSlice.ts
import { createSlice } from '@reduxjs/toolkit'

type ApiProduct = {
  id: number
  foto: string
  nome: string
  descricao?: string
  porcao?: string
  preco: number
}

export type CartItem = ApiProduct & { quantity: number }

type CartState = {
  items: CartItem[]
}

const STORAGE_KEY = 'efood_cart_v3'

const load = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
const save = (items: CartItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch { /* empty */ }
}

const initialState: CartState = {
  items: load()
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: ApiProduct }) => {
      const payload = action.payload
      const exists = state.items.find(i => i.id === payload.id)
      if (exists) {
        exists.quantity += 1
      } else {
        state.items.push({ ...payload, quantity: 1 })
      }
      save(state.items)
    },
    removeFromCart: (state, action: { payload: number }) => {
      state.items = state.items.filter(i => i.id !== action.payload)
      save(state.items)
    },
    setQuantity: (state, action: { payload: { id: number; quantity: number } }) => {
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

// Seletores
export const selectItems = (state: { cart: CartState }) => state.cart.items
export const selectTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((acc, i) => acc + i.preco * i.quantity, 0)

export default cartSlice.reducer