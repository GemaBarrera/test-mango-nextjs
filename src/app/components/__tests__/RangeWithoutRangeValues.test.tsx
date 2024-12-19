import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { RangeWithoutRangeValues } from "../Range";

describe("RangeWithoutRangeValues", () => {
  const mockMin = 10;
  const mockMax = 50;

  it("renders correctly with given min and max", () => {
    const { getByDisplayValue } = render(
      <RangeWithoutRangeValues min={mockMin} max={mockMax} />
    );

    expect(getByDisplayValue("10.00")).toBeInTheDocument();
    expect(getByDisplayValue("50.00")).toBeInTheDocument();
  });

  it("updates min value on input change", () => {
    const { getByDisplayValue } = render(
      <RangeWithoutRangeValues min={mockMin} max={mockMax} />
    );

    const minInput = getByDisplayValue("10.00");
    fireEvent.change(minInput, { target: { value: "15.00" } });
    fireEvent.blur(minInput);

    expect(getByDisplayValue("15.00")).toBeInTheDocument();
  });

  it("prevents invalid min value on input change", () => {
    const { getByDisplayValue } = render(
      <RangeWithoutRangeValues min={mockMin} max={mockMax} />
    );

    const minInput = getByDisplayValue("10.00");
    fireEvent.change(minInput, { target: { value: "60.00" } });
    fireEvent.blur(minInput);
    // Reset to previous valid value
    expect(getByDisplayValue("10.00")).toBeInTheDocument();
  });

  it("updates max value on input change", () => {
    const { getByDisplayValue } = render(
      <RangeWithoutRangeValues min={mockMin} max={mockMax} />
    );

    const maxInput = getByDisplayValue("50.00");
    fireEvent.change(maxInput, { target: { value: "45.00" } });
    fireEvent.blur(maxInput);

    expect(getByDisplayValue("45.00")).toBeInTheDocument();
  });

  it("prevents invalid max value on input change", () => {
    const { getByDisplayValue } = render(
      <RangeWithoutRangeValues min={mockMin} max={mockMax} />
    );

    const maxInput = getByDisplayValue("50.00");
    fireEvent.change(maxInput, { target: { value: "5.00" } });
    fireEvent.blur(maxInput);
    // Reset to previous valid value
    expect(getByDisplayValue("50.00")).toBeInTheDocument();
  });

  it("bullet for min value starts in the correct position and moves correctly", async () => {
    render(<RangeWithoutRangeValues min={0} max={100} />);

    const minBullet = screen.getAllByTestId("withoutrange-bullet")[0];

    // Calculate initial position spected
    const track = screen.getByTestId("withoutrange-track");
    const trackWidth = track.offsetWidth;
    const startPositionMin = (0 / 100) * trackWidth;

    // Await bullet position to be updated
    await waitFor(() =>
      expect(minBullet).toHaveStyle(`left: ${startPositionMin}px`)
    );

    fireEvent.mouseDown(minBullet);
    fireEvent.pointerMove(minBullet, { clientX: 50 });
    fireEvent.pointerUp(minBullet);

    // Verifiy bullet position has updated correctly
    const updatedPositionMin = (50 / 100) * trackWidth;

    await waitFor(() =>
      expect(minBullet).toHaveStyle(`left: ${updatedPositionMin}px`)
    );
  });

  it("bullet for max value starts in the correct position and moves correctly", async () => {
    render(<RangeWithoutRangeValues min={0} max={100} />);

    const maxBullet = screen.getAllByTestId("withoutrange-bullet")[1];
    const track = screen.getByTestId("withoutrange-track");
    const trackWidth = track.offsetWidth;

    // Initial position should be 100% of track length
    const startPositionMax = (100 / 100) * trackWidth;

    await waitFor(() =>
      expect(maxBullet).toHaveStyle(`left: ${startPositionMax}px`)
    );

    fireEvent.mouseDown(maxBullet);
    fireEvent.pointerMove(maxBullet, { clientX: 50 });
    fireEvent.pointerUp(maxBullet);

    const updatedPositionMax = (50 / 100) * trackWidth;

    await waitFor(() =>
      expect(maxBullet).toHaveStyle(`left: ${updatedPositionMax}px`)
    );
  });

  it("allows dragging bullets to update values", () => {
    render(<RangeWithoutRangeValues min={0} max={100} />);

    const bullets = screen.getAllByTestId("withoutrange-bullet");
    const track = screen.getByTestId("withoutrange-track");
    const minInput = screen.getAllByRole("textbox")[0];
    const maxInput = screen.getAllByRole("textbox")[1];

    // Mock the bounding box of the track for accurate calculations
    jest.spyOn(track, "getBoundingClientRect").mockReturnValue({
      left: 0,
      width: 1000,
      top: 0,
      bottom: 0,
      right: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Simulate dragging the left bullet
    fireEvent.mouseDown(bullets[0]);
    fireEvent.mouseMove(document, { clientX: 250 }); // Move to 25% of the track
    fireEvent.mouseUp(document);
    expect(minInput).toHaveValue("25.00");

    // Simulate dragging the right bullet
    fireEvent.mouseDown(bullets[1]);
    fireEvent.mouseMove(document, { clientX: 750 }); // Move to 75% of the track
    fireEvent.mouseUp(document);
    expect(maxInput).toHaveValue("75.00");
  });
});
