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
  gap: 32px;
  padding: 64px 16px;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`