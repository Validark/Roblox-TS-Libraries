-- Compiled with roblox-ts v1.0.0-beta.10

local function Make(className, settings)
	local _0 = settings
	local children = _0.Children
	local parent = _0.Parent
	settings.Children = nil
	settings.Parent = nil
	local instance = Instance.new(className)
	for setting, value in pairs(settings) do
		local _1 = instance
		local prop = _1[setting]
		local _2 = prop
		if typeof(_2) == "RBXScriptSignal" then
			prop:Connect(value)
		else
			instance[setting] = value
		end
	end
	if children then
		for _, child in ipairs(children) do
			child.Parent = instance
		end
	end
	instance.Parent = parent
	return instance
end
return Make
