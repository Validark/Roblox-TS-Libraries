/**
 * Returns a value between [initialValue, initialValue + changeInValue] or [0, 1] that represents an in-between value
 * along a Bezier curve.
 * @param elapsedTime the time elapsed [0, d]
 * @param initialValue beginning value being interpolated (default = 0)
 * @param changeInValue change in value being interpolated (equivalent to: ending - beginning) (default = 1)
 * @param totalDuration duration interpolation is occurring over (default = 1)
 */
type BezierEasingFunction = (
	elapsedTime: number,
	initialValue?: number,
	changeInValue?: number,
	totalDuration?: number,
) => number;

/*
  "bundledDependencies": [],
  "dependencies": {
	  "rbx-cubic-bezier": "^0.0.0"
  }
 */

/**
 * Returns a value between [initialValue, initialValue + changeInValue] or [0, 1] that represents an in-between value
 * along a Bezier curve.
 * @param elapsedTime the time elapsed [0, d]
 * @param initialValue beginning value being interpolated (default = 0)
 * @param changeInValue change in value being interpolated (equivalent to: ending - beginning) (default = 1)
 * @param totalDuration duration interpolation is occurring over (default = 1)
 */
type BasicEasingFunction = (
	elapsedTime: number,
	initialValue: number,
	changeInValue: number,
	totalDuration: number,
) => number;

/**
 * Returns a value between [initialValue, initialValue + changeInValue] or [0, 1] that represents an in-between value
 * along a Bezier curve.
 * @param elapsedTime the time elapsed [0, d]
 * @param initialValue beginning value being interpolated (default = 0)
 * @param changeInValue change in value being interpolated (equivalent to: ending - beginning) (default = 1)
 * @param totalDuration duration interpolation is occurring over (default = 1)
 * @param amplitude The amplitude of the curve
 * @param period The period of the curve
 */
type PeriodicEasingFunction = (
	elapsedTime: number,
	initialValue: number,
	changeInValue: number,
	totalDuration: number,
	amplitude: number,
	period: number,
) => number;

/**
 * Returns a value between [initialValue, initialValue + changeInValue] or [0, 1] that represents an in-between value
 * along a Bezier curve.
 * @param elapsedTime the time elapsed [0, d]
 * @param initialValue beginning value being interpolated (default = 0)
 * @param changeInValue change in value being interpolated (equivalent to: ending - beginning) (default = 1)
 * @param totalDuration duration interpolation is occurring over (default = 1)
 * @param overshoot The overshoot of the curve
 */
type OvershootEasingFunction = (
	elapsedTime: number,
	initialValue: number,
	changeInValue: number,
	totalDuration: number,
	overshoot: number,
) => number;

export const Sharp: BezierEasingFunction;
export const Standard: BezierEasingFunction;
export const Acceleration: BezierEasingFunction;
export const Deceleration: BezierEasingFunction;

export const Linear: BasicEasingFunction;
export const Smooth: BasicEasingFunction;
export const Smoother: BasicEasingFunction;
export const RevBack: BasicEasingFunction;
export const RidiculousWiggle: BasicEasingFunction;
export const Spring: BasicEasingFunction;
export const SoftSpring: BasicEasingFunction;
export const InQuad: BasicEasingFunction;
export const OutQuad: BasicEasingFunction;
export const InOutQuad: BasicEasingFunction;
export const OutInQuad: BasicEasingFunction;
export const InCubic: BasicEasingFunction;
export const OutCubic: BasicEasingFunction;
export const InOutCubic: BasicEasingFunction;
export const OutInCubic: BasicEasingFunction;
export const InQuart: BasicEasingFunction;
export const OutQuart: BasicEasingFunction;
export const InOutQuart: BasicEasingFunction;
export const OutInQuart: BasicEasingFunction;
export const InQuint: BasicEasingFunction;
export const OutQuint: BasicEasingFunction;
export const InOutQuint: BasicEasingFunction;
export const OutInQuint: BasicEasingFunction;
export const InSine: BasicEasingFunction;
export const OutSine: BasicEasingFunction;
export const InOutSine: BasicEasingFunction;
export const OutInSine: BasicEasingFunction;
export const InExpo: BasicEasingFunction;
export const OutExpo: BasicEasingFunction;
export const InOutExpo: BasicEasingFunction;
export const OutInExpo: BasicEasingFunction;
export const InCirc: BasicEasingFunction;
export const OutCirc: BasicEasingFunction;
export const InOutCirc: BasicEasingFunction;
export const OutInCirc: BasicEasingFunction;
export const OutBounce: BasicEasingFunction;
export const InBounce: BasicEasingFunction;
export const InOutBounce: BasicEasingFunction;
export const OutInBounce: BasicEasingFunction;

export const OutElastic: PeriodicEasingFunction;
export const InElastic: PeriodicEasingFunction;
export const InOutElastic: PeriodicEasingFunction;
export const OutInElastic: PeriodicEasingFunction;

export const InBack: OvershootEasingFunction;
export const OutBack: OvershootEasingFunction;
export const InOutBack: OvershootEasingFunction;
export const OutInBack: OvershootEasingFunction;
