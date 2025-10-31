// src/pages/Home/styles.ts
import styled from 'styled-components'

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

export const CardsContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 24px;
  padding: 48px 16px 72px;
  width: 100%;
  max-width: 1180px;
  margin-left: auto;
  margin-right: auto;
  justify-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`