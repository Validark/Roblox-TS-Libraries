# Lerps

Has some lerp functions that look like this:

```ts
/**
 * Given a startValue and endValue, returns a function that,
 * when passed an alpha value, returns an interpolated value between the two.
 */
type LerpFunction<T> = (startValue: T, endValue: T) => (alpha: number) => T;
```

These are the types:

```
string
number
boolean
Region3
CFrame
UDim2
UDim
Ray
Rect
Color3
Vector2
Vector3
NumberRange
ColorSequence
NumberSequence
PhysicalProperties
NumberSequenceKeypoint
```

The string lerp function is only for Lighting's TimeOfDay property, although probably shouldn't be.
