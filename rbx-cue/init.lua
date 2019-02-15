-- The lightest Event library ever
-- Pretty straightforward
-- @author Validark

-- Micro-optimizations
local coroutine_wrap = coroutine.wrap
local coroutine_yield = coroutine.yield
local coroutine_resume = coroutine.resume
local coroutine_running = coroutine.running

local Cue = {}
Cue.__index = Cue

function Cue.new()
	return setmetatable({}, Cue)
end

function Cue:go(...)
	for i = 1, #self do
		coroutine_wrap(self[i])(...)
	end
end

function Cue:waitFor()
	local Thread = coroutine_running()

	local function Yield(...)
		self:unbind(Yield)
		coroutine_resume(Thread, ...)
	end

	self[#self + 1] = Yield
	return coroutine_yield()
end

function Cue:bind(Function)
	self[#self + 1] = Function
end

function Cue:unbind(Function)
	local n = #self

	for i = 1, n do
		if Function == self[i] then
			self[i] = self[n]
			self[n] = nil
			break
		end
	end
end

function Cue:destroy()
	for i = 1, #self do
		self[i] = nil
	end
end

return Cue
