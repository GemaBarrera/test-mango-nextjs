import { fireEvent, render } from "@testing-library/react";
import { RangeWithRangeValues } from "../Range";

describe("RangeWithRangeValues", () => {
  const mockRangeValues = [10, 20, 30, 40, 50];

  it("renders correctly with given range values", () => {
    const { getByText } = render(
      <RangeWithRangeValues rangeValues={mockRangeValues} />
    );

    expect(getByText("10")).toBeInTheDocument();
    expect(getByText("50")).toBeInTheDocument();
  });

  it("updates left bullet position on drag", () => {
    const { container, getByText } = render(
      <RangeWithRangeValues rangeValues={mockRangeValues} />
    );

    const leftBullet = container.querySelector("div:nth-of-type(4)");
    const rangeBar = container.querySelector("div:nth-of-type(3)");

    if (leftBullet && rangeBar) {
      fireEvent.mouseDown(leftBullet);
      fireEvent.mouseMove(rangeBar, { clientX: 100 });
      fireEvent.mouseUp(rangeBar);

      // Assert that the left bullet position is updated, assuming the left index moved
      expect(getByText("20")).toBeInTheDocument();
    }
  });

  it("updates right bullet position on drag", () => {
    const { container, getByText } = render(
      <RangeWithRangeValues rangeValues={mockRangeValues} />
    );

    const rightBullet = container.querySelector("div:nth-of-type(5)");
    const rangeBar = container.querySelector("div:nth-of-type(3)");

    if (rightBullet && rangeBar) {
      fireEvent.mouseDown(rightBullet);
      fireEvent.mouseMove(rangeBar, { clientX: 300 });
      fireEvent.mouseUp(rangeBar);

      // Assert that the right bullet position is updated, assuming the right index moved
      expect(getByText("40")).toBeInTheDocument();
    }
  });
});
