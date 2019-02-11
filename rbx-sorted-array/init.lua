-- Class that memoizes sorting by inserting values in order. Optimized for very large arrays.
-- @source https://raw.githubusercontent.com/RoStrap/DataTypes/master/SortedArray.lua
-- @rostrap SortedArray
-- @documentation https://rostrap.github.io/Libraries/DataTypes/SortedArray/
-- @author Validark

local TS = require(
	game:GetService("ReplicatedStorage")
		:WaitForChild("RobloxTS")
		:WaitForChild("Include")
		:WaitForChild("RuntimeLib")
);

local sort = table.sort
local insert = table.insert

local SortedArray = {}
local Comparisons = setmetatable({}, {__mode = "k"})

SortedArray.__index = {}

for FunctionName, Function in next, TS do
	if FunctionName:find("array_", 1, true) == 1 then
		SortedArray.__index[FunctionName] = Function
	end
end

SortedArray.__index.removeIndex = table.remove
SortedArray.__index.forEach = TS.array_forEach
SortedArray.__index.map = TS.array_map
SortedArray.__index.some = TS.array_some
SortedArray.__index.every = TS.array_every
SortedArray.__index.reduce = TS.array_reduce
SortedArray.__index.reduceRight = TS.array_reduceRight

function SortedArray.__index:filter(...)
	local this = setmetatable(TS.array_filter(self, ...), SortedArray)
	this.Comparison = self.Comparison
	return this
end

function SortedArray.__index:slice(...)
	local this = setmetatable(TS.array_slice(self, ...), SortedArray)
	this.Comparison = self.Comparison
	return this
end

function SortedArray.new(self, Comparison)
	if self then
		sort(self, Comparison)
	else
		self = {}
	end

	self.Comparison = Comparison
	return setmetatable(self, SortedArray)
end

local function FindClosest(self, Value, Low, High, Eq, Lt)
	local Middle do
		local Sum = Low + High
		Middle = (Sum - Sum % 2) / 2
	end

	if Middle == 0 then
		return nil
	end

	local Compare = Lt or self.Comparison
	local Value2 = self[Middle]

	while Middle ~= High do
		if Eq then
			if Eq(Value, Value2) then
				return Middle
			end
		elseif Value == Value2 then
			return Middle
		end

		local Bool

		if Compare then
			Bool = Compare(Value, Value2)
		else
			Bool = Value < Value2
		end

		if Bool then
			High = Middle - 1
		else
			Low = Middle + 1
		end

		local Sum = Low + High
		Middle = (Sum - Sum % 2) / 2
		Value2 = self[Middle]
	end

	return Middle
end

function SortedArray.__index:insert(Value)
	-- Inserts a Value into the SortedArray while maintaining its sortedness

	local Position = FindClosest(self, Value, 1, #self)
	local Value2 = self[Position]

	if Value2 then
		local Compare = self.Comparison
		local Bool

		if Compare then
			Bool = Compare(Value, Value2)
		else
			Bool = Value < Value2
		end

		Position = Bool and Position or Position + 1
	else
		Position = 1
	end

	insert(self, Position, Value)

	return Position - 1
end

function SortedArray.__index:indexOf(Value, Eq, Lt, U_0, U_n)
	-- Finds a Value in a SortedArray and returns its position (or nil if non-existant)

	local Position = FindClosest(self, Value, U_0 or 1, U_n or #self, Eq, Lt)

	local Bool

	if Position then
		if Eq then
			Bool = Eq(Value, self[Position])
		else
			Bool = Value == self[Position]
		end
	end

	return Bool and Position - 1 or nil
end

function SortedArray.__index:copy()
	local New = {}

	for i = 1, #self do
		New[i] = self[i]
	end

	return New
end

function SortedArray.__index:clone()
	local New = {}

	for i = 1, #self do
		New[i] = self[i]
	end

	Comparisons[New] = self.Comparison
	return setmetatable(New, SortedArray)
end

function SortedArray.__index:removeElement(Signature, Eq, Lt)
	local Position = self:indexOf(Signature, Eq, Lt)

	if Position then
		return self:removeIndex(Position)
	end
end

function SortedArray.__index:sort()
	sort(self, self.Comparison)
end

function SortedArray.__index:sortIndex(Index)
	-- Sorts a single element at number Index
	-- Useful for when a single element is somehow altered such that it should get a new position in the array

	return self:insert(self:removeIndex(Index))
end

function SortedArray.__index:sortElement(Signature, Eq, Lt)
	-- Sorts a single element if it exists
	-- Useful for when a single element is somehow altered such that it should get a new position in the array

	return self:insert(self:removeElement(Signature, Eq, Lt))
end

function SortedArray.__index:getIntersection(SortedArray2, Eq, Lt)
	-- Returns a SortedArray of Commonalities between self and another SortedArray
	-- If applicable, the returned SortedArray will inherit the Comparison function from self

	if SortedArray ~= getmetatable(SortedArray2) then error("bad argument #2 to GetIntersection: expected SortedArray, got " .. typeof(SortedArray2) .. " " .. tostring(SortedArray2)) end
	local Commonalities = SortedArray.new(nil, self.Comparison)
	local Count = 0
	local Position = 1
	local NumSelf = #self
	local NumSortedArray2 = #SortedArray2

	if NumSelf > NumSortedArray2 then -- Iterate through the shorter SortedArray
		NumSelf, NumSortedArray2 = NumSortedArray2, NumSelf
		self, SortedArray2 = SortedArray2, self
	end

	for i = 1, NumSelf do
		local Current = self[i]
		local CurrentPosition = SortedArray2:indexOf(Current, Eq, Lt, Position, NumSortedArray2)

		if CurrentPosition then
			Position = CurrentPosition
			Count = Count + 1
			Commonalities[Count] = Current
		end
	end

	return Commonalities
end

local function GetMedian(self, a, b)
	local c = a + b

	if c % 2 == 0 then
		return self[c / 2]
	else
		local d = (c - 1) / 2
		return (self[d] + self[d + 1]) / 2
	end
end

-- Five number summary Functions
function SortedArray.__index:front() return self[1] end
function SortedArray.__index:back() return self[#self] end
function SortedArray.__index:median() return GetMedian(self, 1, #self) end
function SortedArray.__index:quartile1() local n = #self return GetMedian(self, 1, (n - n % 2) / 2) end
function SortedArray.__index:quartile3() local n = #self return GetMedian(self, 1 + (n + n % 2) / 2, n) end

return SortedArray
