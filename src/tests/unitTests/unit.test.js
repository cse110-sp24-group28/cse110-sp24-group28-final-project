/**
 * @jest-environment jsdom
 */
import { add } from "../../localStorageHelper.js";
import {
  deletetask,
  deletejournal,
  displaytasks,
  displayjournals,
  generate_year_range,
  getjournalsOnDate,
  hasjournalOnDate,
  daysInMonth,
} from "../../script.js";
import { generateTasks } from "./utils.js";
import { generateUniqueId } from "../../utils.js";

/**
 * Test add function
 */
test("add", () => {
  expect(add(3, 4)).toBe(7);
});

/**
 * Test generateUniqueId function generates a unique ID
 */
test("generateUniqueId() generates a unique ID", () => {
  // Generate two unique IDs and ensure they are different
  const id1 = generateUniqueId();
  const id2 = generateUniqueId();
  expect(id1).not.toBe(id2);
});

/**
 * Test delete task
 */
test("deletetask should delete a task", () => {
  // Create a task to delete
  const task = {
    id: generateUniqueId(),
    title: "Task to delete",
    details: "This task will be deleted.",
    dueDate: "2025-03-13",
  };

  // Add the task to local storage
  let tasks = [task];
  localStorage.setItem("tasks", JSON.stringify(tasks));

  deletetask(task.id);

  // Verify that the task was deleted
  const updatedTasks = JSON.parse(localStorage.getItem("tasks"));
  expect(updatedTasks).not.toContainEqual(task);
});

/**
 * Test delete journal
 */
test("deletejournal should delete a journal", () => {
  function deletejournal(journalId) {
    let journals = JSON.parse(localStorage.getItem("journals")) || [];
    journals = journals.filter((journal) => journal.id !== journalId);
    localStorage.setItem("journals", JSON.stringify(journals));
  }

  // Create a journal to delete
  const journal = {
    id: generateUniqueId(),
    title: "Journal to delete",
    content: "This journal will be deleted. Testing due today",
    date: "2024-05-23",
  };

  // Add the journal to local storage
  let journals = [journal];
  localStorage.setItem("journals", JSON.stringify(journals));

  deletejournal(journal.id);

  // Verify that the journal was deleted
  const updatedJournals = JSON.parse(localStorage.getItem("journals"));
  expect(updatedJournals).not.toContainEqual(journal);
});

/**
 * Test display tasks
 */
test("displaytasks should display tasks", () => {
  document.body.innerHTML = `<ul id="taskList"></ul>`;

  generateTasks();

  displaytasks();

  // Check if the task list contains the expected tasks
  const taskList = document.getElementById("taskList");
  expect(taskList.children.length).toBe(2);
  expect(taskList.innerHTML).toContain("Task 1");
  expect(taskList.innerHTML).toContain("Task 2");
});

/**
 * Test display journals
 */
test("displayjournal should display journals", () => {
  function displayjournal() {
    let journals = JSON.parse(localStorage.getItem("journals")) || [];
    const journalList = document.getElementById("journalList");
    if (!journalList) return;

    journalList.innerHTML = "";
    for (let i = 0; i < journals.length; i++) {
      let journal = journals[i];
      let journalItem = document.createElement("li");
      journalItem.innerHTML = `<strong>${journal.title}</strong> - ${journal.content} (Date: ${new Date(journal.date).toLocaleDateString()})`;
      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        deletejournal(journal.id);
      };
      journalItem.appendChild(deleteButton);
      journalList.appendChild(journalItem);
    }
  }

  document.body.innerHTML = `<ul id="journalList"></ul>`;

  const journal1 = {
    id: generateUniqueId(),
    title: "Journal 1",
    content: "Very Special Day. Finally 21!",
    date: "2024-03-13",
  };

  const journal2 = {
    id: generateUniqueId(),
    title: "Journal 2",
    content: "Summer Starting.",
    date: "2024-06-14",
  };

  let journals = [journal1, journal2];
  localStorage.setItem("journals", JSON.stringify(journals));

  displayjournal();

  const journalList = document.getElementById("journalList");
  expect(journalList.children.length).toBe(2);
  expect(journalList.innerHTML).toContain(journal1.title);
  expect(journalList.innerHTML).toContain(journal2.title);
});

/**
 * Test generate_year_range
 */
test("generate_year_range should create a range of years", () => {
  const startYear = 1999;
  const endYear = 2003;
  const expectedOutput =
    "<option value='1999'>1999</option><option value='2000'>2000</option><option value='2001'>2001</option><option value='2002'>2002</option><option value='2003'>2003</option>";

  expect(generate_year_range(startYear, endYear)).toBe(expectedOutput);
});

/**
 * Test daysInMonth should return the correct number of days for a given month and year
 */
test("daysInMonth should return the correct number of days for a given month and year", () => {
  expect(daysInMonth(2, 2024)).toBe(31);
  expect(daysInMonth(1, 2023)).toBe(28);
  expect(daysInMonth(1, 2024)).toBe(29); // Testing for Leap Year
  expect(daysInMonth(4, 2024)).toBe(31);
  expect(daysInMonth(6, 2024)).toBe(31);
  expect(daysInMonth(7, 2024)).toBe(31);
});
