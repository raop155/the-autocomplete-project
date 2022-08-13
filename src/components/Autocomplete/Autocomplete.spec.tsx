import { fireEvent, render, screen } from "@testing-library/react";
import { Autocomplete } from "./Autocomplete";

const mockNameItems: string[] = [
  "Alan",
  "Aloha",
  "Alejandra",
  "Bruno",
  "Bruce",
  "Flor",
  "Ricardo",
];

describe("Autocomplete Component", () => {
  it("Should all behaviors work", async () => {
    render(<Autocomplete items={mockNameItems} />);

    // Initial state
    const inputElement: HTMLInputElement = screen.getByRole("textbox");
    let listItems: HTMLElement[] = screen.queryAllByRole("listitem");

    expect(inputElement).toBeInTheDocument();
    expect(listItems.length).toEqual(0);

    // Focus && change input value
    const inputValue: string = "br";
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: inputValue } });
    listItems = await screen.findAllByRole("listitem");

    expect(inputElement.value).toBe(inputValue);
    expect(listItems.length).toEqual(2);
    expect(listItems.map((item) => item.textContent)).toMatchInlineSnapshot(`
Array [
  "Bruno",
  "Bruce",
]
`);

    // Select first listitem & focus out
    const firstListItem: HTMLElement = listItems[0];
    fireEvent.click(firstListItem);
    listItems = screen.queryAllByRole("listitem");

    expect(inputElement.value).toBe(firstListItem.textContent);
    expect(listItems.length).toEqual(0);
  });
});
