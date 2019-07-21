-- Compiled with https://roblox-ts.github.io v0.2.7
-- July 21, 2019, 6:30 PM Central Daylight Time

local TS = _G[script];
local _exports;
local HttpService = game:GetService("HttpService");
local ipData;
_exports = TS.async(function()
	if ipData then
		return ipData;
	else
		ipData = HttpService:JSONDecode(HttpService:GetAsync("http://ip-api.com/json/?fields=" .. (2 ^ 24 - 1)));
		return ipData;
	end;
end);
return _exports;
