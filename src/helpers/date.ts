import { DateTime } from "luxon";

const parseDate = (date: string): DateTime => {
  return DateTime.fromISO(date, { zone: "utc" });
};

export const formatDate = (date: string): string => {
  return parseDate(date).toLocaleString(DateTime.DATE_HUGE);
};

export const formatTime = (date: string): string => {
  return parseDate(date).toLocaleString(DateTime.TIME_SIMPLE);
};
