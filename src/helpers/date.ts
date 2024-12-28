import { DateTime } from "luxon";

const parseDate = (date: string): DateTime => {
  return DateTime.fromFormat(date, "yyyy-MM-dd", {
    zone: "America/New_York",
  });
};

export const formatDate = (date: string): string => {
  return parseDate(date)
    .setZone("America/New_York")
    .toLocaleString(DateTime.DATE_HUGE);
};

const parseDateTime = (date: string, time: string): DateTime => {
  return DateTime.fromFormat(`${date} ${time}`, "yyyy-MM-dd HH:mm", {
    zone: "America/New_York",
  });
};

export const formatTime = (date: string, time: string): string => {
  return parseDateTime(date, time)
    .setZone("America/New_York")
    .toLocaleString(DateTime.TIME_SIMPLE);
};
