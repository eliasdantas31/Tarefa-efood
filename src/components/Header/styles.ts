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
    width: 180px;
    margin-bottom: 24px;
  }

  h1 {
    font-size: 28px;
    font-weight: bold;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.3;
  }
`
