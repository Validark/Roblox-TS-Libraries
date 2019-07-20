-- Compiled with https://roblox-ts.github.io v0.2.7
-- July 20, 2019, 4:06 PM Central Daylight Time

local TS = _G[script];
local _exports = {};
local validateTree;
function validateTree(object, tree)
	if not (tree["$className"] ~= nil) or object:IsA(tree["$className"]) then
		local whitelistedKeys = {
			["$className"] = true;
		};
		local _0 = object:GetChildren();
		for _1 = 1, #_0 do
			local child = _0[_1];
			local childName = child.Name;
			if childName ~= "$className" then
				local className = tree[childName];
				local _2;
				if (typeof(className) == "string") then
					_2 = child:IsA(className);
				else
					_2 = className and validateTree(child, className);
				end;
				if _2 then
					whitelistedKeys[childName] = true;
				end;
			end;
		end;
		for value in pairs(tree) do
			if not (whitelistedKeys[value] ~= nil) then
				return false;
			end;
		end;
		return true;
	else
		return false;
	end;
end;
local yieldForTree = TS.async(function(object, tree)
	if validateTree(object, tree) then
		return object;
	else
		return TS.await(TS.Promise.new(function(resolve, reject)
			local connections = {};
			local updateTreeForDescendant = function()
				if validateTree(object, tree) then
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
		end));
	end;
end);
_exports.validateTree = validateTree;
_exports.yieldForTree = yieldForTree;
return _exports;
