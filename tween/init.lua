local Lerps = require(assert(script.Parent:FindFirstChild("lerp-functions"), "[@rbxts/tween] Please install @rbxts/lerp-functions to use this library."))

local Tween = {
	Running = false;
	ElapsedTime = 0;
}
Tween.__index = Tween

local RunService = game:GetService("RunService")
local Heartbeat = RunService.Heartbeat
local RenderStepped = RunService.RenderStepped

function Tween:Play()
	if not self.Running then
		local RenderEvent

		if self.ValueType == "CFrame" then
			RenderEvent = RenderStepped
		else
			RenderEvent = Heartbeat
		end

		self.Connection = RenderEvent:Connect(self.Interpolator)
		self.Running = true
	end

	return self
end

function Tween:Pause()
	if self.Running then
		self.Connection:Disconnect()
		self.Running = false
	end

	return self
end

function Tween:Cancel()
	self.ElapsedTime = 0
	return self:Pause()
end

function Tween:Wait()
	local RenderEvent

	if self.ValueType == "CFrame" then
		RenderEvent = RenderStepped
	else
		RenderEvent = Heartbeat
	end

	while self.Running do RenderEvent:Wait() end
	return self
end

local function MakeTween(Duration, EasingFunction, Callback, InitialValue, EndValue, v1, v2)
	if InitialValue == nil then
		InitialValue = 0
		EndValue = 1
	end

	local ValueType = typeof(InitialValue)
	local LerpFunction = Lerps[ValueType](InitialValue, EndValue)

	local self = setmetatable({
		Duration = Duration;
		ValueType = ValueType;
	}, Tween)

	function self.Interpolator(Step)
		local ElapsedTime = self.ElapsedTime + Step
		self.ElapsedTime = ElapsedTime

		if Duration > ElapsedTime then
			-- Because of the way doubles are implemented,
			-- they can hold more unique values between 0 and 1 than any other numbers.
			-- To take advantage of this precision, we shouldn't try to get smart about
			-- changing the beginning/change parameters here
			Callback(LerpFunction(EasingFunction(ElapsedTime, 0, 1, Duration, v1, v2)))
		else
			Callback(EndValue)
			self:Pause()
		end
	end

	return self:Play()
end

return {
	Tween = MakeTween;
	default = MakeTween;
}
