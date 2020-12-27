-- Compiled with roblox-ts v1.0.0-beta.11
local TS = _G[script]
-- * Defines a Rojo-esque tree type which defines an abstract object tree.
-- * Evaluates a Rojo-esque tree and transforms it into an indexable type.
local function getService(serviceName)
	-- @ts-expect-error
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
	local _0 = object
	if _0.ClassName == "DataModel" then
		for serviceName, classOrTree in pairs(tree) do
			if serviceName ~= "$className" then
				local result = { pcall(getService, serviceName) }
				if not result[1] then
					if violators then
						matches = false
						local _1 = violators
						local _2 = 'game.GetService("' .. serviceName .. '")'
						-- ▼ Array.push ▼
						_1[#_1 + 1] = _2
						-- ▲ Array.push ▲
					end
					return false
				end
				local _1 = result
				local value = _1[2]
				local _2 = value
				if _2 then
					local _3 = classOrTree
					local _4 = type(_3) == "string"
					if not _4 then
						_4 = validateTree(value, classOrTree, violators)
					end
					_2 = _4
				end
				if _2 then
					if value.Name ~= serviceName then
						value.Name = serviceName
					end
				else
					if violators then
						matches = false
						local _3 = violators
						local _4 = 'game.GetService("' .. serviceName .. '")'
						-- ▼ Array.push ▼
						_3[#_3 + 1] = _4
						-- ▲ Array.push ▲
					else
						return false
					end
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
				local _1 = classOrTree
				local _2
				if type(_1) == "string" then
					_2 = child:IsA(classOrTree)
				else
					_2 = classOrTree and validateTree(child, classOrTree, violators)
				end
				if _2 then
					local _3 = whitelistedKeys
					local _4 = childName
					-- ▼ Set.add ▼
					_3[_4] = true
					-- ▲ Set.add ▲
				end
			end
		end
		for key in pairs(tree) do
			local _1 = whitelistedKeys
			local _2 = key
			if not (_1[_2] ~= nil) then
				if violators then
					matches = false
					local _3 = violators
					local _4 = object:GetFullName() .. "." .. key
					-- ▼ Array.push ▼
					_3[#_3 + 1] = _4
					-- ▲ Array.push ▲
				else
					return false
				end
			end
		end
	end
	return matches
end
--[[
	* Yields until a given tree of objects exists within an object.
	* @param tree Must be an object tree similar to ones considered valid by Rojo.
	* Every tree must have a `$className` member, and can have any number of keys which represent
	* the name of a child instance, which should have a corresponding value which is this same kind of tree.
	* There is also a shorthand syntax available, where setting a key equal to a className is equivalent
	* to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
]]
local yieldForTree = TS.async(function(object, tree)
	if validateTree(object, tree) then
		return object
	else
		return TS.await(TS.Promise.new(function(resolve, _, onCancel)
			local connections = {}
			local warner = TS.Promise.delay(5)
			local function cleanup()
				for _, connection in ipairs(connections) do
					connection:Disconnect()
				end
				warner:cancel()
			end
			onCancel(cleanup)
			local function updateTreeForDescendant(violators)
				if validateTree(object, tree, violators) then
					cleanup()
					resolve(object)
					return true
				end
			end
			for _, descendant in ipairs(object:GetDescendants()) do
				local _0 = connections
				local _1 = descendant:GetPropertyChangedSignal("Name"):Connect(updateTreeForDescendant)
				-- ▼ Array.push ▼
				_0[#_0 + 1] = _1
				-- ▲ Array.push ▲
			end
			local _0 = connections
			local _1 = object.DescendantAdded:Connect(function(descendant)
				local _2 = connections
				local _3 = descendant:GetPropertyChangedSignal("Name"):Connect(updateTreeForDescendant)
				-- ▼ Array.push ▼
				_2[#_2 + 1] = _3
				-- ▲ Array.push ▲
				updateTreeForDescendant()
			end)
			-- ▼ Array.push ▼
			_0[#_0 + 1] = _1
			-- ▲ Array.push ▲
			local _2 = warner
			local _3 = function()
				local violators = {}
				if not updateTreeForDescendant(violators) then
					-- ▼ ReadonlyArray.join ▼
					local _4 = ", "
					if _4 == nil then
						_4 = ", "
					end
					-- ▲ ReadonlyArray.join ▲
					warn("[yieldForTree] Infinite yield possible. Waiting for: " .. table.concat(violators, _4))
				end
			end
			_2:andThen(_3)
		end))
	end
end)
return {
	validateTree = validateTree,
	yieldForTree = yieldForTree,
}
