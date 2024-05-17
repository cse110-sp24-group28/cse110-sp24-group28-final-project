/**
 * @jest-environment jsdom
 */
import { sum } from "./sum.js";
import { add } from "../utils/localStorageHelper.js";
import { generateUniqueId } from "../script.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("add", () => {
  expect(add(3, 4)).toBe(7);
});

test("generateUniqueId() generates a unique ID", () => {
  // Generate two unique IDs and ensure they are different
  const id1 = generateUniqueId();
  const id2 = generateUniqueId();
  expect(id1).not.toBe(id2);
});
