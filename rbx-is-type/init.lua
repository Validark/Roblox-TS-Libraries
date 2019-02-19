local _exports = {
	is = function(typeStr, obj)
		local objType = typeof(obj);
		return objType == typeStr or objType == "Instance" and obj.ClassName == typeStr;
	end;

	isA = function(typeStr, obj)
		local objType = typeof(obj);
		return objType == typeStr or objType == "Instance" and obj:IsA(typeStr);
	end;
}

_exports._default = _exports.is;

return _exports;
