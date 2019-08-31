-- Compiled with https://roblox-ts.github.io v0.2.14
-- August 31, 2019, 5:11 PM Central Daylight Time

local exports = {};
local compose;
function compose(...)
	local constructors = { ... };
	return function(state)
		if state == nil then state = {}; end;
		local x = {};
		for _0 = 1, #constructors do
			local constructor = constructors[_0];
			for prop, value in pairs(constructor(state)) do
				if x[prop] ~= nil then
					error("Property collision at " .. tostring(prop) .. "!");
				else
					x[prop] = value;
				end;
			end;
		end;
		return x;
	end;
end;
exports.default = compose;
exports.compose = compose;
return exports;
