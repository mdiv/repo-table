import { render, screen } from "@testing-library/react";
import { RepositoriesSearchInput } from "./RepositoriesSearchInput";

test("renders search input", () => {
  render(<RepositoriesSearchInput />);
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("renders a placeholder", () => {
  render(<RepositoriesSearchInput placeholder="react" />);
  expect(screen.getByRole("textbox").getAttribute("placeholder")).toBe("react");
});
