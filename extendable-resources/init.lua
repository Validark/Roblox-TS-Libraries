-- Compiled with roblox-ts v1.2.3
-- @author Validark
local isServer = game:GetService("RunService"):IsServer()
--[[
	*
	* Wraps a function which takes a single argument as a parameter, and makes it idempotent.
	* The new function will return the value in the cache, else it will call the wrapped function and cache the result
	* @param func The function to wrap
]]
local function cacheSingleArgFunc(func)
	local cache = {}
	return function(arg)
		local value = cache[arg]
		if value == nil then
			value = func(arg)
			local _value = value
			-- ▼ Map.set ▼
			cache[arg] = _value
			-- ▲ Map.set ▲
		end
		return value
	end
end
local function constructManager(folder, optionalInstanceType)
	if isServer then
		return function(instanceName)
			local target = folder:FindFirstChild(instanceName)
			if target == nil then
				if optionalInstanceType then
					target = Instance.new(optionalInstanceType)
					target.Name = instanceName
					target.Parent = folder
				else
					return error("Failed to find " .. instanceName .. " in " .. folder.Name)
				end
			end
			return target
		end
	else
		return function(instanceName)
			return folder:WaitForChild(instanceName)
		end
	end
end
local getFolderGetter = cacheSingleArgFunc(function(folderParent)
	return constructManager(folderParent, "Folder")
end)
--[[
	*
	* Finds a folder called folderName in folderParent,
	* and returns a function which searches this folder for an instance with a given name.
	* If this instance does not exist on the client, the function will yield.
	* If it does not exist on the server, it will generate an instance of type optionalInstanceType or error.
	*
	* @param folderParent The parent to search for the folder in
	* @param folderName  The name of the folder to search for
	* @param optionalInstanceType The instance type which can be generated if the instance does not
	* exist and is on the server
]]
local function makeFolderManager(folderParent, folderName, optionalInstanceType)
	return constructManager(getFolderGetter(folderParent)(folderName), optionalInstanceType)
end
return makeFolderManager
