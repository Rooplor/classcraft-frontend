export function isoToDateWithTimezone(isoString: string): Date {
    const date = new Date(isoString);
    const timezoneOffsetInMinutes = date.getTimezoneOffset();
    const utcTime = date.getTime() + date.getTimezoneOffset() * 60000;
    const adjustedTime = utcTime - timezoneOffsetInMinutes * 2 * 60000;
    return new Date(adjustedTime);
}
