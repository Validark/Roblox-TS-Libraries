-- Spawns a new thread without waiting one step
-- @author Databrain

local FastSpawnerEvent = Instance.new("BindableEvent")

FastSpawnerEvent.Event:Connect(function(callback, argsPointer)
	callback(argsPointer())
end)

local function FastSpawn(callback, ...)
	local n = select("#", ...)
	local args = { ... }
	FastSpawnerEvent:Fire(callback, function() return unpack(args, 1, n) end)
end

return FastSpawn
