/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from "styled-components"

export const Container = styled.div`
  background: #e66767;
  min-height: calc(100vh - 160px);
  padding: 16px;
  display: flex;
  justify-content: center;
`
export const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
export const ItemCard = styled.div`
  background: #ffe9e2;
  border: 1px solid #f5c0b8;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 64px 1fr 20px;
  gap: 8px;
  padding: 8px;
  align-items: center;
`
export const Thumb = styled.img`
  width: 64px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
`
export const Title = styled.h4`
  margin: 0;
  color: #e66767;
  font-size: 14px;
  line-height: 1.2;
`
export const Meta = styled.div`
  color: #8c5a53;
  font-size: 12px;
`
export const Remove = styled.button`
  background: transparent;
  border: 0;
  color: #e66767;
  font-size: 18px;
  cursor: pointer;
  align-self: start;
`
export const QtyRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
`
 
export const QtyInput = styled.input`
  width: 48px;
  height: 28px;
  border: 1px solid #f5c0b8;
  border-radius: 4px;
  padding: 0 6px;
  background: #fff;
  color: #e66767;
  text-align: center;
`
 
export const TotalBox = styled.div`
  background: #ffcdc3;
  color: #5a2a25;
  border-radius: 4px;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-top: 8px;
`
 
export const CTA = styled.button`
  background: #fff;
  color: #e66767;
  border: 0;
  border-radius: 4px;
  padding: 10px 12px;
  font-weight: 700;
  cursor: pointer;
`