import styled from "styled-components";

export const RangeWrapper = styled.div`
  display: flex;
  width: 600px;
`;

export const RangeContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 20px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  letter-spacing: 0.01875rem;
  margin-right: 1px;
`;

export const Badge = styled.span`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 0.8rem;
`;

export const RangeBar = styled.div`
  position: relative;
  height: 4px;
  background: black;
  border-radius: 4px;
  margin: 10px 0;
`;

export const Track = styled.div<{ left: number; right: number }>`
  position: absolute;
  height: 4px;
  background-color: black;
  border-radius: 4px;
  left: ${(props) => props.left}%;
  right: ${(props) => props.right}%;
`;

export const Bullet = styled.div<{ position: number }>`
  position: absolute;
  top: 50%;
  width: 15px;
  height: 15px;
  background-color: black;
  border: 2px solid black;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transform: translate(-50%, -50%);
  cursor: grab;
  left: ${(props) => props.position}%;
  &:hover,
  &:active {
    width: 20px;
    height: 20px;
  }
  &:active {
    cursor: grabbing;
  }
`;