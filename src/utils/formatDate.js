export const formatDate = (dateTime) => {
  if (!dateTime) return "";

  const [date] = dateTime.split("T");
  const [year, month, day] = date.split("-");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${months[Number(month) - 1]}, ${year}`;
};
