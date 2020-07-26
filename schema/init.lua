-- Compiled with https://roblox-ts.github.io v0.3.2
-- July 20, 2020
-- Modified slightly

local exports = {};
local instantiateChild, reconcileChildren;
function instantiateChild(parent, name, schema, instanceChildren)
	if type(schema) == "string" then
		local newInstance = Instance.new(schema);
		newInstance.Name = name;
		newInstance.Parent = parent;
		return newInstance;
	else
		local className = schema["$className"];
		local instantiate = schema["$instantiate"];
		local children = schema["$children"];
		local newInstance = instantiateChild(parent, name, className, nil);
		if instanceChildren then
			for _0 = 1, #instanceChildren do
				local child = instanceChildren[_0];
				child.Parent = newInstance;
			end;
		end;
		if instantiate then
			instantiate(newInstance);
			instanceChildren = newInstance:GetChildren();
		end;
		reconcileChildren(newInstance, children, instanceChildren);
		return newInstance;
	end;
end;
local function checkChildInMap(schema, instance, childrenToBeReparented)
	if type(schema) == "string" then
		if instance.ClassName == schema then
			reconcileChildren(instance, nil, childrenToBeReparented);
			return true;
		end;
	else
		local className = schema["$className"];
		local check = schema["$check"];
		local children = schema["$children"];
		if (className == instance.ClassName) and ((check == nil) or (check(instance))) then
			if children and childrenToBeReparented then
				for _0 = 1, #childrenToBeReparented do
					local grandchild = childrenToBeReparented[_0];
					grandchild.Parent = instance;
				end;
			end;
			local _1 = instance;
			local _0 = childrenToBeReparented;
			reconcileChildren(_1, children, _0 or instance:GetChildren());
			return true;
		end;
	end;
	return false;
end;
local function aggregateChildren(instances)
	local children = {};
	for _0 = 1, #instances do
		local instance = instances[_0];
		local _1 = instance:GetChildren();
		for _2 = 1, #_1 do
			local grandchild = _1[_2];
			children[#children + 1] = grandchild;
		end;
	end;
	return children;
end;
function reconcileChildren(parent, children, instanceChildren)
	if children then
		if instanceChildren then
			local childMap = {};
			for _0 = 1, #instanceChildren do
				local child = instanceChildren[_0];
				local Name = child.Name;
				local previous = childMap[Name];
				if previous then
					if typeof(previous) == "Instance" then
						childMap[Name] = { previous, child };
					else
						previous[#previous + 1] = child;
					end;
				else
					childMap[Name] = child;
				end;
			end;
			for name, schema in pairs(children) do
				local child;
				if type(name) == "number" then
					local strName = tostring(name);
					child = childMap[strName];
					if child then
						childMap[name] = child;
						childMap[strName] = nil;
					end;
				else
					child = childMap[name];
				end;
				if child == nil then
					instantiateChild(parent, name, schema, nil);
				else
					if typeof(child) == "Instance" then
						if checkChildInMap(schema, child, nil) then
							childMap[name] = nil;
						end;
					else
						local allChildren = aggregateChildren(child);
						local validated = false;
						for _3 = 1, #child do
							local individual = child[_3];
							if (not (validated)) and (checkChildInMap(schema, individual, allChildren)) then
								childMap[name] = nil;
								validated = true;
							else
								local _4 = individual:GetChildren();
								for _5 = 1, #_4 do
									local holy = _4[_5];
									holy.Parent = nil;
								end;
								individual:Destroy();
							end;
						end;
						if not (validated) then
							for _4 = 1, #allChildren do
								local evil = allChildren[_4];
								evil:Destroy();
							end;
						end;
					end;
				end;
			end;
			for name, child in pairs(childMap) do
				local schema = children[name];
				if schema ~= nil then
					local _3 = not (type(schema) == "string");
					if _3 then
						if typeof(child) == "Instance" then
							_3 = child:GetChildren();
						else
							_3 = aggregateChildren(child);
						end;
					end;
					instantiateChild(parent, name, schema, _3);
				end;
				if typeof(child) == "Instance" then
					child:Destroy();
				else
					for _3 = 1, #child do
						local evil = child[_3];
						evil:Destroy();
					end;
				end;
			end;
		else
			for name, childSchema in pairs(children) do
				instantiateChild(parent, name, childSchema, nil);
			end;
		end;
	else
		if instanceChildren then
			for _0 = 1, #instanceChildren do
				local child = instanceChildren[_0];
				child:Destroy();
			end;
		end;
		if parent then
			parent:ClearAllChildren();
		end;
	end;
end;
local function reconcileSchema(schema, instance)
	local className = schema["$className"];
	local check = schema["$check"];
	local children = schema["$children"];
	if instance then
		if (className == instance.ClassName) and ((check == nil) or (check(instance))) then
			reconcileChildren(instance, children, instance:GetChildren());
			return instance;
		else
			local newInstance = instantiateChild(instance.Parent, instance.Name, schema, instance:GetChildren());
			instance:Destroy();
			return newInstance;
		end;
	else
		return instantiateChild(nil, className, schema, nil);
	end;
end;
exports.reconcileSchema = reconcileSchema;
return exports;
