import { render, screen } from "@testing-library/react";
import { Repository } from "../models/Repository";
import { RepositoriesTable } from "./RepositoriesTable";

test("renders table headers", () => {
  render(<RepositoriesTable />);
  const headers = screen.getAllByRole("columnheader");
  expect(headers).toHaveLength(3);

  const [name, stars, forks] = headers;
  expect(name.textContent).toBe("name");
  expect(stars.textContent).toBe("🌟 stars");
  expect(forks.textContent).toBe("🍴 forks");
});

test("renders table data", () => {
  const data: Repository[] = [
    {
      id: "1",
      nameWithOwner: "joe/react",
      homepageUrl: "http://www.github.com/joe/react",
      stargazerCount: 100,
      forkCount: 3,
    },
    {
      id: "2",
      nameWithOwner: "peter/typescript",
      homepageUrl: "http://www.github.com/peter/typescript",
      stargazerCount: 50,
      forkCount: 2,
    },
  ];

  render(<RepositoriesTable data={data} />);

  const cells = screen.getAllByRole("cell");
  expect(cells).toHaveLength(6);

  const [name1, stars1, forks1, name2, stars2, forks2] = cells;
  expect(name1.textContent).toBe("joe/react");
  expect(screen.getByText("joe/react").getAttribute("href")).toBe("http://www.github.com/joe/react");
  expect(stars1.textContent).toBe("🌟 100");
  expect(forks1.textContent).toBe("🍴 3");

  expect(name2.textContent).toBe("peter/typescript");
  expect(screen.getByText("peter/typescript").getAttribute("href")).toBe("http://www.github.com/peter/typescript");
  expect(stars2.textContent).toBe("🌟 50");
  expect(forks2.textContent).toBe("🍴 2");
});