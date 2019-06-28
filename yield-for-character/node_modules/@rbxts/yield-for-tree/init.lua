-- Compiled with https://roblox-ts.github.io v0.2.3
-- June 28, 2019, 4:59 AM Central Daylight Time

local TS = _G[script];
local _exports = {};
local yieldForTreeHelper;
function yieldForTreeHelper(o, myTree)
	local _0 = o:GetChildren();
	for _1 = 1, #_0 do
		local child = _0[_1];
		local childName = child.Name;
		local className = myTree[childName];
		if (typeof(className) == "string") then
			if child:IsA(className) then
				myTree[childName] = nil;
			end;
		elseif className then
			local rawClassName = className["$className"];
			if child:IsA(rawClassName) then
				className["$className"] = nil;
				yieldForTreeHelper(child, className);
				if (next(className) == nil) then
					myTree[childName] = nil;
				else
					className["$className"] = rawClassName;
				end;
			end;
		end;
	end;
	if (next(myTree) == nil) then
		return nil;
	else
		return myTree;
	end;
end;
local yieldForTree = TS.async(function(object, tree)
	local subTree = yieldForTreeHelper(object, tree);
	while subTree and next(subTree, next(subTree)) ~= nil do
		subTree = tree;
		local descendant = object.DescendantAdded:Wait();
		local parents = { descendant };
		local current = descendant.Parent;
		while current and current ~= object do
			parents[#parents + 1] = current;
			current = current.Parent;
		end;
		local subTrees = { subTree };
		for i = #parents - 1, 0, -1 do
			local child = parents[i + 1];
			local currentTree = subTree[child.Name];
			if i == 0 then
				if (typeof(currentTree) == "string") then
					if child:IsA(currentTree) then
						subTree[child.Name] = nil;
						child = child.Parent;
						local _1 = #subTrees;
						subTree = subTrees[_1];
						subTrees[_1] = nil; -- subTrees.pop
					else
						break;
					end;
				elseif currentTree == nil or not child:IsA(currentTree["$className"]) then
					break;
				end;
				local target = subTree and subTree[child.Name];
				while target and next(target, next(target)) == nil do
					subTree[child.Name] = nil;
					child = child.Parent;
					local _1 = #subTrees;
					subTree = subTrees[_1];
					subTrees[_1] = nil; -- subTrees.pop
					target = subTree and subTree[child.Name];
				end;
			else
				if currentTree ~= nil and not (typeof(currentTree) == "string") and child:IsA(currentTree["$className"]) then
					subTrees[#subTrees + 1] = subTree;
					subTree = currentTree;
				else
					break;
				end;
			end;
		end;
	end;
	return object;
end);
_exports._default = yieldForTree;
_exports.yieldForTree = yieldForTree;
return _exports;
