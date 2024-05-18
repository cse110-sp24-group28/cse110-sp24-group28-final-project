import { storedObjects } from "./utils/localStorageHelper.js";

let journalTitleInput, journalDescriptionInput, journalDateInput, journalList;
let taskTitle, taskDetails, taskDueDate;
var dateHeader;
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
  document.getElementById("addjournal").addEventListener("click", addjournal);
  document.getElementById("previous").addEventListener("click", previous);
  document.getElementById("next").addEventListener("click", next);
  document.getElementById("month").addEventListener("change", jump);
  document.getElementById("year").addEventListener("change", jump);
  journalTitleInput = document.getElementById("journalTitle");
  journalDescriptionInput = document.getElementById("journalDescription");
  journalDateInput = document.getElementById("journalDate");
  journalList = document.getElementById("journalList");
  showCalendar(currentMonth, currentYear);
  taskTitle = document.getElementById('taskTitle');
  taskDetails = document.getElementById('task-details');
  taskDueDate = document.getElementById('dueDate');

  // x button back to index.html
  var closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", function () {
    window.location.href = "index.html"; // go back to index.html
  });

  // save button
  var saveButton = document.querySelector('.journal-form button[type="submit"]');
  saveButton.addEventListener("click", function (event) {
    // do saving here**
    const journalData = {
      journalName: journalTitleInput.value,
      journalDescriptionInput: journalDescriptionInput.value,
      journalDateInput: journalDateInput.value
    }
  
    localStorage.setItem('journals', JSON.stringify(journalData));
    window.location.href = "index.html"; // go back to index.html after save
  });

  var taskSaveButton = document.getElementById("addTask");
  taskSaveButton.addEventListener("click", function (event) {
    const taskData = {
      taskName: taskTitle.value,
      taskDetails: taskDetails.value,
      taskDueDate: taskDueDate.value
    }
    localStorage.setItem('tasks', JSON.stringify(taskData));
    window.location.href = "index.html";
  });
});

export function generateUniqueId() {
  return "_" + Math.random().toString(36);
}

function addjournal() {
  let dateInput = journalDateInput.value; // YYYY-MM-DD
  let title = journalTitleInput.value;
  let description = journalDescriptionInput.value;

  if (dateInput && title) {
    // append time "T12:00:00" to avoid timezone issues
    let dateWithTime = `${dateInput}T12:00:00`;

    // create a unique journal ID
    let journalId = generateUniqueId();

    storedObjects.journals = [
      ...storedObjects.journals,
      {
        id: journalId,
        date: dateWithTime, // store date with time
        title: title,
        description: description,
      },
    ];
    showCalendar(currentMonth, currentYear);
    journalDateInput.value = "";
    journalTitleInput.value = "";
    journalDescriptionInput.value = "";
    displayjournals();
  }
}

function deletejournal(journalId) {
  // Remove the journal from the journals array
  storedObjects.journals = storedObjects.journals.filter((journal) => {
    return journal.id !== journalId;
  });

  showCalendar(currentMonth, currentYear);
  displayjournals();
}

function displayjournals() {
  journalList.innerHTML = "";
  // for (let i = 0; i < journals.length; i++) { // all journals
  //   let journal = journals[i];
  // let todayList = getjournalsOnDate(today.getDate(), currentMonth, currentYear); // show today's journals
  let currentDate = new Date(dateHeader.textContent);
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  //let todayList = getjournalsOnDate(today.getDate(), currentMonth, currentYear); // show today's journals
  let todayList = getjournalsOnDate(currentDay, currentMonth, currentYear); // show journals of clicked day on calendar
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
        deletejournal(journal.id);
      };

      listItem.appendChild(deleteButton);
      journalList.appendChild(listItem);
    }
  }
}

function generate_year_range(start, end) {
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
        cell.innerHTML = "<span>" + date + "</span";

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
}

// for database testing
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

function getjournalsOnDate(date, month, year) {
  return storedObjects.journals.filter(function (journal) {
    let journalDate = new Date(journal.date);
    return journalDate.getDate() === date && journalDate.getMonth() === month && journalDate.getFullYear() === year;
  });
}

function hasjournalOnDate(date, month, year) {
  return getjournalsOnDate(date, month, year).length > 0;
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}
