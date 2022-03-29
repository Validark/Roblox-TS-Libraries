-- Prescribed Material design Beziers and optimized Robert Penner functions
-- @author Robert Penner
-- @author Emmanual Oga

--[[
Tweener authors,
Yuichi Tateno,
Emmanuel Oga

The MIT License
--------
Copyright (c) 2010, Emmanuel Oga.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
--]]

local Bezier = require(assert(script.Parent:FindFirstChild("cubic-bezier"), "[@rbxts/easing-functions] Please `npm install @rbxts/cubic-bezier` to use this library."))

-- @specs https://material.io/design/motion/speed.html#easing
local Sharp = Bezier.new(0.4, 0, 0.6, 1)
local Standard = Bezier.new(0.4, 0, 0.2, 1)
local Acceleration = Bezier.new(0.4, 0, 1, 1)
local Deceleration = Bezier.new(0, 0, 0.2, 1)

--[[
	Disclaimer for Robert Penner's Easing Equations license:

	TERMS OF USE - EASING EQUATIONS

	Open source under the BSD License.

	Copyright © 2001 Robert Penner
	All rights reserved.

	Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

	* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
	* Neither the name of the author nor the names of contributors may be used to endorse or promote products derived from this software without specific prior written permission.

	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
	IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
	OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
]]

-- For all easing functions:
-- t = elapsed time
-- b = beginning value
-- c = change in value same as: ending - beginning
-- d = duration (total time)

-- Where applicable
-- a = amplitude
-- p = period

local sin = math.sin
local cos = math.cos
local abs = math.abs
local asin = math.asin
local exp = math.exp

local SoftSpringpi = -3.2*3.1415926535897932
local Springpi = 2*SoftSpringpi

local function Linear(t, b, c, d)
	return c * t / d + b
end

local function Smooth(t, b, c, d)
	t = t / d
	return c * t * t * (3 - 2*t) + b
end

local function Smoother(t, b, c, d)
	t = t / d
	return c*t*t*t * (t * (6*t - 15) + 10) + b
end

-- Arceusinator's Easing Functions
local function RevBack(t, b, c, d)
	t = 1 - t / d
	return c*(1 - (sin(t*1.5707963267948966) + (sin(t*3.1415926535897932) * (cos(t*3.1415926535897932) + 1)*0.5))) + b
end

local function RidiculousWiggle(t, b, c, d)
	t = t / d
	return c*sin(sin(t*3.1415926535897932)*1.5707963267948966) + b
end

-- YellowTide's Easing Functions
local function Spring(t, b, c, d)
	t = t / d
	return (1 + (-exp(-6.9 * t) * cos(Springpi*t))) * c + b
end

local function SoftSpring(t, b, c, d)
	t = t / d
	return (1 + (-exp(-7.5 * t) * cos(SoftSpringpi*t))) * c + b
end
-- End of YellowTide's functions

local function InQuad(t, b, c, d)
	t = t / d
	return c * t * t + b
end

local function OutQuad(t, b, c, d)
	t = t / d
	return -c * t * (t - 2) + b
end

local function InOutQuad(t, b, c, d)
	t = t / d * 2

	if t < 1 then
		return c * 0.5 * t * t + b
	else
		return -c * 0.5 * ((t - 1) * (t - 3) - 1) + b
	end
end

local function OutInQuad(t, b, c, d)
	if t < d * 0.5 then
		t = 2 * t / d
		return -0.5 * c * t * (t - 2) + b
	else
		t = ((t * 2) - d) / d
		c = 0.5 * c
		return c * t * t + b + c
	end
end

local function InCubic(t, b, c, d)
	t = t / d
	return c * t * t * t + b
end

local function OutCubic(t, b, c, d)
	t = t / d - 1
	return c * (t * t * t + 1) + b
end

local function InOutCubic(t, b, c, d)
	t = t / d * 2
	if t < 1 then
		return c * 0.5 * t * t * t + b
	else
		t = t - 2
		return c * 0.5 * (t * t * t + 2) + b
	end
end

local function OutInCubic(t, b, c, d)
	if t < d * 0.5 then
		t = t * 2 / d - 1
		return c * 0.5 * (t * t * t + 1) + b
	else
		t = ((t * 2) - d) / d
		c = c * 0.5
		return c * t * t * t + b + c
	end
end

local function InQuart(t, b, c, d)
	t = t / d
	return c * t * t * t * t + b
end

local function OutQuart(t, b, c, d)
	t = t / d - 1
	return -c * (t * t * t * t - 1) + b
end

local function InOutQuart(t, b, c, d)
	t = t / d * 2
	if t < 1 then
		return c * 0.5 * t * t * t * t + b
	else
		t = t - 2
		return -c * 0.5 * (t * t * t * t - 2) + b
	end
end

local function OutInQuart(t, b, c, d)
	if t < d * 0.5 then
		t = t * 2 / d - 1
		c = c * 0.5
		return -c * (t * t * t * t - 1) + b
	else
		t = ((t * 2) - d) / d
		c = c * 0.5
		return c * t * t * t * t + b + c
	end
end

local function InQuint(t, b, c, d)
	t = t / d
	return c * t * t * t * t * t + b
end

local function OutQuint(t, b, c, d)
	t = t / d - 1
	return c * (t * t * t * t * t + 1) + b
end

local function InOutQuint(t, b, c, d)
	t = t / d * 2
	if t < 1 then
		return c * 0.5 * t * t * t * t * t + b
	else
		t = t - 2
		return c * 0.5 * (t * t * t * t * t + 2) + b
	end
end

local function OutInQuint(t, b, c, d)
	if t < d * 0.5 then
		t = t * 2 / d - 1
		return c * 0.5 * (t * t * t * t * t + 1) + b
	else
		t = ((t * 2) - d) / d
		c = c * 0.5
		return c * t * t * t * t * t + b + c
	end
end

local function InSine(t, b, c, d)
	return -c * cos(t / d * 1.5707963267948966) + c + b
end

local function OutSine(t, b, c, d)
	return c * sin(t / d * 1.5707963267948966) + b
end

local function InOutSine(t, b, c, d)
	return -c * 0.5 * (cos(3.1415926535897932 * t / d) - 1) + b
end

local function OutInSine(t, b, c, d)
	c = c * 0.5
	if t < d * 0.5 then
		return c * sin(t * 2 / d * 1.5707963267948966) + b
	else
		return -c * cos(((t * 2) - d) / d * 1.5707963267948966) + 2 * c + b
	end
end

local function InExpo(t, b, c, d)
	if t == 0 then
		return b
	else
		return c * 1024 ^ (t / d - 1) + b - c * 0.001
	end
end

local function OutExpo(t, b, c, d)
	if t == d then
		return b + c
	else
		return c * 1.001 * (1 - exp(-6.9314718055994531 * (t / d))) + b
	end
end

local function InOutExpo(t, b, c, d)
	t = t / d * 2

	if t == 0 then
		return b
	elseif t == 2 then
		return b + c
	elseif t < 1 then
		return c * 0.5 * 1024 ^ (t - 1) + b - c * 0.0005
	else
		return c * 0.50025 * (2 - exp(-6.9314718055994531 * (t - 1))) + b
	end
end

local function OutInExpo(t, b, c, d)
	c = c * 0.5
	if t < d * 0.5 then
		if t * 2 == d then
			return b + c
		else
			return c * 1.001 * (1 - exp(13.8629436111989062 * t / d)) + b
		end
	else
		if t * 2 - d == 0 then
			return b + c
		else
			return c * 1024 ^ ((t * 2 - d) / d - 1) + b + c - c * 0.001
		end
	end
end

local function InCirc(t, b, c, d)
	t = t / d
	return -c * ((1 - t * t) ^ 0.5 - 1) + b
end

local function OutCirc(t, b, c, d)
	t = t / d - 1
	return c * (1 - t * t) ^ 0.5 + b
end

local function InOutCirc(t, b, c, d)
	t = t / d * 2
	if t < 1 then
		return -c * 0.5 * ((1 - t * t) ^ 0.5 - 1) + b
	else
		t = t - 2
		return c * 0.5 * ((1 - t * t) ^ 0.5 + 1) + b
	end
end

local function OutInCirc(t, b, c, d)
	c = c * 0.5
	if t < d * 0.5 then
		t = t * 2 / d - 1
		return c * (1 - t * t) ^ 0.5 + b
	else
		t = (t * 2 - d) / d
		return -c * ((1 - t * t) ^ 0.5 - 1) + b + c
	end
end

local function InElastic(t, b, c, d, a, p)
	t = t / d - 1
	if t == -1 then
		return b
	else
		if t == 0 then
			return b + c
		else
			p = p or d * 0.3
			local abs_c

			if c < 0 then
				abs_c = -c
			else
				abs_c = c
			end

			if a == nil or a < abs_c then
				return -(c * 1024 ^ t * sin((t * d - p * 0.25) * 6.2831853071795864 / p)) + b
			else
				return -(a * 1024 ^ t * sin((t * d - p / 6.2831853071795864 * asin(c/a)) * 6.2831853071795864 / p)) + b
			end
		end
	end
end

local function OutElastic(t, b, c, d, a, p)
	t = t / d
	if t == 0 then
		return b
	else
		if t == 1 then
			return b + c
		else
			p = p or d * 0.3
			local abs_c

			if c < 0 then
				abs_c = -c
			else
				abs_c = c
			end

			if a == nil or a < abs_c then
				return c * exp(-6.9314718055994531 * t) * sin((t * d - p * 0.25) * 6.2831853071795864 / p) + c + b
			else
				return a * exp(-6.9314718055994531 * t) * sin((t * d - p / 6.2831853071795864 * asin(c / a)) * 6.2831853071795864 / p) + c + b
			end
		end
	end
end

local function InOutElastic(t, b, c, d, a, p)
	if t == 0 then
		return b
	end

	t = t / d * 2 - 1

	if t == 1 then
		return b + c
	end

	p = p or d * 0.45
	a = a or 0

	local s
	local abs_c

	if c < 0 then
		abs_c = -c
	else
		abs_c = c
	end

	if a == nil or a < abs_c then
		a = c
		s = p * 0.25
	else
		s = p / 6.2831853071795864 * asin(c / a)
	end

	if t < 1 then
		return -0.5 * a * 1024 ^ t * sin((t * d - s) * 6.2831853071795864 / p) + b
	else
		return a * exp(-6.9314718055994531 * t) * sin((t * d - s) * 6.2831853071795864 / p ) * 0.5 + c + b
	end
end

local function OutInElastic(t, b, c, d, a, p)
	if t < d * 0.5 then
		return OutElastic(t * 2, b, c * 0.5, d, a, p)
	else
		return InElastic(t * 2 - d, b + c * 0.5, c * 0.5, d, a, p)
	end
end

local function InBack(t, b, c, d, s)
	s = s or 1.70158
	t = t / d
	return c * t * t * ((s + 1) * t - s) + b
end

local function OutBack(t, b, c, d, s)
	s = s or 1.70158
	t = t / d - 1
	return c * (t * t * ((s + 1) * t + s) + 1) + b
end

local function InOutBack(t, b, c, d, s)
	s = (s or 1.70158) * 1.525
	t = t / d * 2
	if t < 1 then
		return c * 0.5 * (t * t * ((s + 1) * t - s)) + b
	else
		t = t - 2
		return c * 0.5 * (t * t * ((s + 1) * t + s) + 2) + b
	end
end

local function OutInBack(t, b, c, d, s)
	c = c * 0.5
	s = s or 1.70158
	if t < d * 0.5 then
		t = (t * 2) / d - 1
		return c * (t * t * ((s + 1) * t + s) + 1) + b
	else
		t = ((t * 2) - d) / d
		return c * t * t * ((s + 1) * t - s) + b + c
	end
end

local function OutBounce(t, b, c, d)
	t = t / d
	if t < 1 / 2.75 then
		return c * (7.5625 * t * t) + b
	elseif t < 2 / 2.75 then
		t = t - (1.5 / 2.75)
		return c * (7.5625 * t * t + 0.75) + b
	elseif t < 2.5 / 2.75 then
		t = t - (2.25 / 2.75)
		return c * (7.5625 * t * t + 0.9375) + b
	else
		t = t - (2.625 / 2.75)
		return c * (7.5625 * t * t + 0.984375) + b
	end
end

local function InBounce(t, b, c, d)
	return c - OutBounce(d - t, 0, c, d) + b
end

local function InOutBounce(t, b, c, d)
	if t < d * 0.5 then
		return InBounce(t * 2, 0, c, d) * 0.5 + b
	else
		return OutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
	end
end

local function OutInBounce(t, b, c, d)
	if t < d * 0.5 then
		return OutBounce(t * 2, b, c * 0.5, d)
	else
		return InBounce(t * 2 - d, b + c * 0.5, c * 0.5, d)
	end
end

return {
	Standard = Standard;
	Deceleration = Deceleration;
	Acceleration = Acceleration;
	Sharp = Sharp;

	Linear = Linear;

	InSine = InSine;
	OutSine = OutSine;
	InOutSine = InOutSine;
	OutInSine = OutInSine;

	InBack = InBack;
	OutBack = OutBack;
	InOutBack = InOutBack;
	OutInBack = OutInBack;

	InQuad = InQuad;
	OutQuad = OutQuad;
	InOutQuad = InOutQuad;
	OutInQuad = OutInQuad;

	InQuart = InQuart;
	OutQuart = OutQuart;
	InOutQuart = InOutQuart;
	OutInQuart = OutInQuart;

	InQuint = InQuint;
	OutQuint = OutQuint;
	InOutQuint = InOutQuint;
	OutInQuint = OutInQuint;

	InBounce = InBounce;
	OutBounce = OutBounce;
	InOutBounce = InOutBounce;
	OutInBounce = OutInBounce;

	InElastic = InElastic;
	OutElastic = OutElastic;
	InOutElastic = InOutElastic;
	OutInElastic = OutInElastic;

	InCirc = InCirc;
	OutCirc = OutCirc;
	InOutCirc = InOutCirc;
	OutInCirc = OutInCirc;

	InCubic = InCubic;
	OutCubic = OutCubic;
	InOutCubic = InOutCubic;
	OutInCubic = OutInCubic;

	InExpo = InExpo;
	OutExpo = OutExpo;
	InOutExpo = InOutExpo;
	OutInExpo = OutInExpo;

	Smooth = Smooth;
	Smoother = Smoother;
	RevBack = RevBack;
	RidiculousWiggle = RidiculousWiggle;
	Spring = Spring;
	SoftSpring = SoftSpring;
}
