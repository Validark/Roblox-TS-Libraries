-- Compiled with https://roblox-ts.github.io v0.2.14
-- December 17, 2019, 2:54 PM Western European Standard Time

local TS = _G[script];
local exports = {};
local validateTree;
function validateTree(object, tree, violators)
	if not (tree["$className"] ~= nil) or object:IsA(tree["$className"]) or violators then
		local whitelistedKeys = {
			["$className"] = true;
		};
		if object == game then
			for serv, newTree in pairs(tree) do
				if serv ~= "$className" then
					local service = game:GetService(serv);
					if not service then
						return false;
					end;
					local _0;
					if (typeof(newTree) == "string") then
						_0 = service:IsA(newTree);
					else
						_0 = serv and validateTree(service, newTree, violators);
					end;
					if _0 then
						whitelistedKeys[serv] = true;
					end;
				end;
			end;
		end;
		for className, childClass in pairs(tree) do
			if className ~= "$className" then
				local child = object:FindFirstChild(className);
				if not child then
					return false;
				end;
				local _0;
				if (typeof(childClass) == "string") then
					_0 = child:IsA(childClass);
				else
					_0 = className and validateTree(child, childClass, violators);
				end;
				if _0 then
					whitelistedKeys[className] = true;
				end;
			end;
		end;
		local matches = true;
		for value in pairs(tree) do
			if not (whitelistedKeys[value] ~= nil) then
				if violators then
					local fullName = object:GetFullName();
					violators[#violators + 1] = fullName .. "." .. tostring(value);
					matches = false;
				else
					return false;
				end;
			end;
		end;
		return matches;
	else
		return false;
	end;
end;
local yieldForTree = TS.async(function(object, tree)
	if validateTree(object, tree) then
		return object;
	else
		return TS.await(TS.Promise.new(function(resolve, reject)
			local resolved = false;
			local connections = {};
			local updateTreeForDescendant = function()
				if not resolved and validateTree(object, tree) then
					resolved = true;
					for _0 = 1, #connections do
						local connection = connections[_0];
						connection:Disconnect();
					end;
					resolve(object);
				end;
			end;
			local processDescendant = function(descendant)
				connections[#connections + 1] = descendant:GetPropertyChangedSignal("Name"):Connect(updateTreeForDescendant);
			end;
			local _0 = object:GetDescendants();
			for _1 = 1, #_0 do
				local descendant = _0[_1];
				processDescendant(descendant);
			end;
			connections[#connections + 1] = object.DescendantAdded:Connect(function(descendant)
				processDescendant(descendant);
				updateTreeForDescendant();
			end);
			delay(5, function()
				if not resolved then
					local violators = {};
					if validateTree(object, tree, violators) then
						resolved = true;
						for _2 = 1, #connections do
							local connection = connections[_2];
							connection:Disconnect();
						end;
						resolve(object);
					else
						warn("[yieldForTree] Infinite yield possible. Waiting for: " .. table.concat(violators, ", "));
					end;
				end;
			end);
		end));
	end;
end);
exports.validateTree = validateTree;
exports.yieldForTree = yieldForTree;
return exports;
