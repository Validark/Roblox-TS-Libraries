-- Compiled with https://roblox-ts.github.io v0.3.2
-- July 16, 2020, 5:01 AM Central Daylight Time

local TS = _G[script];
local exports;
local delayed = TS.import(script, TS.getModule(script, "delay-spawn-wait")).delay;
local timeDifferential;
do
	local targetTime = os.time() + 1;
	while os.time() ~= targetTime do
	end;
	timeDifferential = targetTime - os.clock();
end;
local SyncedPoller;
do
	SyncedPoller = setmetatable({}, {
		__tostring = function() return "SyncedPoller" end;
	});
	SyncedPoller.__index = SyncedPoller;
	function SyncedPoller.new(...)
		local self = setmetatable({}, SyncedPoller);
		self:constructor(...);
		return self;
	end;
	function SyncedPoller:constructor(interval, callback, condition)
		local recall;
		self.isRunning = true;
		recall = function(timeElapsed)
			if self.isRunning then
				if (condition == nil) or (condition()) then
					callback(timeElapsed);
					delayed(interval - ((os.clock() + timeDifferential) % interval), recall);
				else
					self.isRunning = false;
				end;
			end;
		end;
		delayed(interval - ((os.clock() + timeDifferential) % interval), recall);
	end;
	function SyncedPoller:cancel()
		self.isRunning = false;
	end;
end;
exports = SyncedPoller;
return exports;
