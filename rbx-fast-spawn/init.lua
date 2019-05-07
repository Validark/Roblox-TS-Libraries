-- Spawns a new thread without waiting one step
-- @author Databrain

local FastSpawnerEvent = Instance.new("BindableEvent")

FastSpawnerEvent.Event:Connect(function(callback, argsPointer)
	callback(argsPointer())
end)

local function createPointer(...)
	local args = { ... }
	return function()
		return unpack(args)
	end
end

local function FastSpawn(callback, ...)
	FastSpawnerEvent:Fire(callback, createPointer(...))
end

return FastSpawn
