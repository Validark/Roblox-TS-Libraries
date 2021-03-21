local cache
return _G[script].async(function()
	if cache == nil then
		local h = game:GetService("HttpService")
		cache = h:JSONDecode(h:GetAsync("http://ip-api.com/json/?fields=" .. 2^26 - 1))
	end
	return cache
end)
