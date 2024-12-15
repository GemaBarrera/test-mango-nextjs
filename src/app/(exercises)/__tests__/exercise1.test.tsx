import { render, screen } from "@testing-library/react";
import Exercise1 from "../exercise1/page";

// Fetch mock
global.fetch = jest.fn();

describe("Exercise1 Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetches data and renders Range component on success", async () => {
    // Mock successful response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        min: 10,
        max: 50,
        rangeValues: [],
      }),
    });

    // Render and await component Range & RangeWithoutRangeValues to load
    const promise = Exercise1();
    const result = await promise;
    render(result);

    expect(screen.getByTestId("range-without-rangevalues")).toBeInTheDocument();
  });

  it("throws an error when fetch fails", async () => {
    // Mock failed response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    // Validate that an error is thrown
    await expect(Exercise1()).rejects.toThrow("HTTP Error: 404 - Not Found");
  });
});
