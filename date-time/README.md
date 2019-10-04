# date-time

A new wrapper object for dealing with dates and times.

### Goals
- Accurate, feature complete date formatting across a variety of locales
- Easy to use interface which abstracts all the mathemagic
- Efficient, where possible
- Objects should be immutable, and shouldn't be very large.
- It should be clear to the library and user what a developer means by a declaration, and that should be translated over to a locale.
    - A developer declaration should not accidentally get declared in a locale, leading to mismatched events
- Support a few different formatting options.

Example:

```ts
// This should create an event for the entire October of 2019.
// EventStart should be the first second of October 2019, 00:00:00 in UTC time
const eventStart = DateTime.fromObject({ month: 10, year: 2019 });
// Event end should be the last second of October 2019, 23:59:59 in UTC time
const eventEnd = eventStart.endOf("month");

// Should print the default format of this locale, and the date should be adjusted to the locale's calendar.
// This means that an October event isn't necessarily displaying October for a given locale.
// (I believe) A kurdish calendar would mean that this event starts towards the end of November and ends before the end of October
print(eventStart);
```


