import { fireEvent, render } from "@testing-library/react";
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
});
