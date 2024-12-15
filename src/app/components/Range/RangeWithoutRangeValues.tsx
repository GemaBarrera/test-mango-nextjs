"use client";

import React, { useRef, useState } from "react";
import styled from "styled-components";

interface RangeWithoutRangeValues {
  min: number;
  max: number;
}

const RangeWrapper = styled.div`
  display: flex;
`;

const RangeSelector = styled.div`
  position: relative;
  width: 400px;
  height: 40px;
  margin: 10px;
`;

const Track = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 4px;
  background-color: black;
  border-radius: 4px;
`;

const Highlight = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  height: 4px;
  background-color: black;
  border-radius: 4px;
`;

const Input = styled.input`
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

const Badge = styled.span`
  display: flex;
  align-items: center;
  font-weight: 300;
  font-size: 0.8rem;
`;

const Bullet = styled.div`
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

const RangeWithoutRangeValues: React.FC<RangeWithoutRangeValues> = ({
  min,
  max,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [inputMinValue, setInputMinValue] = useState<string>(min.toFixed(2));
  const [inputMaxValue, setInputMaxValue] = useState<string>(max.toFixed(2));

  const handleMove = (e: MouseEvent, type: "min" | "max") => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newValue = parseFloat(
      ((offsetX / rect.width) * (max - min) + min).toFixed(2)
    );

    if (type === "min") {
      if (newValue < min) return;
      if (newValue >= maxValue) return;
      setMinValue(newValue);
      setInputMinValue(newValue.toFixed(2));
    } else {
      if (newValue > max) return;
      if (newValue <= minValue) return;
      setMaxValue(newValue);
      setInputMaxValue(newValue.toFixed(2));
    }
  };

  const handleMouseDown = (type: "min" | "max") => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e, type);
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const rawValue = e.target.value;

    if (!/^\d*(\.\d{0,2})?$/.test(rawValue) && rawValue !== "") return;

    if (type === "min") {
      setInputMinValue(rawValue);
      const value = parseFloat(rawValue);
      if (!isNaN(value) && value >= min && value < maxValue) {
        setMinValue(value);
      }
    } else {
      setInputMaxValue(rawValue);
      const value = parseFloat(rawValue);
      if (!isNaN(value) && value <= max && value > minValue) {
        setMaxValue(value);
      }
    }
  };

  const handleInputBlur = (type: "min" | "max") => {
    if (type === "min") {
      const value = parseFloat(inputMinValue);
      if (isNaN(value) || value < min || value >= maxValue) {
        setInputMinValue(minValue.toFixed(2));
      }
    } else {
      const value = parseFloat(inputMaxValue);
      if (isNaN(value) || value > max || value <= minValue) {
        setInputMaxValue(maxValue.toFixed(2));
      }
    }
  };

  const trackWidth = trackRef.current?.offsetWidth || 1;
  const minPosition = ((minValue - min) / (max - min)) * trackWidth;
  const maxPosition = ((maxValue - min) / (max - min)) * trackWidth;

  return (
    <RangeWrapper data-testid="range-without-rangevalues">
      <Input
        type="text"
        value={inputMinValue}
        onChange={(e) => handleInputChange(e, "min")}
        onBlur={() => handleInputBlur("min")}
        style={{ width: "60px" }}
      />
      <Badge>€</Badge>
      <RangeSelector>
        <Track ref={trackRef} />
        <Highlight
          style={{ left: minPosition, width: maxPosition - minPosition }}
        />
        <Bullet
          style={{ left: minPosition }}
          onMouseDown={() => handleMouseDown("min")}
        />
        <Bullet
          style={{ left: maxPosition }}
          onMouseDown={() => handleMouseDown("max")}
        />
      </RangeSelector>
      <Input
        type="text"
        value={inputMaxValue}
        onChange={(e) => handleInputChange(e, "max")}
        onBlur={() => handleInputBlur("max")}
      />
      <Badge>€</Badge>
    </RangeWrapper>
  );
};

export default RangeWithoutRangeValues;
