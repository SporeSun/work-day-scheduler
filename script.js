$( document ).ready(function () {
  // TODO: Add code to display the current date in the header of the page.
  // Display the current day at the top of the calendar

  $("#currentDay").text(dayjs().format("dddd, MMMM D"));

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  // Function to color code the time blocks based on past, present, or future
  var currentHour = dayjs().hour();
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
  

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // Load saved events from local storage
  function loadEvents() {
    $(".time-block").each(function () {
      var eventId = $(this).attr("id");
      var eventText = localStorage.getItem(eventId);

      if (eventText) {
        $(this).find(".description").val(eventText);
      }
  });
  
    // Call the function to load events from local storage
loadEvents();
    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    
    // Event listener for the save button
    $(".saveBtn").on("click", function () {
      var eventId = $(this).parent().attr("id");
      var eventText = $(this).siblings(".description").val();
  
      localStorage.setItem(eventId, eventText);
    });
});
