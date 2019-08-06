-- Compiled with https://roblox-ts.github.io v0.3.0
-- August 5, 2019, 11:13 PM Central Daylight Time

local TS = _G[script];
local exports;
local HttpService = game:GetService("HttpService");
local ipData;
exports = TS.async(function()
	local _0 = ipData;
	if not (_0) then
		ipData = HttpService:JSONDecode(HttpService:GetAsync("http://ip-api.com/json/?fields=" .. (2 ^ 24 - 1)));
		_0 = ipData;
	end;
	return _0;
end);
return exports;
