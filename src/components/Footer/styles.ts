import styled from 'styled-components'

export const Container = styled.footer`
  width: 100%;
  background-color: #ffe9e9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 48px 16px;
  color: #e66767;

  img {
    width: 160px;
    margin-bottom: 16px;
  }

  .social {
    display: flex;
    gap: 24px;
    margin-bottom: 16px;

    i {
      font-size: 30px;
      color: #fff;
      padding: 8px;
      background-color: #e66767;
      border-radius: 50%;
    }
  }

  p {
    font-size: 14px;
    max-width: 600px;
  }
`
