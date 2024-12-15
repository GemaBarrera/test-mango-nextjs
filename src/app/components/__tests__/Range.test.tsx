import { render } from "@testing-library/react";
import { Range } from "../Range";

describe("Range", () => {
  const mockDataWithRangeValues = {
    min: 10,
    max: 50,
    rangeValues: [10, 20, 30, 40, 50],
  };

  const mockDataWithoutRangeValues = {
    min: 10,
    max: 50,
    rangeValues: [],
  };

  it("renders RangeWithRangeValues when rangeValues are present", () => {
    const { getByTestId } = render(<Range data={mockDataWithRangeValues} />);
    expect(getByTestId("range-with-rangevalues")).toBeInTheDocument();
  });

  it("renders RangeWithoutRangeValues when rangeValues are absent", () => {
    const { getByTestId } = render(<Range data={mockDataWithoutRangeValues} />);
    expect(getByTestId("range-without-rangevalues")).toBeInTheDocument();
  });
});
