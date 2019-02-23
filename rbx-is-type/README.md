# is-type

This library comes with two functions:

```ts
interface IsACheckableTypes extends CheckableTypes, Instances {}

/**
 * Matches a given value to a given string type.
 * @param type A string which will match to a typeof call, or will match an Object's ClassName
 * @param value The value to match to a given type
 */
export declare function is<T extends keyof IsACheckableTypes>(type: T, value: any): value is IsACheckableTypes[T];

/**
 * Matches a given value to a given string type.
 * @param type A string which will match to a typeof call, or will match an Object:IsA(type) call
 * @param value The value to match to a given type
 */
export declare function isA<T extends keyof IsACheckableTypes>(type: T, value: any): value is IsACheckableTypes[T];
```

The implementations are pretty obvious:

```lua
is = function(typeStr, obj)
	local objType = typeof(obj);
	return objType == typeStr or objType == "Instance" and obj.ClassName == typeStr;
end;

isA = function(typeStr, obj)
	local objType = typeof(obj);
	return objType == typeStr or objType == "Instance" and obj:IsA(typeStr);
end;
```

These are very useful for type narrowing:

```ts
function Get(data: unknown) {
	if (is("number", data)) {
		// data is a number
	} else if (is("RemoteEvent", data)) {
		// data is a RemoteEvent
	} else if (isA("BasePart", data)) {
		// data is a BasePart
	}
}
```
