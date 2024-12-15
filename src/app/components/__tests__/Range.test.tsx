import { render, screen } from "@testing-library/react";
import { Range } from "../Range";

describe("Range component", () => {
  it("renders correctly", () => {
    render(<Range data={{ min: 0, max: 100, rangeValues: [] }} />);

    const rangeComponent = screen.queryByTestId("range-without-rangevalues");
    expect(rangeComponent).toBeInTheDocument();
  });
});
