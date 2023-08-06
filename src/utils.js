function isWithinTwoDaysOfDeadline(deadline, currentDate) {
  // Convert both dates to Date objects
  const deadlineDate = new Date(deadline);
  const currentDateObj = new Date(currentDate);

  // Remove time components from the dates
  deadlineDate.setHours(0, 0, 0, 0);
  currentDateObj.setHours(0, 0, 0, 0);

  // Calculate the difference in milliseconds between the two dates
  const timeDifference = deadlineDate.getTime() - currentDateObj.getTime();

  // Calculate the difference in days
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // Check if the difference is less than or equal to 2 days
  return daysDifference <= 2;
}

module.exports = { isWithinTwoDaysOfDeadline };
