/* eslint-disable */
/* run index.html first, then run e2e test */
describe("Basic user flow for Website", () => {
  beforeAll(async () => {
    await page.goto("http://127.0.0.1:5500/src/index.html");
  });
  // User Story 1
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
  test("Journal List Persists After Page Reload", async () => {
    // Get the initial state of the journalList before reloading the page
    const journalListBefore = await page.evaluate(() => {
      return document.getElementById("journalList").innerHTML;
    });

    // Reload the page
    await page.reload();

    // Get the state of the journalList after reloading the page
    const journalListAfter = await page.evaluate(() => {
      return document.getElementById("journalList").innerHTML;
    });

    // Compare the initial and current states of the journalList
    expect(journalListAfter).toBe(journalListBefore);
  });

  // User Story 2

  // User Story 3

  //
});
