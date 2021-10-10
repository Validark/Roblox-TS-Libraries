-- Simulates the motion of a critically damped spring
-- @original fractality
-- @editor Validark

local Spring = {}
Spring.__index = Spring

local tau = math.pi * 2
local exp = math.exp
local sin = math.sin
local cos = math.cos
local sqrt = math.sqrt

local EPSILON = 1e-4

function Spring.new(position, angularFrequency, goal, dampingRatio)
	if angularFrequency == nil then angularFrequency = 10 end
	if dampingRatio == nil then dampingRatio = 1 end

	if dampingRatio * angularFrequency < 0 then
		error("Spring does not converge", 2)
	end

	return setmetatable({
		goal = goal or position,
		dampingRatio = dampingRatio,
		angularFrequency = angularFrequency,
	}, Spring):resetToPosition(position)
end

function Spring:resetToPosition(position)
	self.position = position
	self.velocity = position * 0 -- Match the original vector type
	return self
end

function Spring:update(deltaTime)
	local dampingRatio = self.dampingRatio
	local angularFrequency = self.angularFrequency * tau
	local goal = self.goal
	local p0 = self.position
	local v0 = self.velocity

	local offset = p0 - goal
	local decay = exp(-dampingRatio * angularFrequency * deltaTime)
	local position

	if dampingRatio == 1 then -- Critically damped
		position = (offset * (1 + angularFrequency * deltaTime) + v0 * deltaTime) * decay + goal
		self.velocity = (v0 * (1 - angularFrequency * deltaTime) - offset * (angularFrequency * angularFrequency * deltaTime)) * decay
	elseif dampingRatio < 1 then -- Underdamped
		local e = 1 - dampingRatio * dampingRatio
		local c = sqrt(e)
		local y = angularFrequency * c
		local i = cos(y * deltaTime)
		local j = sin(y * deltaTime)

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
			local a_2 = a * a
			z = a * (((e*e * a_2 - 20*e) / 120) * a_2 + 1)
		end

		-- Frequencies approaching 0 present a similar problem.
		-- We want an approximation for y as angularFrequency approaches 0, where:
		--    y = sin(deltaTime*angularFrequency*c)/(angularFrequency*c)
		-- Substitute b=deltaTime*c:
		--    y = sin(b*c)/b
		-- Now reapply the process from z.

		if y > EPSILON then
			y = j / y
		else
			local b = y * y
			local dd = deltaTime * deltaTime
			y = deltaTime * (dd * (b*b*dd / 20 - b) / 6 + 1)
		end

		local ze = z * dampingRatio
		position = (offset * (i + ze) + v0 * y) * decay + goal
		self.velocity = (v0 * (i - ze) - offset * (z * angularFrequency)) * decay
	else -- Overdamped
		local x = -angularFrequency * dampingRatio
		local y = angularFrequency * sqrt(dampingRatio * dampingRatio - 1)
		local r1 = x + y
		local r2 = x - y

		local co2 = (v0 - offset * r1) / (2 * y)
		local co1 = offset - co2

		local e1 = co1 * exp(r1 * deltaTime)
		local e2 = co2 * exp(r2 * deltaTime)

		position = e1 + e2 + goal
		self.velocity = e1 * r1 + e2 * r2
	end

	self.position = position
	return position
end

return Spring
