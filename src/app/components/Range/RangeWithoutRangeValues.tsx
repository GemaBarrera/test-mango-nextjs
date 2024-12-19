"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Bullet,
  Highlight,
  Input,
  RangeSelector,
  RangeWrapper,
  Track,
} from "./RangeWithoutRangeValues.styles";

interface RangeWithoutRangeValues {
  min?: number;
  max?: number;
}

const RangeWithoutRangeValues: React.FC<RangeWithoutRangeValues> = ({
  min = 0,
  max = 100,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);
  const [inputMinValue, setInputMinValue] = useState<string>(min.toFixed(2));
  const [inputMaxValue, setInputMaxValue] = useState<string>(max.toFixed(2));
  const [trackWidth, setTrackWidth] = useState<number>(1);

  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };

    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);

    return () => {
      window.removeEventListener("resize", updateTrackWidth);
    };
  }, []);

  // Update the 'min' and 'max' values based on the position of the mouse or touch during a drag operation.
  const handleMove = (clientX: number, type: "min" | "max") => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const newValue = parseFloat(
      ((offsetX / rect.width) * (max - min) + min).toFixed(2)
    );

    if (type === "min") {
      const clampedMinValue = Math.max(newValue, min);
      const clampedMinValueAdjusted = Math.min(clampedMinValue, maxValue);

      if (clampedMinValueAdjusted === minValue) return;

      setMinValue(clampedMinValueAdjusted);
      setInputMinValue(clampedMinValueAdjusted.toFixed(2));
    }

    if (type === "max") {
      const clampedMaxValue = Math.min(newValue, max);
      const clampedMaxValueAdjusted = Math.max(clampedMaxValue, minValue);

      if (clampedMaxValueAdjusted === maxValue) return;

      setMaxValue(clampedMaxValueAdjusted);
      setInputMaxValue(clampedMaxValueAdjusted.toFixed(2));
    }
  };

  // Listens for drag events and updates the handle's position.
  const handleMouseDown = (type: "min" | "max") => {
    const moveHandler = (e: MouseEvent) => handleMove(e.clientX, type);
    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
    };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
  };

  // Listens for touch events and updates the handle's position.
  const handleTouchStart = (type: "min" | "max") => {
    const moveHandler = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, type);
      }
    };
    const endHandler = () => {
      window.removeEventListener("touchmove", moveHandler);
      window.removeEventListener("touchend", endHandler);
    };
    window.addEventListener("touchmove", moveHandler);
    window.addEventListener("touchend", endHandler);
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

  const minPosition = ((minValue - min) / (max - min)) * trackWidth;
  const maxPosition = ((maxValue - min) / (max - min)) * trackWidth;

  return (
    <RangeWrapper data-testid="range-without-rangevalues">
      <Input
        type="text"
        value={inputMinValue}
        onChange={(e) => handleInputChange(e, "min")}
        onBlur={() => handleInputBlur("min")}
        style={{ width: "10vw" }}
      />
      <Badge style={{ marginRight: "10px" }}>€</Badge>
      <RangeSelector>
        <Track data-testid="withoutrange-track" ref={trackRef} />
        <Highlight
          style={{
            left: `${minPosition}px`,
            width: `${maxPosition - minPosition}px`,
          }}
        />
        <Bullet
          data-testid="withoutrange-bullet"
          style={{ left: `${minPosition}px` }}
          onMouseDown={() => handleMouseDown("min")}
          onTouchStart={() => handleTouchStart("min")}
        />
        <Bullet
          data-testid="withoutrange-bullet"
          style={{ left: `${maxPosition}px` }}
          onMouseDown={() => handleMouseDown("max")}
          onTouchStart={() => handleTouchStart("max")}
        />
      </RangeSelector>
      <Input
        type="text"
        value={inputMaxValue}
        onChange={(e) => handleInputChange(e, "max")}
        onBlur={() => handleInputBlur("max")}
        style={{ width: "10vw" }}
      />
      <Badge>€</Badge>
    </RangeWrapper>
  );
};

export default RangeWithoutRangeValues;
