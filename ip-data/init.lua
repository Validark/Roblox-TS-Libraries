-- Compiled with https://roblox-ts.github.io v0.2.7
-- July 21, 2019, 5:41 PM Central Daylight Time

local TS = _G[script];
local _exports;
local getIPData;
local HttpService = game:GetService("HttpService");
local fieldBits = {
	country = 1;
	countryCode = 2;
	region = 4;
	regionName = 8;
	city = 16;
	zip = 32;
	lat = 64;
	lon = 128;
	timezone = 256;
	isp = 512;
	org = 1024;
	as = 2048;
	reverse = 4096;
	query = 8192;
	status = 16384;
	message = 32768;
	mobile = 65536;
	proxy = 131072;
	accuracy = 262144;
	district = 524288;
};
local FORCED_FIELDS_SUM = fieldBits.status + fieldBits.message;
local function ipAPIAsync(binaryInteger)
	if binaryInteger == FORCED_FIELDS_SUM then
		return HttpService:GetAsync("http://ip-api.com/json/");
	else
		return HttpService:GetAsync("http://ip-api.com/json/?fields=" .. tostring(binaryInteger));
	end;
end;
local previouslyRun = false;
getIPData = TS.async(function(...)
	local fields = { ... };
	if previouslyRun then
		return {
			status = "fail";
			message = "already requested http://ip-api.com for this server instance";
		};
	else
		previouslyRun = true;
		local binaryInteger = FORCED_FIELDS_SUM;
		for _0 = 1, #fields do
			local field = fields[_0];
			binaryInteger = binaryInteger + (fieldBits[field]);
		end;
		local success, data = pcall(ipAPIAsync, binaryInteger);
		if success then
			return HttpService:JSONDecode(data);
		else
			return {
				status = "fail";
				message = data;
			};
		end;
	end;
end);
_exports = getIPData;
return _exports;
