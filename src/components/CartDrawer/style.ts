// src/components/CartDrawer/styles.ts
import styled from 'styled-components'

export const Drawer = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 320px;
  max-width: 100%;
  background: #e66767;
  border-left: 1px solid #e66767;
  z-index: 1200;
  padding: 12px;
  display: flex;
  flex-direction: column;
  color: #ffe9d9;
  box-shadow: -8px 0 16px rgba(0,0,0,0.12);
`

export const DrawerHeader = styled.header`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 8px;

  strong { font-size: 16px; }
  small { font-size: 12px; opacity: 0.95; }
`

export const CloseX = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
`

export const DrawerItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  max-height: max-content;
  padding-right: 6px;
  flex: 1 1 auto;
`

export const DrawerItem = styled.div`
  height: 100px;
  font-size: 18px;
  font-weight: 900;
  background: #ffe9e2;
  border: 1px solid rgba(0,0,0,0.04);
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 8px;
  padding: 8px;
  align-items: start;
  color: #e66767;
  position: relative;
`

export const Thumb = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`

export const Info = styled.div`
  display:flex;
  flex-direction:column;
  gap: 20px;
`

export const Name = styled.strong`
  font-size: 14px;
  color: #e66767;
`

export const Meta = styled.span`
  font-size: 12px;
  color: #8c5a53;
`

export const TrashButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 8px;
  background: transparent;
  border: 0;
  cursor: pointer;
  img { width: 18px; height: 18px; display:block; }
`

export const TotalRow = styled.div`
  font-size: 14px;
  margin-top: 32px;
  display:flex;
  justify-content:space-between;
  font-weight: 400;
  color:#FFEBD9;
`

export const ContinueBtn = styled.button`
  font-size: 14px;
  width: 100%;
  margin-top: 12px;
  height: 24px;
  background: #fff;
  color: #e66767;
  border: none;
  font-weight: 700;
  cursor: pointer;
`

export const Empty = styled.div`
  padding: 20px;
  color: #fff8f2;
  text-align: center;
  flex: 1 1 auto;
  display:flex;
  align-items:center;
  justify-content:center;
`