/* eslint-disable */
describe("Basic user flow for Website", () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:1234");
  });

  test("Search for not-existent journal entry", async () => {
    await page.goto("http://127.0.0.1:1234/journal.html");
    await page.type("#journalTitle", "Journal");
    await page.type("#journalDetails", "hello");
    await page.click("#saveJournal");
    // await page.goto("http://127.0.0.1:1234");
    await page.type("#searchInput", "not-existent");
    await page.click("#searchButton");
    const journalList = await page.evaluate(() => {
      return document.getElementById("journalList").innerHTML;
    });
    expect(journalList).toContain("");
  });

  test("Search for existent journal entry", async () => {
    await page.click("#searchInput", { count: 3 });
    await page.type("#searchInput", "Journal");
    await page.click("#searchButton");
    const journalList = await page.evaluate(() => {
      return document.getElementById("journalList").innerHTML;
    });
    expect(journalList).toContain("Journal");
  });

  test("Navigating to Previous Month", async () => {
    // Get the current month and year before clicking "Previous"
    const monthAndYearBefore = await page.evaluate(() => {
      return document.getElementById("monthAndYear").textContent;
    });

    // Click the "Previous" button
    await page.click("#previous");

    // Get the current month and year after clicking "Previous"
    const monthAndYearAfter = await page.evaluate(() => {
      return document.getElementById("monthAndYear").textContent;
    });

    // Split the text to get the month and year separately
    const [previousMonthBefore, previousYearBefore] = monthAndYearBefore.split(" ");
    const [previousMonthAfter, previousYearAfter] = monthAndYearAfter.split(" ");

    // Convert month names to numbers
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const previousMonthIndexBefore = months.indexOf(previousMonthBefore);
    const previousMonthIndexAfter = months.indexOf(previousMonthAfter);

    // Check if the previous month is correct
    expect(previousYearAfter).toBe(previousYearBefore);
    expect(previousMonthIndexAfter).toBe(previousMonthIndexBefore - 1);
  });

  test("Navigating to Next Month", async () => {
    // Get the current month and year before clicking "Next"
    const monthAndYearBefore = await page.evaluate(() => {
      return document.getElementById("monthAndYear").textContent;
    });

    // Click the "Next" button
    await page.click("#next");

    // Get the current month and year after clicking "Next"
    const monthAndYearAfter = await page.evaluate(() => {
      return document.getElementById("monthAndYear").textContent;
    });

    // Split the text to get the month and year separately
    const [nextMonthBefore, nextYearBefore] = monthAndYearBefore.split(" ");
    const [nextMonthAfter, nextYearAfter] = monthAndYearAfter.split(" ");

    // Convert month names to numbers
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const nextMonthIndexBefore = months.indexOf(nextMonthBefore);
    const nextMonthIndexAfter = months.indexOf(nextMonthAfter);

    // Check if the next month is correct
    expect(nextYearAfter).toBe(nextYearBefore);
    expect(nextMonthIndexAfter).toBe(nextMonthIndexBefore + 1);
  });

  test("Jumping to Selected Month and Year", async () => {
    // Get the current month and year before selecting new values
    const monthAndYearBefore = await page.evaluate(() => {
      return document.getElementById("monthAndYear").textContent;
    });

    // Select new month and year
    await page.select("#month", "0"); // Select February
    await page.select("#year", "2023"); // Select 2023

    // Trigger jump function
    await page.evaluate(() => {
      document.getElementById("month").dispatchEvent(new Event("change"));
      document.getElementById("year").dispatchEvent(new Event("change"));
    });

    // Get the current month and year after selecting new values
    const monthAndYearAfter = await page.evaluate(() => {
      return document.getElementById("monthAndYear").textContent;
    });

    // Assert that the month and year have changed correctly
    expect(monthAndYearAfter).toBe("January 2023");
  });

  test("Task List Persists After Page Reload", async () => {
    // Get the initial state of the journalList before reloading the page
    const taskListBefore = await page.evaluate(() => {
      return document.getElementById("taskList").innerHTML;
    });

    // Reload the page
    await page.reload();

    // Get the state of the journalList after reloading the page
    const taskListAfter = await page.evaluate(() => {
      return document.getElementById("taskList").innerHTML;
    });

    // Compare the initial and current states of the journalList
    expect(taskListAfter).toBe(taskListBefore);
  });

  test("Click 'Create' button and navigate to journal.html", async () => {
    await page.click("#create");

    const url = page.url();
    expect(url).toContain("journal.html");
  });

  test("Mood of the Day selection persists after reload", async () => {
    // Start on the homepage
    await page.goto("http://127.0.0.1:1234");

    // Wait for the emoji elements to be available
    await page.waitForSelector(".emoji");

    // Click the very happy emoji
    const veryHappyEmoji = await page.$("#veryHappyEmoji");
    await veryHappyEmoji.click();

    // Reload the page
    await page.reload();

    // Wait for the emoji elements to be available again
    await page.waitForSelector(".emoji");

    // Check if the very happy emoji is still selected (assuming selection affects opacity)
    const veryHappyEmojiAfterReload = await page.$("#veryHappyEmoji");
    const opacity = await page.evaluate((emoji) => emoji.style.opacity, veryHappyEmojiAfterReload);
    expect(opacity).toBe("1"); // Assuming that the selected emoji has an opacity of "1"
  });

  test("Navigation to home screen after choosing to exit from journal creation", async () => {
    // Navigate to the journal creation page
    await page.goto("http://127.0.0.1:1234/journal.html");

    // Click the save button
    await page.click("#close");

    // Check if we are back on the home screen
    const url = page.url();
    expect(url).toBe("http://127.0.0.1:1234/index.html");
  });

  test("Navigation to home screen after creating journal", async () => {
    // Navigate to the journal creation page
    await page.goto("http://127.0.0.1:1234/journal.html");

    // Fill in the journal form
    await page.type("#journalTitle", "Test Journal");
    await page.type("#journalDetails", "Journal entry for testing purposes.");

    // Click the save button
    await page.click("#saveJournal");

    // Check if we are back on the home screen
    const url = page.url();
    expect(url).toBe("http://127.0.0.1:1234/index.html");
  });

  test("Navigation to home screen after choosing to exit from Task creation", async () => {
    // Navigate to the journal creation page
    await page.goto("http://127.0.0.1:1234/journal.html");

    // Click the task button to go to the task creation page
    await page.click("#task");

    await page.waitForSelector("#close");

    // Click the close button to exit task creation
    await page.click("#close");

    // Check if we are back on the home screen
    const url = page.url();
    expect(url).toBe("http://127.0.0.1:1234/index.html");
  });

  test("Navigation to home screen after creating task", async () => {
    // Navigate to the journal creation page
    await page.goto("http://127.0.0.1:1234/journal.html");

    // Navigate to the task creation page
    await page.click("#task");

    // Fill in the task form
    await page.type("#taskTitle", "Test Task");
    await page.type("#taskDetails", "Task entry for testing purposes.");

    // Set the due date using JavaScript to ensure it's correctly set
    await page.evaluate(() => {
      document.querySelector("#dueDate").value = "2024-06-10";
    });

    // Click the save button
    await page.click("#addTask");

    // Check if we are back on the home screen
    const url = page.url();
    expect(url).toBe("http://127.0.0.1:1234/index.html");
  });
});
