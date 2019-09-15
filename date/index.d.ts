/**
 * Formats a string with tags relating to the time and date. Functions just like the vanilla Lua os.date function, except padding can be toggled by inserting a '#' in the middle of the tag. For example, `%#H` would be replaced by the hour without padding.
 *
 * @param formatString template string to format. Defaults to "%c". If you place a "!" at the beginning of the string, it will be removed from the return string and will make the function treat the time parameter as being in the UTC time zone.
 * The following patterns will be replaced by their tags below:
 *
 * ```json
 * 	%c : "%a %b %e %X %Y"
 * 	%D : "%m/%d/%y"
 * 	%F : "%Y-%m-%d"
 * 	%R : "%H:%M"
 * 	%r : "%I:%M:%S %p"
 * 	%T : "%H:%M:%S"
 * 	%v : "%e-%b-%Y"
 * 	%X : "%T"
 * 	%x : "%D"
 * 	%% : "%"
 * 	%t : "\t"
 * 	%n : "\n"
 * 	%a : abbreviated weekday name (e.g., Wed)
 * 	%A : full weekday name (e.g., Wednesday)
 * 	%b : abbreviated month name (e.g., Sep)
 * 	%B : full month name (e.g., September)
 * 	%C : century: (year / 100) (padded)
 * 	%d : day of the month (16) [01-31]
 * 	%e : day of month as decimal number [ 1, 31]
 * 	%g : year as a decimal number without century [00, 99]
 * 	%G : a 4-digit year as a decimal number with century
 * 	%H : hour, using a 24-hour clock (23) [00-23]
 * 	%I : hour, using a 12-hour clock (11) [01-12]
 * 	%j : day of year [001-366]
 * 	%k : Hour in 24-hour format [ 0, 23]
 * 	%l : Hour in 12-hour format [ 1, 12]
 * 	%m : month (09) [01, 12]
 * 	%M : minute (48) [00, 59]
 * 	%p : either "am" or "pm" ('#' toggles case)
 * 	%s : Day of year suffix: e.g. 12th, 31st, 22nd
 * 	%S : Second as decimal number [00, 59]
 * 	%u : ISO 8601 weekday as number with Monday as 1 [1, 7]
 * 	%U : Week of year, Sunday Based [00, 53]
 * 	%V : week of year (Monday as beginning of week) [01, 53]
 * 	%w : weekday (3) [0-6] (Sunday-Saturday)
 * 	%W : Week of year with Monday as first day of week [0, 53]
 * 	%y : two-digit year (98) [00, 99]
 * 	%Y : full year (1998)
 * 	%z : Time zone offset in the form [+-]%H%M, e.g. +0500
 * ```
 * @param time Seconds past Jan 1, 1970. Defaults to now.
 */
declare function date(formatString?: string, time?: number): string;

/**
 * Returns a table with information about the time and date
 * @param formatString "*t" | "!*t" If you place a "!" at the beginning of the string, it will be removed from the return string and will make the function treat the time parameter as being in the UTC time zone.
 * @param time Seconds past Jan 1, 1970. Defaults to now.
 * @returns An object with with data about the current time:
 *
 * ```json
 * 	sec (0 to 59)
 * 	min (0 to 59)
 * 	hour (0 to 23)
 * 	day (1 to 31)
 * 	month (1 to 12)
 * 	year (1900 onwards)
 * 	wday (Sunday is 1, Monday is 2 etc.)
 * 	yday (January 1st is 1, etc.)
 * 	isdst (true if Daylight Savings Time)
 * ```
 */
declare function date(
	formatString: "*t" | "!*t",
	time?: number,
): {
	year: number;
	month: number;
	day: number;
	hour: number;
	min: number;
	sec: number;
	isdst: boolean;
	yday: number;
	wday: number;
};

export = date;
