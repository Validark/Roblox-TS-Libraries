-- Compiled by hand by Validark

local TS = _G[script];
local yieldForTree = TS.import(TS.getModule("validate-tree")).yieldForTree;

return {
	yieldForTree = yieldForTree;
	default = yieldForTree;
};
