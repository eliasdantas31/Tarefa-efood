// src/pages/Cart/style.ts
import styled from 'styled-components'

export const CartContainer = styled.main`
  display: flex;
  justify-content: center;
  padding: 24px;
  background: #fff8f2;
  min-height: calc(100vh - 0px);
`

export const CartSidebar = styled.aside`
  width: 360px;
  background: #e66767;
  border: 1px solid #e66767;
  color: #ffe9d9;
  padding: 12px;
  border-radius: 0;
`

export const CartHeader = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 12px;

  h3 { margin:0; font-size:18px; }
  small { font-size:12px; opacity:0.9; }
`

export const CartItems = styled.div`
  display:flex;
  flex-direction:column;
  gap: 12px;
  max-height: 60vh;
  overflow: auto;
  padding-right: 8px;
`

export const CartItem = styled.div`
  background: #ffe9e2;
  border: 1px solid rgba(0,0,0,0.04);
  display: grid;
  grid-template-columns: 72px 1fr 28px;
  gap: 8px;
  padding: 8px;
  align-items: center;
  color: #e66767;
`

export const ItemThumb = styled.img`
  width: 72px;
  height: 56px;
  object-fit: cover;
`

export const ItemInfo = styled.div`
  display:flex;
  flex-direction:column;
  gap: 6px;
`

export const ItemTitle = styled.strong`
  font-size: 14px;
`

export const ItemMeta = styled.span`
  font-size: 12px;
  color: #8c5a53;
`

export const ItemQty = styled.div`
  display:flex;
  gap:8px;
  align-items:center;

  input {
    width:48px;
    height:28px;
    text-align:center;
    border: 1px solid #f5c0b8;
    background: #fff;
    color: #e66767;
  }

  span {
    font-weight:700;
    margin-left: auto;
  }
`

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  color: #e66767;
  cursor: pointer;
`

export const TotalRow = styled.div`
  margin-top: 12px;
  background: #ffcdc3;
  padding: 10px;
  display:flex;
  justify-content:space-between;
  font-weight:700;
  color:#5a2a25;
`

export const ContinueButton = styled.button`
  width:100%;
  margin-top: 12px;
  height: 40px;
  background: #fff;
  color: #e66767;
  border: none;
  font-weight: 700;
`

export const EmptyBox = styled.div`
  padding: 20px;
  background: #fff8f2;
  color: #5a2a25;
  text-align: center;

  button {
    margin-top: 8px;
    background: #e66767;
    color: #fff;
    border: none;
    padding: 8px 12px;
  }
`