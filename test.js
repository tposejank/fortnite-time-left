var seasonDate = "";

fetch("https://tposejank.github.io/time-left-calculator/seasondate.txt").then((response) => response.text().then(set_seasonDate));
function set_seasonDate(date) {
  seasonDate = date;
}

console.log(seasonDate);

calculateTimeBetweenDates("2022-06-05");

function calculateTimeBetweenDates(second) {
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var firstDateRef = new Date();

  var firstDateMinutes = firstDateRef.getMinutes();
  var firstDateHours = firstDateRef.getHours();
  var firstDateSeconds = firstDateRef.getSeconds();

  var firstDateDay = firstDateRef.getDate();
  var firstDateMonth = firstDateRef.getMonth();
  var firstDateYear = firstDateRef.getFullYear();

  var fdd_string = firstDateDay;
  if (firstDateDay < 10) {
    fdd_string = "0" + firstDateDay;
  }

  var fdm_string = (firstDateMonth + 1);
  if (firstDateMonth < 10) {
    fdm_string = "0" + (firstDateMonth + 1);
  }

  var firstDateDate = firstDateYear + "-" + fdm_string + "-" + fdd_string;

  var firstDate = new Date(firstDateDate);
  var secondDate = new Date(second);

  var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

  var totalTimeInSeconds = diffDays * 24 * 60 * 60 + firstDateHours * 60 * 60 + firstDateMinutes * 60 + firstDateSeconds;
  var totalTimeInMinutes = diffDays * 24 * 60 + firstDateHours * 60 + firstDateMinutes;
  var totalTimeInHours = diffDays * 24 + firstDateHours;
  var totalTimeInDays = diffDays;
  var totalTimeInWeeks = diffDays / 7;

  var days = Math.floor(diffDays);
  var hours = Math.floor(24 - firstDateHours);
  var minutes = Math.floor(60 - firstDateMinutes);
  var seconds = Math.floor(60 - firstDateSeconds);
  var weeks = Math.floor(diffDays / 7);

  var day_string = days;
  if (days < 10) {
    day_string = "0" + days;
  }

  var hour_string = hours;
  if (hours < 10) {
    hour_string = "0" + hours;
  }

  var minute_string = minutes;
  if (minutes < 10) {
    minute_string = "0" + minutes;
  }

  var second_string = seconds;
  if (seconds < 10) {
    second_string = "0" + seconds;
  }

  //get the total time
  var totalTime = weeks + " weeks, " + day_string + " days, " + hour_string + " hours, " + minute_string + " minutes and " + second_string + " seconds";

  document.getElementById("day_div").innerHTML = day_string;
  document.getElementById("hour_div").innerHTML = hour_string;
  document.getElementById("minute_div").innerHTML = minute_string;
  document.getElementById("second_div").innerHTML = second_string;

  //start a 1 second timer
  var timer = setInterval(function() {
    calculateTimeBetweenDates("2022-06-05");
  }, 1000);
}