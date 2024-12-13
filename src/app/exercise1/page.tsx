"use client";

import Range from "../components/Range";

export default function Exercise1() {
  const handleRangeChange = (minValue, maxValue) => {
    console.log(`Min: ${minValue}, Max: ${maxValue}`);
  };
  return <Range min={20} max={200} onChange={handleRangeChange} />;
}
