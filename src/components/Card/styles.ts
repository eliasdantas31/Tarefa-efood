// src/components/Card/styles.ts
import styled from 'styled-components'
import star_img from '../../assets/star_favorite.png'

export const CardContainer = styled.article`
  width: 470px;
  height: max-content;
  border: 1px solid #e66767;
  overflow: hidden;
  display: grid;
  grid-template-rows: auto 1fr;
  background: #fff;
  position: relative;
`

export const Categoria = styled.div`
  width: max-content;
  display: flex;
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px 12px;
  background-color: #e66767;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  z-index: 2;
`

export const Destaque = styled.div`
  width: max-content;
  display: flex;
  position: absolute;
  top: 16px;
  right: 128px;
  padding: 8px 12px;
  background-color: #e66767;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  z-index: 2;
`

export const CardImage = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  display: block;
  filter: brightness(0.8);
`

export const CardInfo = styled.div`
  padding: 10px;
  color: #e66767;
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 8px;

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 18px;

    h3 {
      font-size: 18px;
      font-weight: 700;
      margin: 0;
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
  }

  p {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    color: #E66767;
    line-height: 22px;
    margin: 0;
  }
`

export const Star = styled.div`
  height: 21px;
  width: 21px;
  background-image: url(${star_img});
  background-size: contain;
  background-repeat: no-repeat;
`

export const Button = styled.button`
  height: 24px;
  width: 82px;
  margin-top: 18px;
  position: relative;
  bottom: 0px;
  background-color: #E66767;
  color: #ffe9e9;
  border: none;
  font-size: 14px;
  font-weight: 700;
  align-self: start;
  transition: ease-in-out 0.2s;

  &:hover {
    background-color: #ffe9e9;
    color: #E66767;
  }
`