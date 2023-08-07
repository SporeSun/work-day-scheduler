$( document ).ready(function () {
  // Display the current day at the top of the calendar
  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // Function to color code the time blocks based on past, present, or future
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Call the function to update time block colors
  updateTimeBlocks();

  // Load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var eventId = $(this).attr("id");
      var eventText = localStorage.getItem(eventId);

      if (eventText) {
        $(this).find(".description").val(eventText);
      }
    });
  }

  // Call the function to load events from local storage
  loadEvents();

  // Event listener for the save button
  $(".saveBtn").on("click", function () {
    var eventId = $(this).parent().attr("id");
    var eventText = $(this).siblings(".description").val();

    localStorage.setItem(eventId, eventText);
  });
});