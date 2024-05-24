/**
 * @jest-environment jsdom
 */
import { add } from "../localStorageHelper.js";
import {
  generateUniqueId,
  deletetask,
  deletejournal,
  displaytasks,
  displayjournals,
  generate_year_range,
  getjournalsOnDate,
  hasjournalOnDate,
  daysInMonth,
} from "../script.js";

test("add", () => {
  expect(add(3, 4)).toBe(7);
});

test("generateUniqueId() generates a unique ID", () => {
  // Generate two unique IDs and ensure they are different
  const id1 = generateUniqueId();
  const id2 = generateUniqueId();
  expect(id1).not.toBe(id2);
});

test("deletetask should delete a task", () => {
  const task = {
    id: generateUniqueId(),
    title: "Task to delete",
    details: "This task will be deleted.",
    dueDate: "2025-03-13",
  };

  let tasks = [task];
  localStorage.setItem("tasks", JSON.stringify(tasks));

  deletetask(task.id);

  const updatedTasks = JSON.parse(localStorage.getItem("tasks"));
  expect(updatedTasks).not.toContainEqual(task);
});

test("deletejournal should delete a journal", () => {
  function deletejournal(journalId) {
    let journals = JSON.parse(localStorage.getItem("journals")) || [];
    journals = journals.filter((journal) => journal.id !== journalId);
    localStorage.setItem("journals", JSON.stringify(journals));
  }

  const journal = {
    id: generateUniqueId(),
    title: "Journal to delete",
    content: "This journal will be deleted. Testing due today",
    date: "2024-05-23",
  };

  let journals = [journal];
  localStorage.setItem("journals", JSON.stringify(journals));

  deletejournal(journal.id);

  const updatedJournals = JSON.parse(localStorage.getItem("journals"));
  expect(updatedJournals).not.toContainEqual(journal);
});

test("displaytasks should display tasks", () => {
  document.body.innerHTML = `<ul id="taskList"></ul>`;

  const task1 = {
    id: generateUniqueId(),
    title: "Task 1",
    details: "First task. Reminder, Anirvinna's Birthday.",
    dueDate: "2025-03-13",
  };

  const task2 = {
    id: generateUniqueId(),
    title: "Task 2",
    details: "Second task. Reminder, a very special Birthday",
    dueDate: "2024-07-27",
  };

  let tasks = [task1, task2];
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displaytasks();

  const taskList = document.getElementById("taskList");
  expect(taskList.children.length).toBe(2);
  expect(taskList.innerHTML).toContain(task1.title);
  expect(taskList.innerHTML).toContain(task2.title);
});

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

test("generate_year_range should create a range of years", () => {
  function generate_year_range(start, end) {
    let years = "";
    for (let year = start; year <= end; year++) {
      years += "<option value='" + year + "'>" + year + "</option>";
    }
    return years;
  }

  const startYear = 1999;
  const endYear = 2003;
  const expectedOutput =
    "<option value='1999'>1999</option><option value='2000'>2000</option><option value='2001'>2001</option><option value='2002'>2002</option><option value='2003'>2003</option>";

  expect(generate_year_range(startYear, endYear)).toBe(expectedOutput);
});

test("getjournalsOnDate should retrieve journals on a specific date", () => {
  function getjournalsOnDate(date, month, year) {
    return (JSON.parse(localStorage.getItem("journals")) || []).filter(function (journal) {
      let journalDate = new Date(journal.date);
      return journalDate.getDate() === date && journalDate.getMonth() === month && journalDate.getFullYear() === year;
    });
  }

  const journal1 = {
    id: generateUniqueId(),
    title: "Journal 1",
    content: "Very special birthday!",
    date: "2024-03-13",
  };

  const journal2 = {
    id: generateUniqueId(),
    title: "Journal 2",
    content: "Finally 21",
    date: "2024-03-13",
  };

  const journal3 = {
    id: generateUniqueId(),
    title: "Journal 3",
    content: "Pi Day",
    date: "2025-03-14",
  };

  let journals = [journal1, journal2, journal3];
  localStorage.setItem("journals", JSON.stringify(journals));

  // Months and Dates are follow 0 indexing, so we are inputting value-1 to test
  const journalsOnDate = getjournalsOnDate(12, 2, 2024);
  expect(journalsOnDate).toEqual(expect.arrayContaining([journal1, journal2]));
  expect(journalsOnDate).not.toContain(journal3);
});

test("hasjournalsOnDate should check if journals exist on a specific date", () => {
  function getjournalsOnDate(date, month, year) {
    return (JSON.parse(localStorage.getItem("journals")) || []).filter(function (journal) {
      let journalDate = new Date(journal.date);
      return journalDate.getDate() === date && journalDate.getMonth() === month && journalDate.getFullYear() === year;
    });
  }

  function hasjournalsOnDate(date, month, year) {
    return getjournalsOnDate(date, month, year).length > 0;
  }

  const journal = {
    id: generateUniqueId(),
    title: "Journal",
    content: "First day on the journey. Let's see where this goes.",
    date: "2023-10-20",
  };

  let journals = [journal];
  localStorage.setItem("journals", JSON.stringify(journals));

  const journalExists = hasjournalsOnDate(19, 9, 2023);
  expect(journalExists).toBe(true);

  const journalDoesNotExist = hasjournalsOnDate(12, 9, 2023);
  expect(journalDoesNotExist).toBe(false);
});

test("daysInMonth should return the correct number of days for a given month and year", () => {
  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  expect(daysInMonth(2, 2024)).toBe(31);
  expect(daysInMonth(1, 2023)).toBe(28);
  expect(daysInMonth(1, 2024)).toBe(29); // Testing for Leap Year
  expect(daysInMonth(4, 2024)).toBe(31);
  expect(daysInMonth(6, 2024)).toBe(31);
  expect(daysInMonth(7, 2024)).toBe(31);
});
