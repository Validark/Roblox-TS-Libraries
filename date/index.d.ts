/** An object the represents a date or time. Used with `os.date` and `os.time`. */
interface DateTable {
	/** The year. */
	year: number;
	/** The month. [1, 12] */
	month: number;
	/** The day. [1, 31] */
	day: number;

	/** The hour. [0, 23] */
	hour?: number;
	/** The minute. [0, 59] */
	min?: number;
	/** The second. [0, 59] */
	sec?: number;
	/** Whether this object represents a daylight savings time. */
	isdst?: boolean;
	/** The number of days into the year. [1, 366] */
	yday?: number;
	/** The day of the week. [1, 7] */
	wday?: number;
}

 /**
 * Formats the given formatString with date/time information based on the given time.
 *
 * If the formatString is `*t`, it will use local time and return a DateTable.
 *
 * If the formatString is `!*t`, it will use UTC time and return a DateTable.
 *
 * Otherwise, it will format the string with the given specifiers (specifiers are based on the C function strftime)
 *
 * The following specifiers are supported:
 *
 * | Specifier | Meaning | Example |
 * | --- | --- | --- |
 * | %a | Abbreviated weekday name | Wed |
 * | %A | Full weekday name * | Wednesday |
 * | %b | Abbreviated month name * | Sep |
 * | %B | Full month name * | September |
 * | %c | Date and time * |   |
 * | %d | Day of the month | 16 |
 * | %H | Hour, using 24-hour clock | 23 |
 * | %I | Hour, using 12-hour clock | 11 |
 * | %j | Day of year | 259 |
 * | %m | Month | 09 |
 * | %M | Minute | 48 |
 * | %p | Either "am" or "pm" | pm |
 * | %S | Second | 10 |
 * | %U | Week number (first Sunday as the first day of week one) | 37 |
 * | %w | Weekday | 3 |
 * | %W | Week number (first Monday as the first day of week one) | 37 |
 * | %x | Date * | 09/16/98 |
 * | %X | Time * | 23:48:10 |
 * | %y | Two-digit year | 98 |
 * | %Y | Full year | 1998 |
 * | %z | ISO 8601 offset from UTC in timezone (1 minute = 1, 1 hour = 100) | -0400 |
 * | %Z | Timezone name or abbreviation * | Eastern Daylight Time |
 * | %% | The % character | %% |
 * | %c | "%a %b %e %X %Y" | 09/16/98 23:48:10 |
 * | %D | "%m/%d/%y" | 10/30/20 |
 * | %F | "%Y-%m-%d" | 2020-30-10 |
 * | %R | "%H:%M" | 23:59 |
 * | %r | "%I:%M:%S %p" | 12:00:00 am |
 * | %T | "%H:%M:%S" | 13:00:00 |
 * | %v | "%e-%b-%Y" | 2-Sep-2020 |
 * | %X | "%T" | 13:00:00 |
 * | %x | "%D" | 10/30/20 |
 * | %% | "%" | % |
 * | %t | "\t" | \t |
 * | %n | "\n" | \n |
 * | %a | abbreviated weekday name | Wed |
 * | %A | full weekday name | Wednesday |
 * | %b | abbreviated month name | Sep |
 * | %B | full month name | September |
 * | %C | century: (year / 100) (padded) | 20 |
 * | %d | day of the month [01-31] | 16 |
 * | %e | day of month as decimal number [ 1, 31] |  1 |
 * | %g | year as a decimal number without century [00, 99] | 20 |
 * | %G | a 4-digit year as a decimal number with century | 2020 |
 * | %H | hour, using a 24-hour clock [00-23] | 23 |
 * | %I | hour, using a 12-hour clock [01-12] | 11 |
 * | %j | day of year [001-366] | 344 |
 * | %k | Hour in 24-hour format [ 0, 23] | 22 |
 * | %l | Hour in 12-hour format [ 1, 12] | 12 |
 * | %m | month [01, 12] | 09 |
 * | %M | minute [00, 59] | 48 |
 * | %p | either "am" or "pm" ('#' toggles case) | pm |
 * | %s | Day of year suffix | 12th, 31st, 22nd |
 * | %S | Second as decimal number [00, 59] | 56 |
 * | %u | ISO 8601 weekday as number with Monday as 1 [1, 7] | 7 |
 * | %U | Week of year, Sunday Based [00, 53] | 51 |
 * | %V | week of year (Monday as beginning of week) [01, 53] | 24 |
 * | %w | weekday (3) [0-6] (Sunday-Saturday) | 2 |
 * | %W | Week of year with Monday as first day of week [0, 53] | 25 |
 * | %y | two-digit year [00, 99] | 98 |
 * | %Y | full year | 1998 |
 * | %z | Time zone offset in the form [+-]%H%M | +0500 |
 * | --- | --- | --- |
 *
 * \* indicates the value can vary depending on the current locale.
 * @param formatString The string to format with either specifiers givenn, or the type of DateTable to return.
 * @param time The timestamp to format the formatString from. Defaults to os.time
 */
declare function date<T extends string>(
	formatString: T,
	time?: number,
): string extends T ? string | Required<DateTable> : T extends "*t" | "!*t" ? Required<DateTable> : string;

export = date;
