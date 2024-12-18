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
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  // Update the 'min' and 'max' values based on the position of the mouse during a drag operation.
  const handleMove = (e: MouseEvent, type: "min" | "max") => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
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

  // Update the 'min' and 'max' values on touch the screen on touchable devices.
  const handleTouchMove = (e: TouchEvent, type: "min" | "max") => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const touch = e.touches[0];
    const offsetX = touch.clientX - rect.left;

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

  // Listens for 'mousemove' events to update the handle's position and 'mouseup' events to stop the dragging.
  const handleMouseDown = (type: "min" | "max") => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e, type);
    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  // Handle changes made in the input fields. Check that the input value is a valid number, and updates the state of 'min' or 'max'.
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

  // Ensures that the 'min' and 'max' values are within valid ranges, and if not, reset the input value to the nearest valid value.
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

  const handleTouchStart = (type: "min" | "max") => {
    const handleTouchMoveEvent = (e: TouchEvent) => handleTouchMove(e, type);
    const handleTouchEnd = () => {
      window.removeEventListener("touchmove", handleTouchMoveEvent);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    window.addEventListener("touchmove", handleTouchMoveEvent);
    window.addEventListener("touchend", handleTouchEnd);
  };

  return (
    <RangeWrapper data-testid="range-without-rangevalues">
      <Input
        type="text"
        value={inputMinValue}
        onChange={(e) => handleInputChange(e, "min")}
        onBlur={() => handleInputBlur("min")}
        style={{ width: "60px" }}
      />
      <Badge style={{ marginRight: "10px" }}>€</Badge>
      <RangeSelector>
        <Track data-testid="withoutrange-track" ref={trackRef} />
        <Highlight
          style={{ left: minPosition, width: maxPosition - minPosition }}
        />
        <Bullet
          data-testid="withoutrange-bullet"
          style={{ left: minPosition }}
          onMouseDown={() => handleMouseDown("min")}
          onTouchStart={() => handleTouchStart("min")}
        />
        <Bullet
          data-testid="withoutrange-bullet"
          style={{ left: maxPosition }}
          onMouseDown={() => handleMouseDown("max")}
          onTouchStart={() => handleTouchStart("max")}
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
