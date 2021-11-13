export const statusInfo = (status: string) => {
  switch (status) {
    case "done":
      return "Готов";
    case "created":
      return "Создан";
    case "pending":
      return "Готовится";
    default:
      return status;
  }
};

export const convertDate = (date: string) => {
  const dateTime = new Date(date);
  let options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZoneName: "short",
  };
  return dateTime.toLocaleString("ru", options);
};
