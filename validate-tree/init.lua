-- Compiled with https://roblox-ts.github.io v0.2.15-commit-b8d4825.0
-- January 16, 2020, 4:37 PM Central Standard Time

local TS = _G[script];
local exports = {};
local validateTree;
local function getService(serviceName)
	return game:GetService(serviceName);
end;
function validateTree(object, tree, violators)
	if (tree["$className"] ~= nil) and (not (object:IsA(tree["$className"]))) then
		return false;
	end;
	local matches = true;
	if object.ClassName == "DataModel" then
		for serviceName, classOrTree in pairs(tree) do
			if serviceName ~= "$className" then
				local success, service = pcall(getService, serviceName);
				if not (success) then
					if violators then
						matches = false;
						violators[#violators + 1] = "game.GetService(\"" .. serviceName .. "\")";
					end;
					return false;
				end;
				local child = service;
				if child and ((type(classOrTree) == "string") or (validateTree(child, classOrTree, violators))) then
					if child.Name ~= serviceName then
						child.Name = serviceName;
					end;
				else
					if violators then
						matches = false;
						violators[#violators + 1] = "game.GetService(\"" .. serviceName .. "\")";
					else
						return false;
					end;
				end;
			end;
		end;
	else
		local whitelistedKeys = {
			["$className"] = true;
		};
		local _0 = object:GetChildren();
		for _1 = 1, #_0 do
			local child = _0[_1];
			local childName = child.Name;
			if childName ~= "$className" then
				local classOrTree = tree[childName];
				local _2;
				if type(classOrTree) == "string" then
					_2 = child:IsA(classOrTree);
				else
					_2 = classOrTree and (validateTree(child, classOrTree, violators));
				end;
				if _2 then
					whitelistedKeys[childName] = true;
				end;
			end;
		end;
		for key in pairs(tree) do
			if not (whitelistedKeys[key] ~= nil) then
				if violators then
					matches = false;
					violators[#violators + 1] = object:GetFullName() .. "." .. tostring(key);
				else
					return false;
				end;
			end;
		end;
	end;
	return matches;
end;
local yieldForTree = TS.async(function(object, tree)
	if validateTree(object, tree) then
		return object;
	else
		local prom;
		prom = TS.Promise.new(function(resolve, reject)
			local connections = {};
			local updateTreeForDescendant = function(violators)
				if (prom.isPending) and (validateTree(object, tree, violators)) then
					for _0 = 1, #connections do
						local connection = connections[_0];
						connection:Disconnect();
					end;
					resolve(object);
				elseif violators then
					warn("[yieldForTree] Infinite yield possible. Waiting for: " .. table.concat(violators, ", "));
				end;
			end;
			local _0 = object:GetDescendants();
			for _1 = 1, #_0 do
				local descendant = _0[_1];
				connections[#connections + 1] = descendant:GetPropertyChangedSignal("Name"):Connect(updateTreeForDescendant);
			end;
			connections[#connections + 1] = object.DescendantAdded:Connect(function(descendant)
				connections[#connections + 1] = descendant:GetPropertyChangedSignal("Name"):Connect(updateTreeForDescendant);
				updateTreeForDescendant();
			end);
			delay(5, function()
				local _2 = prom.isPending;
				if _2 then
					_2 = updateTreeForDescendant({});
				end;
				return _2;
			end);
		end);
		return TS.await(prom);
	end;
end);
exports.validateTree = validateTree;
exports.yieldForTree = yieldForTree;
return exports;
