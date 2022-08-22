-- Compiled with roblox-ts v1.3.3
local TS = _G[script]
-- * Defines a Rojo-esque tree type which defines an abstract object tree.
-- * Evaluates a Rojo-esque tree and transforms it into an indexable type.
local function getService(serviceName)
	return game:GetService(serviceName)
end
--[[
	* Returns whether a given Instance matches a particular Rojo-esque InstanceTree.
	* @param object The object which needs validation
	* @param tree The tree to validate
	* @param violators
]]
local function validateTree(object, tree, violators)
	if tree["$className"] ~= nil and not object:IsA(tree["$className"]) then
		return false
	end
	local matches = true
	if object.ClassName == "DataModel" then
		for serviceName, classOrTree in pairs(tree) do
			if serviceName ~= "$className" then
				local success, value = pcall(getService, serviceName)
				if not success then
					if violators ~= nil then
						local _arg0 = 'game.GetService("' .. (serviceName .. '")')
						table.insert(violators, _arg0)
					end
					return false
				end
				if value and (type(classOrTree) == "string" or validateTree(value, classOrTree, violators)) then
					if value.Name ~= serviceName then
						value.Name = serviceName
					end
				else
					if violators == nil then
						return false
					end
					matches = false
					local _arg0 = 'game.GetService("' .. (serviceName .. '")')
					table.insert(violators, _arg0)
				end
			end
		end
	else
		local whitelistedKeys = {
			["$className"] = true,
		}
		for _, child in ipairs(object:GetChildren()) do
			local childName = child.Name
			if childName ~= "$className" then
				local classOrTree = tree[childName]
				if if type(classOrTree) == "string" then child:IsA(classOrTree) else classOrTree and validateTree(child, classOrTree, violators) then
					whitelistedKeys[childName] = true
				end
			end
		end
		for key in pairs(tree) do
			if not (whitelistedKeys[key] ~= nil) then
				if violators == nil then
					return false
				end
				matches = false
				local _arg0 = object:GetFullName() .. "." .. key
				table.insert(violators, _arg0)
			end
		end
	end
	return matches
end
--[[
	* Promises a given tree of objects exists within an object.
	* @param tree Must be an object tree similar to ones considered valid by Rojo.
	* Every tree must have a `$className` member, and can have any number of keys which represent
	* the name of a child instance, which should have a corresponding value which is this same kind of tree.
	* There is also a shorthand syntax available, where setting a key equal to a className is equivalent
	* to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
]]
local function promiseTree(object, tree)
	if validateTree(object, tree) then
		return TS.Promise.resolve(object)
	end
	local connections = {}
	local warner = TS.Promise.delay(5)
	local _arg0 = function()
		local violators = {}
		if not validateTree(object, tree, violators) then
			warn("[promiseTree] Infinite wait possible. Waiting for: " .. table.concat(violators, ", "))
		end
	end
	warner:andThen(_arg0)
	local promise = TS.Promise.new(function(resolve)
		local function updateTree(violators)
			if validateTree(object, tree, violators) then
				resolve(object)
			end
		end
		for _, d in ipairs(object:GetDescendants()) do
			local _arg0_1 = d:GetPropertyChangedSignal("Name"):Connect(updateTree)
			table.insert(connections, _arg0_1)
		end
		local _arg0_1 = object.DescendantAdded:Connect(function(descendant)
			local _arg0_2 = descendant:GetPropertyChangedSignal("Name"):Connect(updateTree)
			table.insert(connections, _arg0_2)
			updateTree()
		end)
		table.insert(connections, _arg0_1)
	end)
	promise:finally(function()
		for _, connection in ipairs(connections) do
			connection:Disconnect()
		end
		warner:cancel()
	end)
	return promise
end
return {
	validateTree = validateTree,
	promiseTree = promiseTree,
}
