// src/components/Header/styles.ts
import styled from 'styled-components'

export const Container = styled.header`
  position: relative;
  width: 100%;
  height: 384px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

export const Background = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
`

export const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  color: #e66767;

  img {
    width: 125px;
    height: 57.5px;
    margin-bottom: 100px;
  }

  h1 {
    font-size: 36px;
    font-weight: 900;
    max-width: 780px;
    margin: 0 auto;
    line-height: 1.25;
  }
`