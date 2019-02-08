-- Core resource manager
-- It is designed to increase organization and streamline the retrieval and networking of resources.
-- This version doesn't load libraries
-- @documentation https://rostrap.github.io/Resources/
-- @source https://github.com/RoStrap/Resources/
-- @author Validark

local RunService = game:GetService("RunService")

local Metatable = {}
local Resources = setmetatable({}, Metatable)
local Caches = {} -- All cached data within Resources is accessible through Resources:GetLocalTable()

local Instance_new, type, require = Instance.new, type, require
local LocalResourcesLocation

local SERVER_SIDE = RunService:IsServer()
local UNINSTANTIABLE_INSTANCES = setmetatable({
	Folder = false; RemoteEvent = false; BindableEvent = false;
	RemoteFunction = false; BindableFunction = false; Library = true;
}, {
	__index = function(self, InstanceType)
		local Instantiable, GeneratedInstance = pcall(Instance_new, InstanceType)
		local Uninstantiable

		if Instantiable and GeneratedInstance then
			GeneratedInstance:Destroy()
			Uninstantiable = false
		else
			Uninstantiable = true
		end

		self[InstanceType] = Uninstantiable
		return Uninstantiable
	end;
})

function Resources:GetLocalTable(TableName) -- Returns a cached table by TableName, generating if non-existant
	TableName = self ~= Resources and self or TableName
	local Table = Caches[TableName]

	if not Table then
		Table = {}
		Caches[TableName] = Table
	end

	return Table
end

local function GetFirstChild(Folder, InstanceName, InstanceType)
	local Object = Folder:FindFirstChild(InstanceName)

	if not Object then
		if UNINSTANTIABLE_INSTANCES[InstanceType] then error("[Resources] " .. InstanceType .. " \"" .. InstanceName .. "\" is not installed within " .. Folder:GetFullName() .. ".", 2) end
		Object = Instance_new(InstanceType)
		Object.Name = InstanceName
		Object.Parent = Folder
	end

	return Object
end

function Metatable:__index(MethodName)
	if type(MethodName) ~= "string" then error("[Resources] Attempt to index Resources with invalid key: string expected, got " .. typeof(MethodName), 2) end
	if MethodName:sub(1, 3) ~= "get" then error("[Resources] Methods should begin with \"get\"", 2) end
	local InstanceType = MethodName:sub(4)

	-- Set CacheName to ["RemoteEvent" .. "s"], or ["Librar" .. "ies"]
	local a, b = InstanceType:byte(-2, -1) -- this is a simple gimmick but works well enough for all Roblox ClassNames :D
	local CacheName = b == 121 and a ~= 97 and a ~= 101 and a ~= 105 and a ~= 111 and a ~= 117 and InstanceType:sub(1, -2) .. "ies" or InstanceType .. "s"
	local IsLocal = InstanceType:sub(1, 5) == "Local"
	local Cache, Folder, FolderGetter -- Function Constants

	if IsLocal then -- Determine whether a method is local
		InstanceType = InstanceType:sub(6)

		if InstanceType == "Folder" then
			FolderGetter = function() return GetFirstChild(LocalResourcesLocation, "Resources", "Folder") end
		else
			FolderGetter = Resources.GetLocalFolder
		end
	else
		if InstanceType == "Folder" then
			FolderGetter = function() return script end
		else
			FolderGetter = Resources.GetFolder
		end
	end

	local function GetFunction(this, InstanceName)
		InstanceName = this ~= self and this or InstanceName
		if type(InstanceName) ~= "string" then error("[Resources] " .. MethodName .. " expected a string parameter, got " .. typeof(InstanceName), 2) end

		if not Folder then
			Cache = Caches[CacheName]
			Folder = FolderGetter(IsLocal and CacheName:sub(6) or CacheName)

			if not Cache then
				Cache = Folder:GetChildren() -- Cache children of Folder into Table
				Caches[CacheName] = Cache

				for i = 1, #Cache do
					local Child = Cache[i]
					Cache[Child.Name] = Child
					Cache[i] = nil
				end
			end
		end

		local Object = Cache[InstanceName]

		if not Object then
			if SERVER_SIDE or IsLocal then
				Object = GetFirstChild(Folder, InstanceName, InstanceType)
			else
				Object = Folder:WaitForChild(InstanceName, 5)

				if not Object then
					local Caller = getfenv(0).script

					warn("[Resources] Make sure a Script in ServerScriptService imports `" .. (
						Caller and Caller.Parent and Caller.Parent.Parent == script and Caller.Name or "rbx-resources"
					) .. "`")

					Object = Folder:WaitForChild(InstanceName)
				end
			end

			Cache[InstanceName] = Object
		end

		return Object
	end

	Resources[MethodName] = GetFunction
	return GetFunction
end

if not SERVER_SIDE then
	local LocalPlayer repeat LocalPlayer = game:GetService("Players").LocalPlayer until LocalPlayer or not wait()
	repeat LocalResourcesLocation = LocalPlayer:FindFirstChildOfClass("PlayerScripts") until LocalResourcesLocation or not wait()
else
	LocalResourcesLocation = game:GetService("ServerStorage")
end

return Resources
