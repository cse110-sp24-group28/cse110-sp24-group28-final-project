/**
 * @jest-environment jsdom
 */
import { generateUniqueId } from "../../script.js";
import { storedObjects } from "../../localStorageHelper.js";
//@ts-check
export const generateTasks = () => {
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
  localStorage.setItem("tasks", JSON.stringify([task1, task2]));
};

export const generateJournals = () => {
  storedObjects.journals = [
    {
      id: generateUniqueId(),
      title: "Task 1",
      description: "First task. Reminder, Anirvinna's Birthday.",
      date: "2025-03-13",
    },
    {
      id: generateUniqueId(),
      title: "Task 2",
      description: "Second task. Reminder, a very special Birthday",
      date: "2024-07-27",
    },
  ];
};
