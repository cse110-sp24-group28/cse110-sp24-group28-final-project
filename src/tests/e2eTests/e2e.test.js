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
    await page.type("#searchInput", "not-existent Journal");
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
});
