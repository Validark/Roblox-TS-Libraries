local RunService = game:GetService("RunService")

local function spawn(callback, ...)
    local bindable = Instance.new("BindableEvent")
    local length = select("#", ...)

    if length == 0 then
        bindable.Event:Connect(callback)
    else
        local args = { ... }
        bindable.Event:Connect(function()
            callback(table.unpack(args, 1, length))
        end)
    end

	bindable:Fire()
	bindable:Destroy()
end

-- uses a sorted singly linked list (queue) to achieve O(1) remove operations and O(n) for insert

local first -- the initial node in the linked list
local connection -- the Heartbeat `RBXScriptConnection | nil`
local MINIMUM_DELAY = 0.029 -- the minimum amount of time a callback/bindable:Fire() can be delayed

local function delay(seconds, callback, ...)
	-- If seconds is nil, -INF, INF, NaN, or less than MINIMUM_DELAY, assume seconds is MINIMUM_DELAY.
	if seconds == nil or not (seconds >= MINIMUM_DELAY) or seconds == math.huge then
		seconds = MINIMUM_DELAY
	end

	local startTime = os.clock()
	local endTime = startTime + seconds

	local node = {
		callback = callback,
		startTime = startTime,
		endTime = endTime
	}

	local length = select("#", ...)

	if length > 0 then
		node.args = { length + 1, ... } -- this is an optimization
	end

	if connection == nil then -- first is nil when connection is nil
		first = node
		local i = 0
		connection = RunService.Heartbeat:Connect(function()
			print(first, i)
			i = i + 1
			while first.endTime <= os.clock() do
				local current = first
				first = current.next

				if first == nil then
					connection:Disconnect()
					connection = nil
				end

				local args = current.args
				local callback = current.callback

				if typeof(callback) == "Instance" then
					if args ~= nil then
						callback:Fire(os.clock() - current.startTime, table.unpack(args, 2, args[1]))
					else
						callback:Fire(os.clock() - current.startTime)
					end
				else
					local bindable = Instance.new("BindableEvent")

					if args ~= nil then
						bindable.Event:Connect(function(elapsedTime)
							callback(elapsedTime, table.unpack(args, 2, args[1]))
						end)
					else
						bindable.Event:Connect(callback)
					end

					bindable:Fire(os.clock() - current.startTime)
					bindable:Destroy()
				end

				if current.next == nil then return end
			end
		end)
	else -- first is non-nil
		if first.endTime < endTime then -- if `node` should be placed after `first`
			-- we will insert `node` between `current` and `next`
			-- (i.e. after `current` if `next` is nil)
			local current = first
			local next = current.next

			while next ~= nil and next.endTime < endTime do
				current = next
				next = current.next
			end

			-- `current` must be non-nil, but `next` could be `nil` (i.e. last item in list)
			current.next = node

			if next ~= nil then
				node.next = next
			end
		else
			-- set `node` to `first`
			node.next = first
			first = node
		end
	end
end

local function wait(seconds)
    local bindable = Instance.new("BindableEvent")
    delay(seconds, bindable)
    local elapsedTime = bindable.Event:Wait()
    bindable:Destroy()
    return elapsedTime
end

return {
    spawn = spawn;
    delay = delay;
    wait = wait;
}
