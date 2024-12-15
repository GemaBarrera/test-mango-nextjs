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
  const handleDrag = (event: MouseEvent, isLeftBullet: boolean) => {
    if (!rangeBarRef.current) return;

    const rect = rangeBarRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newIndex = Math.round(percentage * (sortedValues.length - 1));

    if (isLeftBullet) {
      handleLeftChange(newIndex);
    } else {
      handleRightChange(newIndex);
    }
  };

  // Listen to `mousemove` events for updating the bullet's position and `mouseup` events to remove the listeners when dragging stops.
  const setupDragListeners = (isLeftBullet: boolean) => {
    const moveHandler = (event: MouseEvent) => handleDrag(event, isLeftBullet);
    const upHandler = () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseup", upHandler);
    };
    window.addEventListener("mousemove", moveHandler);
    window.addEventListener("mouseup", upHandler);
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
            position={calculatePosition(sortedValues[leftIndex])}
            onMouseDown={() => setupDragListeners(true)}
          />
          <Bullet
            position={calculatePosition(sortedValues[rightIndex])}
            onMouseDown={() => setupDragListeners(false)}
          />
        </RangeBar>
      </RangeContainer>
      <Label>{sortedValues[rightIndex]}</Label>
      <Badge>€</Badge>
    </RangeWrapper>
  );
};

export default RangeWithRangeValues;
