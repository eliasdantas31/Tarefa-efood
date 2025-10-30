// src/pages/Home/styles.ts
import styled from 'styled-components'

export const PageContainer = styled.main`
  background-color: #fff8f2;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const CardsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 70px 26px 166px 26px;
  box-sizing: border-box;
`

export const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(280px, 1fr));
  gap: 24px;
  justify-items: center;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    max-width: 720px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 320px;
  }
`