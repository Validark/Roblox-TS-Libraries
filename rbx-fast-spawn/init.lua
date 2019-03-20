-- Spawns a new thread without waiting one step
-- Fastest implementation I know of
-- @author Validark

local function FunctionWrapper(callback, ...)
    coroutine.yield()
    callback(...)
end

local Bindable = Instance.new("BindableEvent")
Bindable.Event:Connect(function(callback) callback() end)

local function FastSpawn(callback, ...)
    local func = coroutine.wrap(FunctionWrapper)
	func(callback, ...)
    Bindable:Fire(func)
end

return FastSpawn
