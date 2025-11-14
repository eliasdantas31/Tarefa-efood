// src/pages/Profile/style.ts
import styled from 'styled-components'
import fundo from '../../assets/fundo.png'

export const PageContainer = styled.main`
  background-color: #fff8f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

/* ---------------- HEADER (TOP BAR) ---------------- */

export const TopBar = styled.header`
  height: 170px;
  width: 100%;
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e66767;
  font-weight: 600;
`

export const TopBarContainer = styled.div`
  height: 100%;
  width: 1008px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .link {
    justify-self: start;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover { opacity: 0.8; }
  }

  @media (max-width: 1200px) {
    width: 664px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const Logo = styled.img`
  justify-self: center;
  height: 57.5px;
  width: 125px;
  cursor: pointer;
  margin-left: 75px;
`
export const CartInfo = styled.div`
  justify-self: end;
  strong { margin-right: 4px; }
  cursor: pointer;
`

/* ---------------- BANNER ---------------- */
export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 320px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 450px;
  color: #fff;

  &::after {
    height: 100%;
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.45) 0%);
  }
  > * { position: relative; z-index: 1; }
`

export const BannerContainer = styled.div`
  height: 100%;
  width: 1008px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1200px) {
    width: 664px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const CategoryLabel = styled.span`
  font-size: 32px;
  font-weight: 100;
  line-height: 100%;
  margin-bottom: 8px;
  opacity: 0.95;
`

export const RestaurantTitle = styled.h1`
  font-size: 32px; 
  font-weight: 900;
  line-height: 100%;
  margin: 0;
`

/* ---------------- PRODUCTS CONTAINER ---------------- */
export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px;
`

/* ---------------- GRID ---------------- */
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 40px;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px;
  }
`

export const ProductCard = styled.article`
  height: 380px;
  width: 320px;
  background: #e66767;
  border: 1px solid #e66767;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #FFEBD9;
  padding: 7px;
`

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`

export const ProductBody = styled.div`
  margin: 12px 0;
  background: #e66767;
`

export const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin: 0 0 6px;
`

export const ProductDescription = styled.p`
  font-size: 12px;
  line-height: 1.35;
  color: #FFEBD9;
  margin: 0;
  min-height: 38px;
`

export const AddButton = styled.button`
  height: 24px;
  width: 100%;
  background-color: #FFEBD9;
  border: none;
  color: #e66767;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  &:hover { opacity: 0.85; }
`

/* ---------------- MODAL ---------------- */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

export const ModalContainer = styled.div`
  height: max-content;
  width: 100%;
  max-width: 1024px;
  background: #e66767;
  color: #FFEBD9;
  border: 1px solid #e66767;
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 16px;
  padding: 26px;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-height: 90vh;
    overflow: auto;
  }
`

export const ModalImage = styled.img`
  width: 100%;
  height: 280px;
  object-fit: cover;
  background: #fff;
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: #fff;
`

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 900;
  line-height: 100%;
`

export const ModalDescription = styled.div`
  height: max-content;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

export const ModalText = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
`

export const ModalActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: space-between;
`

export const ModalButtons = styled.div`
  display: flex;
  gap: 8px;

  button {
    height: 24px;
    padding: 0 12px;
    border: 1px solid #FFEBD9;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
  }

  .primary {
    background: #FFEBD9;
    color: #e66767;
  }

  .secondary {
    background: transparent;
    color: #FFEBD9;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  line-height: 0;      
  display: inline-flex;
  align-items: center;
  justify-content: center;

  img {
    width: 16px;       
    height: 16px;
    display: block;
  }

  &:hover { opacity: 0.85; }
  &:focus { outline: 2px solid #FFEBD9; outline-offset: 2px; }
`