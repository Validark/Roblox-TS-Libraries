function WaitForChildOfClass(parent, className)
	local target = parent:FindFirstChildOfClass(className);
	while target == nil do
		wait();
		target = parent:FindFirstChildOfClass(className);
	end;
	return target;
end;
