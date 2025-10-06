import styled from 'styled-components'

export const CardContainer = styled.div`
  width: 470px;
  border: 2px solid #e66767;
  /* border-radius: 8px; */
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const Categoria = styled.span`
  height: auto;
  width: max-content;
  position: absolute;
  padding: 5px;
  background-color: #e66767;
  color: #fff;
`

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`

export const CardInfo = styled.div`
  padding: 16px;
  color: #e66767;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .header {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }

  h3 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
    height: 60px;
    overflow: hidden;
  }
`

export const Button = styled.button`
  margin-top: auto;
  padding: 8px 16px;
  background-color: #e66767;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  align-self: flex-start;
  transition: 0.3s;

  &:hover {
    background-color: #d45b5b;
  }
`
