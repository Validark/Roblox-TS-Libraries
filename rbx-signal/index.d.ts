/**
 * BindableEvent wrapper which passes variables by reference instead of by value
 */
interface Signal<T = () => void, P = false> {
	/**
	 * Connects a callback to BindableEvent.Event
	 * @param callback The callback to connect to BindableEvent.Event
	 */
	Connect<O extends Array<unknown> = FunctionArguments<T>>(
		callback: P extends true ? (FunctionArguments<T> extends Array<unknown> ? (...args: O) => void : T) : T,
	): RBXScriptConnection;

	/**
	 * Yields the current thread until the thread is fired.
	 */
	Wait(): FunctionArguments<T>;

	/**
	 * Fires the BindableEvent with any number of arguments
	 * @param arguments
	 */
	Fire(...arguments: Array<unknown>): void;

	/**
	 * Destroys the Signal
	 */
	Destroy(): void;
}

interface SignalConstructor {
	new (): Signal;
}

declare const Signal: SignalConstructor;

export = Signal;
