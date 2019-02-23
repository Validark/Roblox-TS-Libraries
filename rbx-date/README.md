# [Date](https://github.com/Validark/Roblox-TS-Libraries/tree/master/rbx-date)

A reimplementation of the vanilla Lua os.date function built upon the one exposed by RobloxLua

Demo:

```lua
-- ISO 8601:
print(Date("%FT%T"))              -- 2020-01-01T01:03:05
print(Date("%Y-%m-%dT%H:%M:%S"))  -- 2020-01-01T01:03:05
print(Date("%FT%T%#z"))           -- 2020-01-01T01:03:05-05:00

-- Time:
print(Date("%T")) -- 08:37:43

-- Date:
print(Date("%D")) -- 01/12/20
```

`Date` functions just like the vanilla Lua `os.date` function, except padding can be toggled by inserting a '#' like so:

```lua
print(Date("%#x", os.time()))
```

Note that placing a `!` at the beginning of the string will make it consider the time input to be in the UTC time zone.

## String reference:

```
The following patterns will be replaced by their tags below:
%c = "%a %b %e %X %Y"
%D = "%m/%d/%y"
%F = "%Y-%m-%d"
%n = "\n"
%R = "%H:%M"
%r = "%I:%M:%S %p"
%T = "%H:%M:%S"
%t = "\t"
%v = "%e-%b-%Y"
%X = "%T"
%x = "%D"

%#c = "%#x, %#X"
%#r = "%#I:%M:%S %#p"
%#T = "%#H:%M:%S"
%#X = "%#T"
%#x = "%A, %B %#d, %#Y"

The following tags will be replaced as follows:
%% = the character `%´
%a = abbreviated weekday name (e.g., Wed)
%A = full weekday name (e.g., Wednesday)
%b = abbreviated month name (e.g., Sep)
%B = full month name (e.g., September)
%C = century: (year / 100) (padded)
%d = day of the month (16) [01-31]
%e = day of month as decimal number [ 1, 31]
%g = Same year as in %G, but as a decimal number without century [00, 99]
%G = a 4-digit year as a decimal number with century
%H = hour, using a 24-hour clock (23) [00-23]
%I = hour, using a 12-hour clock (11) [01-12]
%j = day of year [001-366] (March 1st is treated as day 0 of year)
%k = Hour in 24-hour format [ 0, 23]
%l = Hour in 12-hour format [ 1, 12]
%m = month (09) [01, 12]
%M = minute (48) [00, 59]
%p = either "am" or "pm" ('#' makes it uppercase)
%s = Day of year suffix: e.g. 12th, 31st, 22nd
%S = Second as decimal number [00, 59]
%u = ISO 8601 weekday as number with Monday as 1 [1, 7]
%U = Week of year, Sunday Based [00, 53]
%V = week number of year (Monday as beginning of week) [01, 53]
%w = weekday (3) [0-6 = Sunday-Saturday]
%W = Week of year with Monday as first day of week [0, 53]
%y = two-digit year (98) [00, 99]
%Y = full year (1998)
%z = Time zone offset from UTC in the form [+-]%02Hours%02Minutes, e.g. +0500
```

Example:

```lua
print(Date("It is currently %#r"))
--> It is currently 11:41:20 am
```
