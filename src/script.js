import { saveObject, getObject, storedObjects } from "./localStorageHelper.js";
import { handleSearchSubmit } from "./components/search.js";

let journalTitleInput, journalDescriptionInput, journalDateInput, journalList;
export let dateHeader;
// show today's date under Developer Journal
document.addEventListener("DOMContentLoaded", function () {
  dateHeader = document.getElementById("dateHeader");
  var currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long", // "Monday"
    year: "numeric", // "2022"
    month: "long", // "July"
    day: "numeric", // "20"
  });

  dateHeader.textContent = currentDate;
  document.getElementById("previous").addEventListener("click", previous);
  document.getElementById("next").addEventListener("click", next);
  document.getElementById("month").addEventListener("change", jump);
  document.getElementById("year").addEventListener("change", jump);
  journalTitleInput = document.getElementById("journalTitle");
  journalDescriptionInput = document.getElementById("journalDescription");
  journalDateInput = document.getElementById("journalDate");
  journalList = document.getElementById("journalList");

  showCalendar(currentMonth, currentYear);

  // Load and display journals
  displayjournals();

  // // Load and display tasks
  // displaytasks();
});

/**
 * Generates a unique id
 */
export function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * Deletes journal
 */
export function deletejournal(journalId) {
  storedObjects.journals = storedObjects.journals.filter((journal) => journal.id !== journalId);
  showCalendar(currentMonth, currentYear);
  displayjournals();
}

// added deletetask, which is the same as deletejournal but for the tasks
export function deletetask(taskId) {
  let tasks = getObject("tasks") || [];
  tasks = tasks.filter((task) => task.id !== taskId);
  saveObject("tasks", tasks);
  displaytasks();
}

export function displayjournals() {
  journalList.innerHTML = "";
  let currentDate = new Date(dateHeader.textContent);
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  let todayList = getjournalsOnDate(currentDay, currentMonth, currentYear);
  //Make emojies visiable in the journal only
  const moodtext = document.getElementById("mood-text");
  moodtext.style.display = "inline-block";
  const moods = document.querySelectorAll(".emoji");

  moods.forEach((mood) => {
    mood.style.display = "inline-block";
  });
  const todayMood = storedObjects.moods.filter((mood) => {
    let moodDate = new Date(mood.date);
    return moodDate.getDate() === currentDay && moodDate.getMonth() === currentMonth && moodDate.getFullYear() === currentYear;
  })[0];

  let todayDate = new Date();
  let todayIsSelected =
    currentDay === todayDate.getDate() && currentMonth === todayDate.getMonth() && currentYear === todayDate.getFullYear();
  moods.forEach((mood) => {
    if (todayMood != undefined) {
      if (mood.textContent === todayMood.mood) mood.style.opacity = "1";
      else mood.style.opacity = "0.3";
    } else if (todayIsSelected) {
      mood.style.opacity = "1";
    } else {
      mood.style.opacity = "0.3";
    }

    if (!todayIsSelected)
      mood.disabled = true; // Can only change the mood for the current day
    else mood.disabled = false;
  });
  for (let i = 0; i < todayList.length; i++) {
    let journal = todayList[i];
    let journalDate = new Date(journal.date);
    if (journalDate.getMonth() === currentMonth && journalDate.getFullYear() === currentYear) {
      let listItem = document.createElement("li");
      listItem.innerHTML = `<strong>${journal.title}</strong> - 
            ${journal.description} on 
            ${journalDate.toLocaleDateString()}`;

      // Add a delete button for each journal item
      let deleteButton = document.createElement("button");
      deleteButton.className = "delete-journal";
      deleteButton.textContent = "Delete";
      deleteButton.onclick = function () {
        // deletejournal(journal.id);
        customConfirm("Are you sure you want to delete this journal?", function (confirmed) {
          if (confirmed) {
            deletejournal(journal.id);
          } else {
            console.log("Deletion cancelled.");
          }
        });
      };

      listItem.appendChild(deleteButton);
      journalList.appendChild(listItem);
    }
  }
}

function customConfirm(msg, callback) {
  const confirmBox = document.getElementById("confirmBox");
  confirmBox.style.display = "block";
  confirmBox.querySelector("p").textContent = msg;

  confirmBox.querySelector("#confirmOk").onclick = function () {
    callback(true);
    confirmBox.style.display = "none";
  };
  confirmBox.querySelector("#confirmCancel").onclick = function () {
    callback(false);
    confirmBox.style.display = "none";
  };
}

// added displaytasks, which is the same as displayjournals but for the tasks
export function displaytasks() {
  //Emojis disappear when the task list is displayed
  // const moodtext = document.getElementById("mood-text");
  // moodtext.style.display = "none";
  // const moods = document.querySelectorAll(".emoji");
  // moods.forEach((mood) => {
  //   mood.style.display = "none";
  // });
  let tasks = getObject("tasks") || [];
  console.log("Retrieved tasks:", tasks);

  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  taskList.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let taskItem = document.createElement("li");
    taskItem.innerHTML = `<strong>${task.title}</strong> - ${task.details} (Due: ${new Date(task.dueDate).toLocaleDateString()})`;
    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-task";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      // deletetask(task.id);
      customConfirm("Are you sure you want to delete this task?", function (confirmed) {
        if (confirmed) {
          deletetask(task.id);
        } else {
          console.log("Deletion cancelled.");
        }
      });
    };
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  }
}

export function generate_year_range(start, end) {
  let years = "";
  for (let year = start; year <= end; year++) {
    years += "<option value='" + year + "'>" + year + "</option>";
  }
  return years;
}

let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let createYear = generate_year_range(2000, 2080);
if (document.getElementById("year")) document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let $dataHead = "<tr>";
for (let dhead in days) {
  $dataHead += "<th data-days='" + days[dhead] + "'>" + days[dhead] + "</th>";
}
$dataHead += "</tr>";

if (document.getElementById("thead-month")) document.getElementById("thead-month").innerHTML = $dataHead;

let monthAndYear = document.getElementById("monthAndYear");

// to the next month
function next() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

// to previous month
function previous() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {
  let firstDay = new Date(year, month, 1).getDay();
  let tbl = document.getElementById("calendar-body");
  tbl.innerHTML = "";
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth(month, year)) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.setAttribute("data-date", date);
        cell.setAttribute("data-month", month + 1);
        cell.setAttribute("data-year", year);
        cell.setAttribute("data-month_name", months[month]);
        cell.className = "date-picker";
        cell.innerHTML = "<span>" + date + "</span>";

        if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
          cell.className = "date-picker selected";
        }

        // for database testing
        if (hasjournalOnDate(date, month, year)) {
          cell.classList.add("journal-marker");
          cell.appendChild(createjournalTooltip(date, month, year));
        }

        row.appendChild(cell);
        date++;
      }
    }
    tbl.appendChild(row);
  }
  // change journal list header to date clicked on calendar
  tbl.addEventListener("click", function (event) {
    let clickedCell = event.target.closest(".date-picker");
    if (clickedCell) {
      let clickedDate = new Date(year, month, clickedCell.dataset.date);
      let clickedDateString = clickedDate.toLocaleDateString("en-US", {
        weekday: "long", // "Monday"
        year: "numeric", // "2022"
        month: "long", // "July"
        day: "numeric", // "20"
      });
      dateHeader.textContent = clickedDateString;
      displayjournals();
    }
  });
  displayjournals();

  //Display tasks instead of journals when view task button is clicked
  // Display journals instead of tasks when view journals button is clicked
  document.getElementById("view-tasks").addEventListener("click", function () {
    displaytasks();
    document.getElementById("TitleOfPage").textContent = "Developer Task List";
    document.getElementById("dateHeader").textContent = "";
    //change the title of the page to Developer Tasl
    const taskList = document.getElementById("taskList");
    const journalList = document.getElementById("journalList");
    if (taskList) {
      taskList.style.display = "block";
      //Emojis disappear when the task list is displayed
      const moodtext = document.getElementById("mood-text");
      moodtext.style.display = "none";
      const moods = document.querySelectorAll(".emoji");
      moods.forEach((mood) => {
        mood.style.display = "none";
      });
    }
    if (journalList) journalList.style.display = "none";
  });
  document.getElementById("view-journals").addEventListener("click", function () {
    displayjournals();
    document.getElementById("TitleOfPage").textContent = "Developer Journal";
    var dateHeader = document.getElementById("dateHeader");
    var currentDate = new Date().toLocaleDateString("en-US", {
      weekday: "long", // "Monday"
      year: "numeric", // "2022"
      month: "long", // "July"
      day: "numeric", // "20"
    });
    dateHeader.textContent = currentDate;
    const taskList = document.getElementById("taskList");
    if (taskList) taskList.style.display = "none";
    if (journalList) journalList.style.display = "block";
    displayjournals();
  });
  //when components bar button is clicked, journals are filtered based on components input
  document.getElementById("searchBarForm").addEventListener("submit", handleSearchSubmit);
}

function createjournalTooltip(date, month, year) {
  let tooltip = document.createElement("div");
  tooltip.className = "journal-tooltip";
  let journalsOnDate = getjournalsOnDate(date, month, year);
  for (let i = 0; i < journalsOnDate.length; i++) {
    let journal = journalsOnDate[i];
    let journalDate = new Date(journal.date);
    let journalText = `<strong>${journal.title}</strong> - 
            ${journal.description} on 
            ${journalDate.toLocaleDateString()}`;
    let journalElement = document.createElement("p");
    journalElement.innerHTML = journalText;
    journalElement.addEventListener("click", deletejournal);
    tooltip.appendChild(journalElement);
  }
  return tooltip;
}

/**
 * Get journal On Date
 */
export function getjournalsOnDate(date, month, year) {
  return storedObjects.journals.filter(function (journal) {
    let journalDate = new Date(journal.date);
    return journalDate.getDate() === date && journalDate.getMonth() === month && journalDate.getFullYear() === year;
  });
}

/**
 * Check has journal On Date
 */
export function hasjournalOnDate(date, month, year) {
  return getjournalsOnDate(date, month, year).length > 0;
}

/**
 * Show Searched Journals
 */
export function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

/**
 * Show Searched Journals
 */
export function showSearchedJournals(searchedJournals) {
  journalList.innerHTML = "";
  for (let i = 0; i < searchedJournals.length; i++) {
    let journal = searchedJournals[i];
    let journalDate = new Date(journal.date);
    let listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${journal.title}</strong> - 
            ${journal.description} on 
            ${journalDate.toLocaleDateString()}`;

    let deleteButton = document.createElement("button");
    deleteButton.className = "delete-journal";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      customConfirm("Are you sure you want to delete this journal?", function (confirmed) {
        if (confirmed) {
          deletejournal(journal.id);
        } else {
          console.log("Deletion cancelled.");
        }
      });
    };

    listItem.appendChild(deleteButton);
    journalList.append(listItem);
  }
}

// Mood trackers function
// when a button is clicked, the clicked button will be highlighted
document.addEventListener("DOMContentLoaded", function () {
  let moodButtons = document.querySelectorAll(".emoji");
  moodButtons.forEach((button) => {
    button.addEventListener("click", function () {
      moodTracker(button);
    });
  });
});
function moodTracker(todayMood) {
  let moodButtons = document.querySelectorAll(".emoji");
  //highlight the clicked button
  moodButtons.forEach((mood) => {
    mood.style.opacity = "0.3";
  });
  todayMood.style.opacity = "1";

  let todayDate = new Date();
  let todayDateStr = todayDate.toISOString();
  storedObjects.moods = storedObjects.moods.filter((mood) => {
    let moodDate = new Date(mood.date);
    return (
      moodDate.getDate() !== todayDate.getDate() &&
      moodDate.getMonth() !== todayDate.getMonth() &&
      moodDate.getFullYear() !== todayDate.getFullYear()
    );
  });

  const moodObj = { date: todayDateStr, mood: todayMood.textContent };
  let moods = getObject("moods") ?? [];
  moods.push(moodObj);
  storedObjects.moods = moods;
}
