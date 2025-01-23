const calendarDays = document.getElementById("calendar-days");
const calendarPreviousYear = document.getElementById("calendar-previous-year");
const calendarCurrentYear = document.getElementById("calendar-current-year");
const calendarNextYear = document.getElementById("calendar-next-year");
const calendarPreviousMonth = document.getElementById(
  "calendar-previous-month"
);
const calendarCurrentMonth = document.getElementById("calendar-current-month");
const calendarNextMonth = document.getElementById("calendar-next-month");
const goToToday = document.getElementById("go-to-today");

const today = new Date();
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

const monthList = [
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
const poyaStartDate = new Date(2025, 0, 13); // January 13, 2025

// Function to calculate poya days
function getPoyaDays(startDate, year, month) {
  const poyaDays = [];
  const currentMonthStart = new Date(year, month, 1);
  const currentMonthEnd = new Date(year, month + 1, 0);

  let poyaDate = new Date(startDate);

  while (poyaDate < currentMonthEnd) {
    if (poyaDate >= currentMonthStart && poyaDate.getMonth() === month) {
      poyaDays.push(poyaDate.getDate());
    }
    // find next poya day
    poyaDate.setDate(poyaDate.getDate() + 29.5);
  }

  return poyaDays;
}
// Function to go to today's date
function goToTodayHandler() {
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();
  loadCalendar(currentYear, currentMonth); // Reload the calendar for today's year and month
}

// Add event listener to the button
goToToday.addEventListener("click", goToTodayHandler);
function loadCalendar(year, month) {
  calendarDays.innerHTML = "";
  calendarCurrentMonth.textContent = monthList[month];
  calendarCurrentYear.textContent = year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const poyaDays = getPoyaDays(poyaStartDate, year, month);

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += '<div class="day"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const isToday = date.toDateString() === today.toDateString();
    const isPoya = poyaDays.includes(day);
    const isChristmas = month === 11 && day === 25; // Check for December 25
    const isIndependenceDay = month === 1 && day === 4; // Check for February 04

    let dayClass = "day";

    if (dayOfWeek === 0) {
      dayClass += " sunday";
    } else if (dayOfWeek === 6) {
      dayClass += " saturday";
    } else {
      dayClass += " weekday";
    }

    if (isToday) {
      dayClass += " current";
    }

    if (isPoya) {
      dayClass += " poya";
    }
    if (isChristmas) {
      dayClass += " holiday";
    }
    if (isIndependenceDay) {
      dayClass += " holiday";
    }
    calendarDays.innerHTML += `<div class="${dayClass}">${day}</div>`;
  }
}

calendarPreviousYear.addEventListener("click", () => {
  currentYear--;
  loadCalendar(currentYear, currentMonth);
});

calendarNextYear.addEventListener("click", () => {
  currentYear++;
  loadCalendar(currentYear, currentMonth);
});

calendarPreviousMonth.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  loadCalendar(currentYear, currentMonth);
});

calendarNextMonth.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  loadCalendar(currentYear, currentMonth);
});

loadCalendar(currentYear, currentMonth);
