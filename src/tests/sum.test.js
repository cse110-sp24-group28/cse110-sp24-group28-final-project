import { sum } from "./sum.js";
import { add } from "../utils/localStorageHelper.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("add", () => {
  expect(add(3, 4)).toBe(7);
});
