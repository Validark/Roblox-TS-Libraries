/**
 * Given a startValue and endValue, returns a function that,
 * when passed an alpha value, returns an interpolated value between the two.
 */
type LerpFunction<T> = (startValue: T, endValue: T) => (alpha: number) => T;

declare interface LerpFunctions {
	string: LerpFunction<string>;
	number: LerpFunction<number>;
	boolean: LerpFunction<boolean>;
	Region3: LerpFunction<Region3>;
	CFrame: LerpFunction<CFrame>;
	UDim2: LerpFunction<UDim2>;
	UDim: LerpFunction<UDim>;
	Ray: LerpFunction<Ray>;
	Rect: LerpFunction<Rect>;
	Color3: LerpFunction<Color3>;
	Vector2: LerpFunction<Vector2>;
	Vector3: LerpFunction<Vector3>;
	NumberRange: LerpFunction<NumberRange>;
	ColorSequence: LerpFunction<ColorSequence>;
	NumberSequence: LerpFunction<NumberSequence>;
	PhysicalProperties: LerpFunction<PhysicalProperties>;
	NumberSequenceKeypoint: LerpFunction<NumberSequenceKeypoint>;
}

declare const Lerps: LerpFunctions;
export = Lerps;
