-- Compiled with roblox-ts v1.2.3
local TS = _G[script]
local promiseChildWhichIsA = TS.async(function(instance, className)
	local child = instance:FindFirstChildWhichIsA(className)
	if child then
		return child
	end
	local connection1
	local connection2
	local promise = TS.Promise.new(function(resolve, reject)
		connection1 = instance.ChildAdded:Connect(function(child)
			return child:IsA(className) and resolve(child)
		end)
		connection2 = instance.AncestryChanged:Connect(function(_, parent)
			return parent or reject(instance:GetFullName() .. " had its root parent set to nil")
		end)
	end)
	promise:finally(function()
		connection1:Disconnect()
		connection1 = nil
		connection2:Disconnect()
		connection2 = nil
	end)
	return TS.await(promise)
end)
local promiseChildOfClass = TS.async(function(instance, className)
	local child = instance:FindFirstChildOfClass(className)
	if child then
		return child
	end
	local connection1
	local connection2
	local promise = TS.Promise.new(function(resolve, reject)
		connection1 = instance.ChildAdded:Connect(function(child)
			return child.ClassName == className and resolve(child)
		end)
		connection2 = instance.AncestryChanged:Connect(function(_, parent)
			return parent or reject(instance:GetFullName() .. " had its root parent set to nil")
		end)
	end)
	promise:finally(function()
		connection1:Disconnect()
		connection1 = nil
		connection2:Disconnect()
		connection2 = nil
	end)
	return TS.await(promise)
end)
local promiseChild = TS.async(function(instance, childName)
	return instance:WaitForChild(childName)
end)
return {
	promiseChildWhichIsA = promiseChildWhichIsA,
	promiseChildOfClass = promiseChildOfClass,
	promiseChild = promiseChild,
}
