import styled from "styled-components";

export const RangeWrapper = styled.div`
  display: flex;
`;

export const RangeSelector = styled.div`
  position: relative;
  width: 400px;
  height: 40px;
  margin: 10px;
`;

export const Track = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background-color: black;
  border-radius: 4px;
`;

export const Highlight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  background-color: black;
  border-radius: 4px;
`;

export const Input = styled.input`
  width: 46px;
  border: none;
  text-align: right;
  font-size: 0.8125rem;
  letter-spacing: 0.01875rem;
  overflow: visible;
  &:focus {
    outline: none;
    border-color: transparent;
  }
`;

export const Badge = styled.span`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 0.8rem;
`;

export const Bullet = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 15px;
  height: 15px;
  background-color: black;
  border: 2px solid black;
  border-radius: 50%;
  cursor: grab;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover,
  &:active {
    width: 20px;
    height: 20px;
  }
  &:active {
    cursor: grabbing;
  }
`;