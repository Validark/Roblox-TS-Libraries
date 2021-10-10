-- Compiled with roblox-ts v1.2.3
--[[
	*
	* Returns a table wherein an object's writable properties can be specified,
	* while also allowing functions to be passed in which can be bound to a RBXScriptSignal.
]]
--[[
	*
	* Instantiates a new Instance of `className` with given `settings`,
	* where `settings` is an object of the form { [K: propertyName]: value }.
	*
	* `settings.Children` is an array of child objects to be parented to the generated Instance.
	*
	* Events can be set to a callback function, which will be connected.
	*
	* `settings.Parent` is always set last.
]]
local function Make(className, settings)
	local _binding = settings
	local children = _binding.Children
	local parent = _binding.Parent
	local instance = Instance.new(className)
	for setting, value in pairs(settings) do
		if setting ~= "Children" and setting ~= "Parent" then
			local _binding_1 = instance
			local prop = _binding_1[setting]
			if typeof(prop) == "RBXScriptSignal" then
				prop:Connect(value)
			else
				instance[setting] = value
			end
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
