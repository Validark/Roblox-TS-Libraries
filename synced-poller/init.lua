-- Compiled with roblox-ts v1.2.3
--[[
	* The difference in seconds between os.time() and os.clock().
	* With this, we can use `os.clock() + timeDifferential` as a more precise os.time()
]]
local timeDifferential
do
	local targetTime = os.time() + 1
	while os.time() ~= targetTime do
	end
	timeDifferential = targetTime - os.clock()
end
--[[
	* A polling class that continually calls a callback in sync with os.time.
	* If a condition is provided, it will call the callback on each poll, and cancel if it returns false
]]
local SyncedPoller
do
	SyncedPoller = setmetatable({}, {
		__tostring = function()
			return "SyncedPoller"
		end,
	})
	SyncedPoller.__index = SyncedPoller
	function SyncedPoller.new(...)
		local self = setmetatable({}, SyncedPoller)
		return self:constructor(...) or self
	end
	function SyncedPoller:constructor(interval, callback, condition)
		self.isRunning = true
		local recall
		recall = function()
			if self.isRunning then
				if condition == nil or condition() then
					callback()
					task.delay(interval - ((os.clock() + timeDifferential) % interval), recall)
				else
					self.isRunning = false
				end
			end
		end
		task.delay(interval - ((os.clock() + timeDifferential) % interval), recall)
	end
	function SyncedPoller:cancel()
		self.isRunning = false
	end
end
return SyncedPoller
