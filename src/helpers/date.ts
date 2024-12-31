import { DateTime } from "luxon";

import assertNever from "src/helpers/assertNever";

const parseDate = (date: string): DateTime => {
  return DateTime.fromISO(date, { zone: "utc" });
};

export const formatDate = (
  date: string,
  options: { format?: "huge" | "short" } = {},
): string => {
  const { format = "huge" } = options;

  const dateTimeFormatOptions = ((): Intl.DateTimeFormatOptions => {
    switch (format) {
      case "huge": {
        return DateTime.DATE_HUGE;
      }
      case "short": {
        return {
          day: "numeric",
          month: "long",
        };
      }
      default: {
        assertNever(format);
        return {};
      }
    }
  })();

  return parseDate(date).toLocaleString(dateTimeFormatOptions);
};

export const formatTime = (date: string): string => {
  return parseDate(date).toLocaleString(DateTime.TIME_SIMPLE);
};
