function getMonthTimings(params) {
  const response = UrlFetchApp.fetch(
    "http://api.aladhan.com/v1/calendarByCity?city=Asyut&country=Egypt&method=2&month=01&year=2023"
  );
  const content = response.getContentText();
  var prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  var monthData = JSON.parse(content)["data"];
  var arrayLength = monthData.length;
  var timesArray = [];
  for (let i = 0; i < arrayLength; i++) {
    for (let j = 0; j < 5; j++) {
      timesArray.push(monthData[i]["timings"][prayers[j]].split(" ")[0]);
    }
  }
  return timesArray;
}

function createEvents(params) {
  var timesArray = getMonthTimings();
  Logger.log(timesArray[0]);
}
function createDate(dateStr) {
  var date = new Date(dateStr);
  return date;
}

function createEvent(params) {
  var date = createDate("01-01-2023");
  var event = CalendarApp.getDefaultCalendar().createEvent("dhuhr", date);
  Logger.log(event)
}
