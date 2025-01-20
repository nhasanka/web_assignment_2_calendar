const calendarDays = document.getElementById("calendar-days");
const calendarPreviousYear = document.getElementById("calendar-previous-year");
const calendarCurrentYear = document.getElementById("calendar-current-year");
const calendarNextYear = document.getElementById("calendar-next-year");
const calendarPreviousMonth = document.getElementById(
  "calendar-previous-month"
);
const calendarCurrentMonth = document.getElementById("calendar-current-month");
const calendarNextMonth = document.getElementById("calendar-next-month");
// console.log(calendarDays);
// console.log(calendarCurrentYear);
// console.log(calendarCurrentMonth);
// console.log(calendarPreviousYear);
// console.log(calendarNextYear);
// console.log(calendarPreviousMonth);
// console.log(calendarNextMonth);

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
const poyaStartDate = new Date(2025, 0, 14); // January 14, 2025

// Function to calculate 29.5-day intervals starting from the given date
function getPoyaDays(startDate, year, month) {
  const poyaDays = [];
  const currentMonthStart = new Date(year, month, 1);
  const currentMonthEnd = new Date(year, month + 1, 0);

  let poyaDate = new Date(startDate);

  while (poyaDate < currentMonthEnd) {
    if (poyaDate >= currentMonthStart && poyaDate.getMonth() === month) {
      poyaDays.push(poyaDate.getDate());
    }
    // Increment by 29.5 days
    poyaDate.setDate(poyaDate.getDate() + 29.5);
  }

  return poyaDays;
}
function loadCalendar(year, month) {
  calendarDays.innerHTML = "";
  calendarCurrentMonth.textContent = monthList[month];
  calendarCurrentYear.textContent = year;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const poyaDays = getPoyaDays(poyaStartDate, year, month);

  console.log(firstDay);
  console.log(daysInMonth);

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += '<div class="day"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    const isToday = date.toDateString() === today.toDateString();
    const isPoya = poyaDays.includes(day);

    const dayClass = `day ${dayOfWeek === 0 ? "sunday" : ""} ${
      dayOfWeek === 6 ? "saturday" : "weekday"
    } ${isToday ? "current" : ""} ${isPoya ? "poya" : ""}`;
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
