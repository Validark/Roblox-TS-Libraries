-- Compiled with https://roblox-ts.github.io v0.3.2
-- July 11, 2020, 9:57 PM New Zealand Standard Time

local exports;
local function Make(className, settings)
	local children = settings.Children;
	local parent = settings.Parent;
	settings.Children = nil;
	settings.Parent = nil;
	local instance = Instance.new(className);
	for setting, value in pairs(settings) do
		local prop = instance[setting];
		if typeof(prop) == "RBXScriptSignal" then
			prop:Connect(value);
		else
			instance[setting] = value;
		end;
	end;
	if children then
		for _0 = 1, #children do
			local child = children[_0];
			child.Parent = instance;
		end;
	end;
	instance.Parent = parent;
	return instance;
end;
exports = Make;
return exports;
