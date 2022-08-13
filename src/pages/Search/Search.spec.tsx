import { render, screen } from "@testing-library/react";
import { Search } from "./Search";

describe("Search Page", () => {
  it("Render initial state", () => {
    render(<Search />);
    const searchPageTitle = screen.getByRole("heading", {
      name: /Countries around the World!/i,
    });
    const autocompleteNativeTitle = screen.getByRole("heading", {
      name: /Do you know there is a NATIVE Autocomplete?/i,
    });

    expect(searchPageTitle).toBeInTheDocument();
    expect(autocompleteNativeTitle).toBeInTheDocument();
  });
});
