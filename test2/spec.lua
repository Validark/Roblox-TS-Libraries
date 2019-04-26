function* arrayIterator<T>(arr: Array<T>): IterableIterator<[T, string]> {
	for (const v of arr) yield [v, "none"];

}

-- const array4 = [10, 20, 30];
-- const it4 = arrayIterator(array4);
-- it4.next();
-- it4[Symbol.iterator]();
-- print(it4.next()); // { value: 1, done: false }
-- print(it4.next()); // { value: 2, done: false }
-- print(it4.next()); // { value: 3, done: false }
-- print(it4.next()); // { value: undefined, done: true }

-- declaration
local function arrayIterator(arr)
	return {
		next = coroutine.wrap(function()
			for i = 1, #arr do
				local yield = arr[i]

				print(coroutine.yield {
					value = yield;
					done = yield == nil;
				})
			end

			while true do
				coroutine.yield {
					done = true
				}
			end
		end)
	}
end

local function observe(t)
	print(t.value, t.done)
end

-- use
local it4 = arrayIterator{10, 20, 30}
print(observe(it4.next(40)))
print(observe(it4.next(50)))
print(observe(it4.next(60)))
-- print(observe(it4.next()))
-- print(observe(it4.next()))

for _0 in it4.next do
	if _0.done then break end
	local var = _0.value
	print(var)
end
