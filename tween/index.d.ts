import Bezier from "@rbxts/cubic-bezier";
import { BasicEasingFunction, OvershootEasingFunction, PeriodicEasingFunction } from "@rbxts/easing-functions";

type LerpFunctions =
	| string
	| number
	| boolean
	| Region3
	| CFrame
	| UDim2
	| UDim
	| Ray
	| Rect
	| Color3
	| Vector2
	| Vector3
	| NumberRange
	| ColorSequence
	| NumberSequence
	| PhysicalProperties
	| NumberSequenceKeypoint;

/**
 * A Tween Object
 */
export interface PseudoTween {
	/**
	 * Whether the Tween is currently interpolating
	 */
	readonly Running: boolean;

	/**
	 * How much time has elapsed on the Tween
	 */
	readonly ElapsedTime: number;

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
export declare function Tween(
	totalDuration: number,
	easingFunction: BasicEasingFunction | Bezier | PeriodicEasingFunction,
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
export declare function Tween<T extends LerpFunctions>(
	totalDuration: number,
	easingFunction: BasicEasingFunction | Bezier | PeriodicEasingFunction,
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
export declare function Tween<T extends LerpFunctions>(
	totalDuration: number,
	easingFunction: PeriodicEasingFunction,
	callback: (delta: T) => void,
	initialValue: T,
	endValue: T,
	amplitude: number,
	period: number,
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
export declare function Tween<T extends LerpFunctions>(
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
export declare function Tween<T extends LerpFunctions = number>(
	totalDuration: number,
	easingFunction: (delta: T) => void,
	callback: (delta: T) => void,
	initialValue?: T,
	endValue?: T,
	extraValue1?: any,
	extraValue2?: any,
): PseudoTween;

export default Tween;
