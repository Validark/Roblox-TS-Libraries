-- Generates option-picker functions from relative probabilities
-- @author Validark

math.randomseed(tick())

return {
	new = function(MyOptions, MyRelativeWeights)
		local Options = {}
		local RelativeWeights = {}
		local n = #MyOptions

		if n == 0 then
			error("[WeightedProbabilityFunction] must supply at least one option", 2)
		end

		if MyRelativeWeights then
			if n ~= #MyRelativeWeights then
				error("[WeightedProbabilityFunction] options and relativeWeights arrays must be of the same length", 2)
			end

			local TotalWeight = 0

			for i = 1, n do
				local Weight = MyRelativeWeights[i]
				if Weight < 0 then
					error("[WeightedProbabilityFunction] relativeWeights cannot be negative", 2)
				end
				TotalWeight = TotalWeight + Weight
				Options[i] = MyOptions[i]
			end

			if TotalWeight <= 0 then
				error("[WeightedProbabilityFunction] Please give a relativeWeight greater than 0", 2)
			end

			for i = 1, n do
				RelativeWeights[i] = MyRelativeWeights[i] / TotalWeight
			end
		else
			local Weight = 1 / n
			for i = 1, n do
				Options[i] = MyOptions[i]
				RelativeWeights[i] = Weight
			end
		end

		return function()
			local Picked = math.random()

			for i = 1, n do
				Picked = Picked - RelativeWeights[i]
				if Picked < 0 then
					return Options[i]
				end
			end

			return Options[n]
		end
	end;
}
