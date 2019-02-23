local Signal = {}
Signal.__index = Signal

function Signal.new(...)
	return setmetatable({
		Bindable = Instance.new("BindableEvent");
	}, Signal)
end

function Signal:Connect(Callback)
	return self.Bindable.Event:Connect(function(GetArgumentStack)
		Callback(GetArgumentStack())
	end)
end

function Signal:Fire(...)
	local Arguments = { ... }

	self.Bindable:Fire(function()
		return unpack(Arguments)
	end)
end

function Signal:Wait()
	return self.Bindable.Event:Wait()()
end

function Signal:Destroy()
	self.Bindable:Destroy()
	self.Bindable = nil
end

return Signal
