/// <reference types="@rbxts/types" />

/**
 * Calls a given callback or fires a given BindableEvent after a given number of seconds.
 * @param seconds The number of seconds to wait before resolving (minimum is 0.029). NaN/Inf/-Inf all default to 0.029 as well.
 * @param callback The callback to call or the BindableEvent to `Fire()`
 * @param args The additional arguments to pass by reference into the callback. If a BindableEvent was passed as the second argument, args will be passed in by value.
 */
export declare function delay<
	T extends
		| BindableEvent<(timeElapsed: number, ...args: Array<any>) => any>
		| ((timeElapsed: number, ...args: Array<any>) => any)
>(
	seconds: number | undefined,
	callback: T,
	...args: T extends (timeElapsed: number, ...args: infer P) => any
		? P
		: T extends BindableEvent<infer J>
		? J extends (timeElapsed: number, ...args: infer P) => any
			? P
			: never
		: never
): void;

/**
 * Spawns a function on a new thread, but begins running it immediately
 * instead of being deferred. This is sometimes known as a "fast spawn".
  * @param callback The function to call. Any further arguments are passed as parameters.
 */
export declare function spawn<T extends Callback>(callback: T, ...args: Parameters<T>): void;

/**
 * Yields the current thread for a given number of seconds/
 * @param seconds The duration in seconds for how long the current thread should yield before resuming.
 */
export declare function wait(seconds?: number): number;
