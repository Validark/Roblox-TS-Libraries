# delay-spawn-wait
This library works as a (mostly) drop-in replacement for the built-in functions by the same names. The main differences are:

- This library neither exposes the result of an `elapsedTime()` call as a second return value of `wait()` nor as a second argument passed into the callback given to `delay`.

	```lua
	-- below, we compare vanilla behavior against this library's behavior:

	print(wait())
	-- vanilla: 0.15499839999939 13074.348632812
	-- library: 0.15499839999939

	-- if you want to get that second number, instead call elapsedTime()

	print(wait(), elapsedTime())
	-- vanilla: 0.15499839999939 13074.348632812
	-- library: 0.15499839999939 13074.348632812

	delay(0, print)
	-- vanilla: 0.15499839999939 13074.348632812
	-- library: 0.15499839999939
	```

- `spawn` runs on a new thread without yielding one tick (or passing in a deltaTime parameter)
  - If you need to yield for one tick, try `delay(0, callback)` instead.

- `spawn` and `delay` allow you to pass in extra arguments with which to call the callback.
	```lua
	spawn(print, 0, 1, 2) -- 0 1 2

	-- note: delay still passes deltaTime in as the first argument to the callback!
	delay(0, print, 0, 1, 2) -- 0.0030354000009538 0 1 2
	```
- `delay` can accept a BindableEvent to fire instead of a callback:
	```lua
	local bindable = Instance.new("BindableEvent")
	delay(5, bindable)
	bindable:Wait() -- this is what our wait() function does internally!
	```
	- Note that passing in extra arguments with a BindableEvent will pass your arguments directly into `BindableEvent:Fire()`. That means [these rules](https://developer.roblox.com/en-us/api-reference/function/BindableEvent/Fire) apply.
		```lua
		local b = Instance.new("BindableEvent")
		delay(2, b, 1, newproxy(true))
		b.Event:Connect(function(elapsedTime, num, userdata)
			-- elapsedTime: (number)
			-- num: 1
			-- userdata: nil
		end)
		```
