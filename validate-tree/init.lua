-- Compiled with https://roblox-ts.github.io v0.2.7
-- July 19, 2019, 3:47 PM Central Daylight Time

local TS = _G[script];
local _exports = {};
local validateTreeRaw;
local function validateChildRaw(child, tree)
	local childName = child.Name;
	if childName ~= "$className" then
		local className = tree[childName];
		local _0;
		if (typeof(className) == "string") then
			_0 = child:IsA(className);
		else
			_0 = className and validateTreeRaw(child, className);
		end;
		if _0 then
			tree[childName] = nil;
		end;
	end;
end;
function validateTreeRaw(object, tree, getChild)
	if object:IsA(tree["$className"]) then
		local _0;
		if getChild then
			_0 = { getChild() };
		else
			_0 = object:GetChildren();
		end;
		for _1 = 1, #_0 do
			local child = _0[_1];
			local childName = child.Name;
			if childName ~= "$className" then
				local className = tree[childName];
				local _2;
				if (typeof(className) == "string") then
					_2 = child:IsA(className);
				else
					_2 = className and validateTreeRaw(child, className, getChild);
				end;
				if _2 then
					tree[childName] = nil;
				end;
			end;
		end;
		for key in pairs(tree) do
			if key ~= "$className" then
				return false;
			end;
		end;
		return true;
	else
		return false;
	end;
end;
local function validateTree(object, tree)
	return validateTreeRaw(object, TS.Object_deepCopy(tree));
end;
local yieldForTree = TS.async(function(object, tree)
	tree = TS.Object_deepCopy(tree);
	if validateTreeRaw(object, tree) then
		return object;
	else
		return TS.await(TS.Promise.new(function(resolve, reject)
			local connections = {};
			local updateTreeForDescendant = function(descendant)
				local parents = {};
				local current = descendant;
				repeat
					do
						parents[#parents + 1] = current;
						current = current.Parent;
					end;
				until not (current and current ~= object);
				local i = #parents;
				local getChild = function()
					i = i - 1;
					return parents[i + 1];
				end;
				if validateTreeRaw(object, tree, getChild) then
					for _0 = 1, #connections do
						local connection = connections[_0];
						connection:Disconnect();
					end;
					resolve(object);
				end;
			end;
			local processDescendant = function(descendant)
				connections[#connections + 1] = descendant:GetPropertyChangedSignal("Name"):Connect(function()
					return updateTreeForDescendant(descendant);
				end);
			end;
			local _0 = object:GetDescendants();
			for _1 = 1, #_0 do
				local descendant = _0[_1];
				processDescendant(descendant);
			end;
			connections[#connections + 1] = object.DescendantAdded:Connect(function(descendant)
				processDescendant(descendant);
				updateTreeForDescendant(descendant);
			end);
		end));
	end;
end);
_exports.validateTree = validateTree;
_exports.yieldForTree = yieldForTree;
return _exports;
