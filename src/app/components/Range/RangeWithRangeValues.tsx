"use client";

import React, { useRef, useState } from "react";
import {
  Badge,
  Bullet,
  Label,
  RangeBar,
  RangeContainer,
  RangeWrapper,
  Track,
} from "./RangeWithRangeValues.styles";

interface RangeWithRangeValues {
  rangeValues: number[];
}

const RangeWithRangeValues: React.FC<RangeWithRangeValues> = ({
  rangeValues,
}) => {
  const sortedValues = [...rangeValues].sort((a, b) => a - b);

  const min = sortedValues[0];
  const max = sortedValues[sortedValues.length - 1];

  const [leftIndex, setLeftIndex] = useState<number>(0);
  const [rightIndex, setRightIndex] = useState<number>(sortedValues.length - 1);

  const rangeBarRef = useRef<HTMLDivElement>(null);

  // Update the index of left bullet and right bullet, ensuring they don't overlap.
  const handleLeftChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < rightIndex) {
      setLeftIndex(newIndex);
    }
  };

  const handleRightChange = (newIndex: number) => {
    if (newIndex > leftIndex && newIndex < sortedValues.length) {
      setRightIndex(newIndex);
    }
  };

  // Calculate the position of a value within the range bar as a percentage.
  const calculatePosition = (value: number): number =>
    ((value - min) / (max - min)) * 100;

  // Handle the drag operation when a bullet is moved.It determines the new index based on the mouse position and updates the corresponding bullet.
  const handleDrag = (clientX: number, isLeftBullet: boolean) => {
    if (!rangeBarRef.current) return;

    const rect = rangeBarRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newIndex = Math.round(percentage * (sortedValues.length - 1));

    if (isLeftBullet) {
      handleLeftChange(newIndex);
    } else {
      handleRightChange(newIndex);
    }
  };

  // Listen to `mousemove` and `touchmove` events for updating the bullet's position and `mouseup` and `touchend` events to remove the listeners when dragging stops.
  const setupDragListeners = (isLeftBullet: boolean) => {
    const moveHandler = (event: MouseEvent | TouchEvent) => {
      const clientX =
        event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
      handleDrag(clientX, isLeftBullet);
    };

    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler as EventListener);
      window.removeEventListener("mouseup", upHandler);
      window.removeEventListener("touchmove", moveHandler as EventListener);
      window.removeEventListener("touchend", upHandler);
    };

    window.addEventListener("mousemove", moveHandler as EventListener);
    window.addEventListener("mouseup", upHandler);
    window.addEventListener("touchmove", moveHandler as EventListener);
    window.addEventListener("touchend", upHandler);
  };

  return (
    <RangeWrapper data-testid="range-with-rangevalues">
      <Label style={{ justifyContent: "flex-end", width: "60px" }}>
        {sortedValues[leftIndex]}
      </Label>
      <Badge>€</Badge>
      <RangeContainer>
        <RangeBar ref={rangeBarRef}>
          <Track
            left={calculatePosition(sortedValues[leftIndex])}
            right={100 - calculatePosition(sortedValues[rightIndex])}
          />
          <Bullet
            data-testid="withrange-bullet"
            position={calculatePosition(sortedValues[leftIndex])}
            onMouseDown={() => setupDragListeners(true)}
            onTouchStart={() => setupDragListeners(true)}
          />
          <Bullet
            data-testid="withrange-bullet"
            position={calculatePosition(sortedValues[rightIndex])}
            onMouseDown={() => setupDragListeners(false)}
            onTouchStart={() => setupDragListeners(false)}
          />
        </RangeBar>
      </RangeContainer>
      <Label>{sortedValues[rightIndex]}</Label>
      <Badge>€</Badge>
    </RangeWrapper>
  );
};

export default RangeWithRangeValues;
