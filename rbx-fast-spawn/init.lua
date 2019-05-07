-- Spawns a new thread without waiting one step
-- @author Databrain

local FastSpawnerEvent = Instance.new("BindableEvent")

FastSpawnerEvent.Event:Connect(function(callback, argsPointer)
	callback(argsPointer())
end)

local function FastSpawn(callback, ...)
	local args = { ... }
	FastSpawnerEvent:Fire(callback, function()
		return unpack(args)
	end)
end

return FastSpawn
