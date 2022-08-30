import { encodeCursor } from "./useSearchRepositories";

test("converts number to cursor", () => {
  expect(encodeCursor(0)).toBe("Y3Vyc29yOjA=");
  expect(encodeCursor(1)).toBe("Y3Vyc29yOjE=");
  expect(encodeCursor(10)).toBe("Y3Vyc29yOjEw");
});
