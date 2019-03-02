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

type LerpableTypes =
	| number
	| Region3
	| CFrame
	| UDim2
	| UDim
	| boolean
	| PhysicalProperties
	| NumberSequence
	| string
	| Ray
	| Rect
	| Color3
	| Vector2
	| ColorSequence
	| Vector3
	| NumberSequenceKeypoint
	| NumberRange;

/**
 * A Tween Object
 */
interface PseudoTween {
	/**
	 * The Play function starts the playback of its Tween.
	 * Note: if a tween has already begun calling Play,
	 * this will have no effect unless the tween has finished or has been stopped
	 * (either by this.Cancel() or this.Pause()).
	 */
	Resume(): this;

	/**
	 * The Pause function halts playback of its Tween.
	 * If TweenBase/Resume is called again the tween will resume playback from the moment it was paused.
	 */
	Pause(): this;

	/**
	 * The Cancel function halts playback of its Tween and resets the tween variables.
	 * If TweenBase:Play is called again the Tween's properties will resume interpolating towards their destination but,
	 * as the tween variables have been reset, take the full length of the animation to do so.
	 */
	Cancel(): this;

	/**
	 * Yields the current thread until the Tween has completed.
	 */
	Wait(): this;
}

/**
 * Creates a Tween along a curve, with a callback to call each tick.
 * Connects an interpolation function to RunService.Heartbeat.
 * @param easingFunction The easingFunction to call each tick
 * @param callback The function to call each tick
 */
declare function Tween(
	totalDuration: number,
	easingFunction: BasicEasingFunction | BezierEasingFunction | PeriodicEasingFunction,
	callback: (delta: number) => void,
): PseudoTween;

/**
 * Creates a Tween along a curve, with a callback to call each tick.
 * Connects an interpolation function to RunService.RenderStepped if initialValue is a CFrame,
 * else RunService.Heartbeat.
 * @param totalDuration The total duration of the Tween
 * @param easingFunction The easingFunction to call each tick
 * @param callback The function to call each tick
 * @param initialValue The starting value to interpolate to push into the callback function each tick.
 * @param endValue The target value the initialValue should reach.
 */
declare function Tween<T extends LerpableTypes>(
	totalDuration: number,
	easingFunction: BezierEasingFunction,
	callback: (delta: T) => void,
	initialValue: T,
	endValue: T,
): PseudoTween;

/**
 * Creates a Tween along a curve, with a callback to call each tick.
 * Connects an interpolation function to RunService.RenderStepped if initialValue is a CFrame,
 * else RunService.Heartbeat.
 * @param totalDuration The total duration of the Tween
 * @param easingFunction The easingFunction to call each tick
 * @param callback The function to call each tick
 * @param initialValue The starting value to interpolate to push into the callback function each tick.
 * @param endValue The target value the initialValue should reach.
 * @param amplitude The amplitude of the curve
 * @param period The period of the curve
 */
declare function Tween<T extends LerpableTypes>(
	totalDuration: number,
	easingFunction: PeriodicEasingFunction,
	callback: (delta: T) => void,
	initialValue: T,
	endValue: T,
	amplitude?: number,
	period?: number,
): PseudoTween;

/**
 * Creates a Tween along a curve, with a callback to call each tick.
 * Connects an interpolation function to RunService.RenderStepped if initialValue is a CFrame,
 * else RunService.Heartbeat.
 * @param totalDuration The total duration of the Tween
 * @param easingFunction The easingFunction to call each tick
 * @param callback The function to call each tick
 * @param initialValue The starting value to interpolate to push into the callback function each tick.
 * @param endValue The target value the initialValue should reach.
 * @param overstep The overstep of the curve
 */
declare function Tween<T extends LerpableTypes>(
	totalDuration: number,
	easingFunction: OvershootEasingFunction,
	callback: (delta: T) => void,
	initialValue: T,
	endValue: T,
	overstep: number,
): PseudoTween;

/**
 * Creates a Tween along a curve, with a callback to call each tick.
 * Connects an interpolation function to RunService.RenderStepped if initialValue is a CFrame,
 * else RunService.Heartbeat.
 * @param totalDuration The total duration of the Tween
 * @param easingFunction The easingFunction to call each tick
 * @param callback The function to call each tick
 * @param initialValue The starting value to interpolate to push into the callback function each tick. default=0
 * @param endValue The target value the initialValue should reach. default=1
 * @param extraValue1 An extra value to be passed into the easingFunction
 * @param extraValue2 An extra value to be passed into the easingFunction
 */
declare function Tween<Q, T extends LerpableTypes = number>(
	totalDuration: number,
	easingFunction: Q,
	callback: (delta: T) => void,
	initialValue?: T,
	endValue?: T,
	extraValue1?: any,
	extraValue2?: any,
): PseudoTween;

export = Tween;
