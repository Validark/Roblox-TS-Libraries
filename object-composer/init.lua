local function compose(...)
	local constructors = { ... };
	return function(state)
		if state == nil then state = {}; end;
		local x = {};
		for _0 = 1, #constructors do
			for prop, value in pairs(constructors[_0](state)) do
				local previous = x[prop];
				if previous ~= nil then
					local t = typeof(previous)
					if t ~= typeof(value) or t == "table" or t == "userdata" then
						error("Property collision at " .. tostring(prop) .. "!");
					end
				else
					x[prop] = value;
				end;
			end;
		end;
		return x;
	end;
end;

return {
	default = compose;
	compose = compose;
};
