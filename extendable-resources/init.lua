-- Compiled with https://roblox-ts.github.io v0.1.2
-- June 1, 2019, 9:28 PM Central Daylight Time

local _exports;
local isServer = game:GetService("RunService"):IsServer();
local cacheSingleArgFunc = function(func)
	local cache = {};
	return function(arg)
		local value = cache[arg];
		if value == nil then
			value = func(arg);
			cache[arg] = value;
		end;
		return value;
	end;
end;
local constructManager = function(folder, optionalInstanceType)
	if isServer then
		return function(instanceName)
			local target = folder:FindFirstChild(instanceName);
			if target == nil then
				if optionalInstanceType then
					target = Instance.new(optionalInstanceType);
					target.Name = instanceName;
					target.Parent = folder;
				else
					return error("Failed to find " .. instanceName .. " in " .. folder.Name);
				end;
			end;
			return target;
		end;
	else
		return function(instanceName)
			return folder:WaitForChild(instanceName);
		end;
	end;
end;
local getFolderGetter = cacheSingleArgFunc(function(folderParent)
	return constructManager(folderParent, "Folder");
end);
local makeFolderManager = function(folderParent, folderName, optionalInstanceType)
	return constructManager(getFolderGetter(folderParent)(folderName), optionalInstanceType);
end;
_exports = makeFolderManager;
return _exports;
