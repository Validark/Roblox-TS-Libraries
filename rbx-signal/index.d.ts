/**
 * BindableEvent wrapper which passes variables by reference instead of by value
 */
interface Signal<T = () => void, P = false> {
	/**
	 * Fires the BindableEvent with any number of arguments
	 * @param args
	 */
	Fire(...args: FunctionArguments<T>): void;

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
	 * Destroys the Signal
	 */
	Destroy(): void;
}

declare const Signal: new () => Signal;

export = Signal;
