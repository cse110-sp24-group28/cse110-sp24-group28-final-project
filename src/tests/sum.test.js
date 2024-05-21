/**
 * @jest-environment jsdom
 */
import { add } from "../localStorageHelper.js";
import { generateUniqueId } from "../script.js";

test("add", () => {
  expect(add(3, 4)).toBe(7);
});

test("generateUniqueId() generates a unique ID", () => {
  // Generate two unique IDs and ensure they are different
  const id1 = generateUniqueId();
  const id2 = generateUniqueId();
  expect(id1).not.toBe(id2);
});
