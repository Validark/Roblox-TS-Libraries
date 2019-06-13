-- Compiled with https://roblox-ts.github.io v0.1.7
-- June 13, 2019, 2:45 PM Central Daylight Time

local Make = function(className, settings)
	local children, parent = settings.Children, settings.Parent;
	settings.Children = nil;
	settings.Parent = nil;
	local instance = Instance.new(className);
	for setting, value in pairs(settings) do
		local prop = instance[setting];
		if (typeof(prop) == "RBXScriptSignal") then
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
return nil;
