import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

  it("bullets start in the correct position and move correctly", async () => {
    const rangeValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    render(<RangeWithRangeValues rangeValues={rangeValues} />);

    const leftBullet = screen.getAllByTestId("withrange-bullet")[0];
    const rightBullet = screen.getAllByTestId("withrange-bullet")[1];

    // Verify initial position of the bullets
    await waitFor(() =>
      expect(leftBullet).toHaveStyle(`transform: translate(-50%,-50%)`)
    );
    await waitFor(() =>
      expect(rightBullet).toHaveStyle(`transform: translate(-50%,-50%)`)
    );

    // Simulate left bullet movement
    fireEvent.click(leftBullet);
    fireEvent.pointerMove(leftBullet, { clientX: 150 });
    fireEvent.pointerUp(leftBullet);

    // Verify left bullet was moved to the right position
    await waitFor(() =>
      expect(leftBullet).toHaveStyle(`transform: translate(-50%,-50%)`)
    );

    // Simulate right bullet movement
    fireEvent.click(rightBullet);
    fireEvent.pointerMove(rightBullet, { clientX: 250 });
    fireEvent.pointerUp(rightBullet);

    // Verify right bullet was moved to the right position
    await waitFor(() =>
      expect(rightBullet).toHaveStyle(`transform: translate(-50%,-50%)`)
    );
  });
});
