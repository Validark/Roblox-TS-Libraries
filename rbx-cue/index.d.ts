/** A lightweight custom event library */
interface Cue<T = () => void, P = false> {
	/**
	 * Fires all bound functions and resumes all yielding threads
	 * @param args The arguments to pass into bound functions
	 */
	go(...args: FunctionArguments<T>): void;

	/**
	 * Yields the current thread until this event fires
	 * @returns arguments from fire
	 */
	waitFor(): FunctionArguments<T>;

	/**
	 * Runs a function on cue
	 * @param Callback The function which should be called when the event fires
	 */
	bind<O extends Array<unknown> = FunctionArguments<T>>(
		callback: P extends true ? (FunctionArguments<T> extends Array<unknown> ? (...args: O) => void : T) : T,
	): void;

	/**
	 * Unbinds a function from this event
	 * @param Callback The function which, if bound, will be unbound from the event
	 */
	unbind<O extends Array<unknown> = FunctionArguments<T>>(
		callback: P extends true ? (FunctionArguments<T> extends Array<unknown> ? (...args: O) => void : T) : T,
	): void;

	/**
	 * Unbinds all functions from this event in preparation for garbage-collection
	 */
	destroy(): void;
}

declare const Cue: new () => Cue;

export = Cue;
