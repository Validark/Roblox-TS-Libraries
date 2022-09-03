/**
 * BindableEvent wrapper which passes variables by reference instead of by value
 */
interface Signal<ConnectedFunctionSignature extends (...args: any) => any = () => void, Generic extends boolean = false> {
	/**
	 * Fires the BindableEvent with any number of arguments
	 * @param args The arguments to pass into the connected functions
	 */
	Fire(...args: Parameters<ConnectedFunctionSignature>): void;

	/**
	 * Establishes a function to be called when the event fires.
	 * Returns a `RBXScriptConnection` object associated with the connection.
	 * @param callback The function to connect to `BindableEvent.Event`
	 */
	 Connect<O extends Array<unknown> = Parameters<ConnectedFunctionSignature>>(
		callback: Generic extends true
			? (Parameters<ConnectedFunctionSignature> extends Array<unknown>
					? (...args: O) => void
					: ConnectedFunctionSignature)
			: ConnectedFunctionSignature,
	): RBXScriptConnection;

	/**
	 * Establishes a function to be called when the event fires.
	 * Returns a `RBXScriptConnection` object associated with the connection.
	 * When the event fires, the signal callback is executed in a desynchronized state.
	 * Using `ConnectParallel` is similar to, but more efficient than, using `Connect` followed by a call to `task.desynchronize()` in the signal handler.
	 * Note: Scripts that connect in parallel must be rooted under an Actor.
	 * @param callback The function to connect to `BindableEvent.Event`
	 */
	 ConnectParallel<O extends Array<unknown> = Parameters<ConnectedFunctionSignature>>(
		callback: Generic extends true
			? (Parameters<ConnectedFunctionSignature> extends Array<unknown>
					? (...args: O) => void
					: ConnectedFunctionSignature)
			: ConnectedFunctionSignature,
	): RBXScriptConnection;

	/**
	 * Establishes a function to be called when the event fires.
	 * Returns a `RBXScriptConnection` object associated with the connection.
	 * The behavior of `Once` is similar to `Connect`.
	 * However, instead of allowing multiple events to be received by the specified function, only the first event will be delivered.
	 * Using `Once` also ensures that the connection to the function will be automatically disconnected prior the function being called.
	 * @param callback The function to connect to `BindableEvent.Event`
	 */
	Once<O extends Array<unknown> = Parameters<ConnectedFunctionSignature>>(
		callback: Generic extends true
			? (Parameters<ConnectedFunctionSignature> extends Array<unknown>
					? (...args: O) => void
					: ConnectedFunctionSignature)
			: ConnectedFunctionSignature,
	): RBXScriptConnection;

	/**
	 * Yields the current thread until the thread is fired.
	 */
	Wait(): LuaTuple<Parameters<ConnectedFunctionSignature>>;

	/**
	 * Destroys the Signal
	 */
	Destroy(): void;
}

declare const Signal: new <ConnectedFunctionSignature extends (...args: any) => any = () => void, Generic extends boolean = false>() => Signal<
	ConnectedFunctionSignature,
	Generic
>;

export = Signal;
