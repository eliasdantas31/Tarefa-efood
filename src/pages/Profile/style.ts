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
  padding: 0 450px;
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  color: #e66767;
  font-weight: 600;

  .link {
    justify-self: start;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover { opacity: 0.8; }
  }
`

export const Logo = styled.img`
  justify-self: center;
  height: 57.5px;
  width: 125px;
`
export const CartInfo = styled.div`
  justify-self: end;
  strong { margin-right: 4px; }
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
  justify-content: flex-end;
  padding: 48px 450px;
  color: #fff;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 20%, rgba(0,0,0,0.45) 100%);
  }
  > * { position: relative; z-index: 1; }
`

export const CategoryLabel = styled.span`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 8px;
  opacity: 0.95;
`

export const RestaurantTitle = styled.h1`
  font-size: 40px; 
  font-weight: 700;
  margin: 0;
`

/* ---------------- PRODUCTS CONTAINER ---------------- */

export const ProductContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 70px 26px 166px 26px;
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
  height: max-content;
  width: 320px;
  background: #e66767;
  border: 1px solid #e66767;
  display: grid;
  grid-template-rows: 180px auto auto;
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