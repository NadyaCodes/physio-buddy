export const calculateDateDifference = (startDate: Date, endDate: Date) => {
  // const startDateString = "2024-05-14";
  // const startDate = new Date(startDateString); // Convert string to Date object

  // Convert endDateString to Date object without time component
  // const endDate = new Date(endDateString);
  endDate.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC
  console.log(startDate);
  console.log(endDate);

  // Calculate the difference in days (ignoring time)
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
  const differenceMs = Math.abs(endDate.getTime() - startDate.getTime());
  const differenceDays = Math.floor(differenceMs / oneDay); // Round down to nearest day

  console.log(`Number of days between: ${differenceDays} days`);
  return differenceDays;
};

export const createFakeDate = () => {
  const startDateString = "2024-05-14";
  const startDate = new Date(startDateString); // Convert string to Date object
  // startDate.setUTCHours(0, 0, 0, 0);
  return startDate;
};
