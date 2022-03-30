var seasonDate = "2022-06-05";
var startDate = "2022-03-20";

var pageTitleCanChange = true;

calculateTimeBetweenDates(seasonDate);

function calculateTimeBetweenDates(second) {
  var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  var firstDateRef = new Date();
  var seasonStart = new Date(startDate);

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

  if (seconds == 60) {
    second_string = "00";
  }

  var totalTime = weeks + " weeks, " + day_string + " days, " + hour_string + " hours, " + minute_string + " minutes and " + second_string + " seconds";

  document.getElementById("day_div").innerHTML = day_string;
  document.getElementById("hour_div").innerHTML = hour_string;
  document.getElementById("minute_div").innerHTML = minute_string;
  document.getElementById("second_div").innerHTML = second_string;
  document.getElementById("week_div").innerHTML = weeks + " weeks";

  var format = day_string + " : " + hour_string + " : " + minute_string + " : " + second_string;
  if (pageTitleCanChange) {
    document.title = format;
  }

  var sp1=secondDate.getTime()-seasonStart.getTime();
	var sp2=firstDate.getTime()-seasonStart.getTime();
  var sp3=secondDate.getTime()-firstDate.getTime();
	document.getElementById("season_percent").innerHTML = "Completed " + Math.round(sp2 / sp1 * 10000) / 100 + "%";
  document.getElementById("season_remaining").innerHTML = Math.round(sp3 /sp1 * 10000) / 100 + "% Remaining";

  document.getElementById("progressBar").style.width = Math.round(sp2 / sp1 * 10000) / 100 + "%";
  document.getElementById("progressBar").innerHTML = Math.round(sp2 / sp1 * 10000) / 100 + "%";

  //start a 1 second timer
  var timer = setInterval(function() {
    calculateTimeBetweenDates(seasonDate);
  }, 1000);
}

function greenBg() {
  var checkbox = document.getElementById("green_background");
  if (checkbox.checked == true) {
    document.body.style.backgroundColor = "#90EE90";
  } else {
    document.body.style.backgroundColor = "#FFFFFF";
  }
}

function pagetitlestuff() {
  var checkbox = document.getElementById("pagetitlestuff");
  if (checkbox.checked == true) {
    pageTitleCanChange = false;
    document.getElementById("pagetitletxt").innerHTML = "Resume page title countdown";
  } else {
    pageTitleCanChange = true;
    document.getElementById("pagetitletxt").innerHTML = "Stop page title countdown";
  }
}

function streamerMode() {
  var checkbox = document.getElementById("streamer_mode");
  if (checkbox.checked == true) {
    document.getElementById("day_div").style.fontSize = "100px";
    document.getElementById("hour_div").style.fontSize = "100px";
    document.getElementById("minute_div").style.fontSize = "100px";
    document.getElementById("second_div").style.fontSize = "100px";

    document.getElementById("dot1").style.fontSize = "100px";
    document.getElementById("dot2").style.fontSize = "100px";
    document.getElementById("dot3").style.fontSize = "100px";
  } else {
    document.getElementById("day_div").style.fontSize = "16px";
    document.getElementById("hour_div").style.fontSize = "16px";
    document.getElementById("minute_div").style.fontSize = "16px";
    document.getElementById("second_div").style.fontSize = "16px";

    document.getElementById("dot1").style.fontSize = "16px";
    document.getElementById("dot2").style.fontSize = "16px";
    document.getElementById("dot3").style.fontSize = "16px";
  }
}

function share() {
  //get url
  var url = window.location.href;

  //copy to clipboard
  copyToClipboard(url);

  //show success message
  document.getElementById("share").innerHTML = "Copied to clipboard!";
  var timer = setInterval(function() {
    document.getElementById("share").innerHTML = "Share";
    clearInterval(timer);
  }, 1000);

  /*document.getElementById("share_success").style.display = "block";
  document.getElementById("share_success").style.opacity = "1";
  document.getElementById("share_success").style.transition = "opacity 1s";
  document.getElementById("share_success").style.transitionDelay = "1s";
  document.getElementById("share_success").style.transitionTimingFunction = "ease-in-out";
*/
}

//https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyToClipboard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
      // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
      return window.clipboardData.setData("Text", text);

  }
  else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
      var textarea = document.createElement("textarea");
      textarea.textContent = text;
      textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
          return document.execCommand("copy");  // Security exception may be thrown by some browsers.
      }
      catch (ex) {
          console.warn("Copy to clipboard failed.", ex);
          return prompt("Copy to clipboard: Ctrl+C, Enter", text);
      }
      finally {
          document.body.removeChild(textarea);
      }
  }
}

function taketosettings() {
  window.open("obs.html", '_blank');
}