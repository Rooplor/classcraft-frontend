const MILLISECONDS_IN_A_SECOND = 1000;
const SECONDS_IN_A_MINUTE = 60;
const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;

export function isoToDateWithTimezone(isoString: string): Date {
  const date = new Date(isoString);
  const timezoneOffsetInMinutes = date.getTimezoneOffset();
  const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
  const adjustedTime = utcTime - timezoneOffsetInMinutes * 2 * 60000;
  return new Date(adjustedTime);
}

export function convertDatesToIsoString(
  dates: {
    date: {
      startDateTime: Date;
      endDateTime: Date;
    };
    venueId: string[];
  }[]
) {
  let globDate = dates.map((date) => ({
    date: {
      startDateTime: date.date.startDateTime.toISOString(),
      endDateTime: date.date.endDateTime.toISOString(),
    },
    venueId: date.venueId,
  }));

  const api = {
    sortDatesByStartDateTime() {
      globDate.sort((a, b) => {
        const aDate = new Date(a.date.startDateTime);
        const bDate = new Date(b.date.startDateTime);
        return aDate.getTime() - bDate.getTime();
      });
      return api;
    },
    removeDuplicatedDatesTime() {
      globDate = globDate.filter(
        (date, index, self) =>
          index ===
          self.findIndex(
            (t) =>
              t.date.startDateTime === date.date.startDateTime &&
              t.date.endDateTime === date.date.endDateTime
          )
      );
      return api;
    },
    get() {
      return globDate;
    },
  };
  return api;
}

export function countdownTimer(endDate: Date) {
  const countDownDate = endDate.getTime();
  const now = new Date().getTime();
  const distance = countDownDate - now;

  if (distance < 0) {
    return "Expired";
  } else if (
    distance <
    MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR
  ) {
    return `${Math.floor(
      distance / (MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE)
    )} minutes`;
  } else if (
    distance <
    MILLISECONDS_IN_A_SECOND *
      SECONDS_IN_A_MINUTE *
      MINUTES_IN_AN_HOUR *
      HOURS_IN_A_DAY
  ) {
    return `${Math.floor(
      distance /
        (MILLISECONDS_IN_A_SECOND * SECONDS_IN_A_MINUTE * MINUTES_IN_AN_HOUR)
    )} hours`;
  } else {
    return `${Math.floor(
      distance /
        (MILLISECONDS_IN_A_SECOND *
          SECONDS_IN_A_MINUTE *
          MINUTES_IN_AN_HOUR *
          HOURS_IN_A_DAY)
    )} days`;
  }
}
