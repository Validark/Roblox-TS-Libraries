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

-- uses a min-heap to achieve O(1) check operations and O(log(n)) remove/insert operations
local queue = {}
local len = 0

local connection -- the Heartbeat `RBXScriptConnection | nil`

local function heartbeatStep()
	local clockTick = os.clock()

	repeat
		local current = queue[1]
		if current == nil or current.endTime > clockTick then break end
		local done = len == 1

		if done then
			queue[1] = nil
			len = 0
			connection:Disconnect()
			connection = nil
		else
			local lastNode = queue[len]
			queue[len] = nil
			len = len - 1
			local targetIndex = 1

			while true do
				local childIndex = 2*targetIndex -- leftChild, but this might change to rightChild below
				if childIndex > len then break end
				local minChild = queue[childIndex]
				local rightChildIndex = childIndex + 1

				if rightChildIndex <= len then
					local rightChild = queue[rightChildIndex]
					if rightChild.endTime < minChild.endTime then
						childIndex = rightChildIndex
						minChild = rightChild
					end
				end

				if lastNode.endTime < minChild.endTime then break end
				queue[targetIndex] = minChild
				targetIndex = childIndex
			end

			queue[targetIndex] = lastNode
		end

		local args = current.args
		local callback = current.callback

		if typeof(callback) == "Instance" then
			if args then
				callback:Fire(os.clock() - current.startTime, table.unpack(args, 2, args[1]))
			else
				callback:Fire(os.clock() - current.startTime)
			end
		else
			local bindable = Instance.new("BindableEvent")

			if args then
				bindable.Event:Connect(function(elapsedTime)
					callback(elapsedTime, table.unpack(args, 2, args[1]))
				end)
			else
				bindable.Event:Connect(callback)
			end

			bindable:Fire(os.clock() - current.startTime)
			bindable:Destroy()
		end
	until done
end

local function delay(seconds, callback, ...)
	-- If seconds is nil, -INF, INF, NaN, or less than MINIMUM_DELAY, assume seconds is MINIMUM_DELAY.
	if seconds == nil or not (seconds > 0) or seconds == math.huge then
		seconds = 0
	end

	local startTime = os.clock()
	local endTime = startTime + seconds
	local length = select("#", ...)

	if connection == nil then -- first is nil when connection is nil
		connection = RunService.Heartbeat:Connect(heartbeatStep)
	end

	local node = {
		callback = callback,
		startTime = startTime,
		endTime = endTime,
		args = length > 0 and { length + 1, ... }
	}

	local targetIndex = len + 1
	len = targetIndex

	while true do
		local parentIndex = (targetIndex - targetIndex % 2) / 2
		if parentIndex < 1 then break end
		local parentNode = queue[parentIndex]
		if parentNode.endTime < node.endTime then break end
		queue[targetIndex] = parentNode
		targetIndex = parentIndex
	end

	queue[targetIndex] = node
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
