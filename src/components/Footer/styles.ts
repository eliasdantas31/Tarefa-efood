// src/components/Footer/styles.ts
import styled from 'styled-components'
import fundo from '../../assets/fundo.png'

export const Container = styled.footer`
  height: 300px;
  width: 100%;
  background-image: url(${fundo});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 56px 16px 68px;
  color: #e66767;

  img {
    width: 125px;
    height: 57.5px;
    margin-bottom: 20px;
  }

  .social {
    display: flex;
    gap: 16px;
    margin-bottom: 84px;

    .social-item {
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e66767;
      border-radius: 50%;

      i {
        font-size: 15px;
        color: #fff2ed;
      }
    }
  }

  p {
    font-size: 10px;
    line-height: 100%;
    height: 24px;
    max-width: 400px;
    color: #e66767;
  }
` 