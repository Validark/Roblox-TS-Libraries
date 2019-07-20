-- Compiled with https://roblox-ts.github.io v0.2.7
-- July 20, 2019, 2:33 PM Central Daylight Time

local _exports;
local recall;
local timeDifferential = math.floor((tick() - os.time()) / 900 + 0.5) * 900;
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
		self.isRunning = true;
		recall = function(timeElapsed, gameTime)
			if condition then
				self.isRunning = condition();
			end;
			if self.isRunning then
				callback(timeElapsed, gameTime);
				delay(interval - ((tick() + timeDifferential) % interval), recall);
			end;
		end;
		delay(interval - ((tick() + timeDifferential) % interval), recall);
	end;
	function SyncedPoller:cancel()
		self.isRunning = false;
	end;
end;
_exports = SyncedPoller;
return _exports;
