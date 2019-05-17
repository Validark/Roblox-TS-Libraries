-- The lightest Event library ever
-- Pretty straightforward
-- @author Validark

local Cue = {}
Cue.__index = Cue

function Cue.new()
	return setmetatable({}, Cue)
end

function Cue:go(...)
	for i = 1, #self do
		coroutine.resume(coroutine.create(self[i]), ...)
	end
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

function Cue:unbindAll()
	for i = 1, #self do
		self[i] = nil
	end
end

return Cue
