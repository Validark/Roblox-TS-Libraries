-- Compiled with roblox-ts v1.2.3
local TS = _G[script]
local HttpService = game:GetService("HttpService")
local ipData
return TS.async(function()
	local _condition = ipData
	if _condition == nil then
		ipData = HttpService:JSONDecode(HttpService:GetAsync("http://ip-api.com/json/?fields=" .. tostring(2 ^ 26 - 1)))
		_condition = ipData
	end
	return _condition
end)
