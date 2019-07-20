# Synced poller

Calls functions on an interval along os.time (for cross-server simultaneous calls)

Calls a function every `interval` seconds, whenever `(os.time() % interval == 0)`. Functions are called along `os.time()` (with `tick()` precision).

If a condition is provided, it will call the callback on each poll, and cancel if it returns false.
