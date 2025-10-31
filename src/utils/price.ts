// src/utils/price.ts
export const formatBRL = (value: number) =>
    Number(value ?? 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })