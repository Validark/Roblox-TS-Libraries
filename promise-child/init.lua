-- Compiled with roblox-ts v1.2.3
local TS = _G[script]
local function promiseChildWhichIsA(parent, className)
	local child = parent:FindFirstChildWhichIsA(className)
	if child then
		return TS.Promise.resolve(child)
	end
	local warner = TS.Promise.delay(5)
	local _arg0 = function()
		return warn('[promiseChildWhichIsA] Infinite wait possible for a "' .. className .. '" to appear under ' .. parent:GetFullName())
	end
	warner:andThen(_arg0)
	local connection1
	local connection2
	local promise = TS.Promise.new(function(resolve, reject)
		connection1 = parent.ChildAdded:Connect(function(child)
			return child:IsA(className) and resolve(child)
		end)
		connection2 = parent.AncestryChanged:Connect(function(_, newParent)
			return newParent or reject(parent:GetFullName() .. " had its root parent set to nil")
		end)
	end)
	promise:finally(function()
		warner:cancel()
		connection1:Disconnect()
		connection2:Disconnect()
	end)
	return promise
end
local function promiseChildOfClass(parent, className)
	local child = parent:FindFirstChildOfClass(className)
	if child then
		return TS.Promise.resolve(child)
	end
	local warner = TS.Promise.delay(5)
	local _arg0 = function()
		return warn('[promiseChildOfClass] Infinite wait possible for a "' .. className .. '" to appear under ' .. parent:GetFullName())
	end
	warner:andThen(_arg0)
	local connection1
	local connection2
	local promise = TS.Promise.new(function(resolve, reject)
		connection1 = parent.ChildAdded:Connect(function(child)
			return child.ClassName == className and resolve(child)
		end)
		connection2 = parent.AncestryChanged:Connect(function(_, newParent)
			return newParent or reject(parent:GetFullName() .. " had its root parent set to nil")
		end)
	end)
	promise:finally(function()
		warner:cancel()
		connection1:Disconnect()
		connection2:Disconnect()
	end)
	return promise
end
local function promiseChild(parent, childName)
	local child = parent:FindFirstChild(childName)
	if child then
		return TS.Promise.resolve(child)
	end
	local connections = {}
	local warner = TS.Promise.delay(5)
	local _arg0 = function()
		return warn('[promiseChild] Infinite wait possible for "' .. tostring(childName) .. '" to appear under ' .. parent:GetFullName())
	end
	warner:andThen(_arg0)
	local promise = TS.Promise.new(function(resolve, reject)
		local _arg0_1 = parent.ChildAdded:Connect(function(child)
			if child.Name == childName then
				resolve(child)
			else
				local _arg0_2 = child:GetPropertyChangedSignal("Name"):Connect(function()
					return child.Name == childName and child.Parent == parent and resolve(child)
				end)
				-- ▼ Array.push ▼
				connections[#connections + 1] = _arg0_2
				-- ▲ Array.push ▲
			end
		end)
		-- ▼ Array.push ▼
		connections[#connections + 1] = _arg0_1
		-- ▲ Array.push ▲
		local _arg0_2 = parent.AncestryChanged:Connect(function(_, newParent)
			return newParent or reject(parent:GetFullName() .. " had its root parent set to nil")
		end)
		-- ▼ Array.push ▼
		connections[#connections + 1] = _arg0_2
		-- ▲ Array.push ▲
	end)
	promise:finally(function()
		warner:cancel()
		for _, connection in ipairs(connections) do
			connection:Disconnect()
		end
	end)
	return promise
end
return {
	promiseChildWhichIsA = promiseChildWhichIsA,
	promiseChildOfClass = promiseChildOfClass,
	promiseChild = promiseChild,
}
