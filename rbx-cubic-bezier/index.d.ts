/**
 * Returns a value between [initialValue, initialValue + changeInValue] or [0, 1] that represents an in-between value
 * along a Bezier curve.
 * @param elapsedTime the time elapsed [0, d]
 * @param initialValue beginning value being interpolated (default = 0)
 * @param changeInValue change in value being interpolated (equivalent to: ending - beginning) (default = 1)
 * @param totalDuration duration interpolation is occurring over (default = 1)
 */
type Bezier = (elapsedTime: number, initialValue?: number, changeInValue?: number, totalDuration?: number) => number;

interface BezierConstructor {

	/**
	 * Creates a new cubic bezier function
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 */
	new(x1: number, y1: number, x2: number, y2: number): Bezier;
}

declare const BezierFactory: BezierConstructor;

export = BezierFactory;
