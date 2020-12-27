-- Compiled with roblox-ts v1.0.0-beta.11
local TS = _G[script]
local HttpService = game:GetService("HttpService")
local ipData
return TS.async(function()
	local _0 = ipData
	if not _0 then
		ipData = HttpService:JSONDecode(HttpService:GetAsync("http://ip-api.com/json/?fields=" .. tostring((2 ^ 25 - 1))))
		_0 = ipData
	end
	return _0
end)
