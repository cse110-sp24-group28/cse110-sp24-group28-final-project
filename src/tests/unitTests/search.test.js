/**
 * @jest-environment jsdom
 */
import { generateJournals } from "./utils.js";
import { search } from "../../components/search.js";

test("test search journal functionality", () => {
  generateJournals();
  expect(search("very").length).toBe(1);
  expect(search("reminder").length).toBe(2);
  expect(search("chameleon").length).toBe(0);
});
