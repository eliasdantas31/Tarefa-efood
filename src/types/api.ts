// src/types/api.ts
export interface ApiMenuItem {
  id: number
  foto: string
  preco: number
  nome: string
  descricao: string
  porcao: string
}

export interface ApiRestaurant {
  id: number
  titulo: string
  tipo: string
  avaliacao: number
  descricao: string
  capa: string
  destacado: boolean
  cardapio?: ApiMenuItem[]
}