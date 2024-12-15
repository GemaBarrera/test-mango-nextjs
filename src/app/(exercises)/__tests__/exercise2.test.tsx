import { render, screen } from "@testing-library/react";
import Exercise2 from "../exercise2/page";

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
        rangeValues: [10, 20, 30],
      }),
    });

    // Render and await component Range & RangeWithRangeValues to load
    const promise = Exercise2();
    const result = await promise;
    render(result);

    expect(screen.getByTestId("range-with-rangevalues")).toBeInTheDocument();
  });

  it("throws an error when fetch fails", async () => {
    // Mock failed response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    // Validate that an error is thrown
    await expect(Exercise2()).rejects.toThrow("HTTP Error: 404 - Not Found");
  });
});
