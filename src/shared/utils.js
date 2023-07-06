export const calculateDaysBtwTwoDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  const days = diff / 1000 / 60 / 60 / 24;
  return Math.round(days);
};
