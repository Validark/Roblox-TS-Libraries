-- Simulates the motion of a critically damped spring
-- @documentation https://rostrap.github.io/Libraries/Math/Spring/
-- @source https://raw.githubusercontent.com/RoStrap/Math/master/Spring.lua
-- @rostrap Spring
-- @author fractality

------------------------------------------------------------------------
-- API:
--   Spring Spring.new(double damp, double freq, vector pos)
--   void Spring:SetGoal(vector goal)
--   void Spring:SetFrequency(double freq)
--   void Spring:SetDampingRatio(double damp)
--   vector Spring:GetPosition()
--   vector Spring:GetVelocity()
--   vector Spring:Update(double deltaTime)
--   void Spring:Reset(vector state)
--
-- Notes:
--   The state vector type must implement the following metamethods:
--     vector __mul(vector, double)
--     vector __add(vector, vector)
--     vector __sub(vector, vector)
------------------------------------------------------------------------

local Spring = {}
Spring.__index = {}

local pi = math.pi
local exp = math.exp
local sin = math.sin
local cos = math.cos
local sqrt = math.sqrt

local EPSILON = 1e-4

function Spring.new(position, goal, dampingRatio, angularFrequency)
	goal = goal or position
	dampingRatio = dampingRatio or 1
	angularFrequency = angularFrequency or 10
	assert(dampingRatio * angularFrequency >= 0, "Spring does not converge")

	return setmetatable(
		{
			dampingRatio = dampingRatio,
			angularFrequency = angularFrequency,
			goal = goal,
			position = position,
			velocity = position * 0 -- Match the original vector type
		},
		Spring
	)
end

function Spring.__index:reset(position)
	self.position = position
	self.velocity = position * 0 -- Match the original vector type
	return self
end

function Spring.__index:update(deltaTime)
	local dampingRatio = self.dampingRatio
	local angularFrequency = self.angularFrequency * 2 * pi
	local goal = self.goal
	local p0 = self.position
	local v0 = self.velocity

	local offset = p0 - goal
	local decay = exp(-dampingRatio * angularFrequency * deltaTime)

	local p1, v1

	if dampingRatio == 1 then -- Critically damped
		self.position = (offset * (1 + angularFrequency * deltaTime) + v0 * deltaTime) * decay + goal
		self.velocity = (v0 * (1 - angularFrequency * deltaTime) - offset * (angularFrequency * angularFrequency * deltaTime)) * decay
	elseif dampingRatio < 1 then -- Underdamped
		local c = sqrt(1 - dampingRatio * dampingRatio)

		local i = cos(angularFrequency * c * deltaTime)
		local j = sin(angularFrequency * c * deltaTime)

		-- Damping ratios approaching 1 can cause division by small numbers.
		-- To fix that, group terms around z=j/c and find an approximation for z.
		-- Start with the definition of z:
		--    z = sin(deltaTime*angularFrequency*c)/c
		-- Substitute a=deltaTime*angularFrequency:
		--    z = sin(a*c)/c
		-- Take the Maclaurin expansion of z with respect to c:
		--    z = a - (a^3*c^2)/6 + (a^5*c^4)/120 + O(c^6)
		--    z ≈ a - (a^3*c^2)/6 + (a^5*c^4)/120
		-- Rewrite in Horner form:
		--    z ≈ a + ((a*a)*(c*c)*(c*c)/20 - c*c)*(a*a*a)/6

		local z
		if c > EPSILON then
			z = j / c
		else
			local a = deltaTime * angularFrequency
			z = a + ((a * a) * (c * c) * (c * c) / 20 - c * c) * (a * a * a) / 6
		end

		-- Frequencies approaching 0 present a similar problem.
		-- We want an approximation for y as angularFrequency approaches 0, where:
		--    y = sin(deltaTime*angularFrequency*c)/(angularFrequency*c)
		-- Substitute b=deltaTime*c:
		--    y = sin(b*c)/b
		-- Now reapply the process from z.

		local y
		if angularFrequency * c > EPSILON then
			y = j / (angularFrequency * c)
		else
			local b = angularFrequency * c
			y = deltaTime + ((deltaTime * deltaTime) * (b * b) * (b * b) / 20 - b * b) * (deltaTime * deltaTime * deltaTime) / 6
		end

		self.position = (offset * (i + dampingRatio * z) + v0 * y) * decay + goal
		self.velocity = (v0 * (i - z * dampingRatio) - offset * (z * angularFrequency)) * decay
	else -- Overdamped
		local c = sqrt(dampingRatio * dampingRatio - 1)

		local r1 = -angularFrequency * (dampingRatio - c)
		local r2 = -angularFrequency * (dampingRatio + c)

		local co2 = (v0 - offset * r1) / (2 * angularFrequency * c)
		local co1 = offset - co2

		local e1 = co1 * exp(r1 * deltaTime)
		local e2 = co2 * exp(r2 * deltaTime)

		self.position = e1 + e2 + goal
		self.velocity = e1 * r1 + e2 * r2
	end

	return self
end

return Spring
