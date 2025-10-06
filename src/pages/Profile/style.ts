import styled from 'styled-components'

export const PageContainer = styled.main`
  background-color: #fff8f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

/* ---------------- HEADER (TOP BAR) ---------------- */
export const TopBar = styled.header`
  background-color: #fff0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 60px;
  color: #e66767;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;

  .link {
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
`

export const Logo = styled.img`
  width: 90px;
  height: auto;
`

export const CartInfo = styled.div`
  color: #e66767;
  font-weight: 600;
  strong {
    color: #e66767;
    margin-right: 4px;
  }
`

/* ---------------- BANNER ---------------- */
export const Banner = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 40px 80px;
  color: #fff;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  > * {
    position: relative;
    z-index: 2;
  }
`

export const CategoryLabel = styled.span`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 8px;
`

export const RestaurantTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
`

/* ---------------- GRID ---------------- */
export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 60px 80px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 40px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 24px;
  }
`

export const ProductCard = styled.div`
  background: #e66767;
  border: 2px solid #e66767;
  display: flex;
  flex-direction: column;
  color: #fff;
`

export const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`

export const ProductBody = styled.div`
  padding: 16px;
  background: #e66767;
  flex: 1;
`

export const ProductTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px;
`

export const ProductDescription = styled.p`
  font-size: 14px;
  line-height: 1.3;
  color: #ffe9e9;
  margin: 0;
`

export const ProductActions = styled.div`
  background: #ffe9e9;
  color: #e66767;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  font-weight: 700;
`

export const AddButton = styled.button`
  background: transparent;
  border: none;
  color: #e66767;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`