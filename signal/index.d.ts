/**
 * BindableEvent wrapper which passes variables by reference instead of by value
 */
interface Signal<ConnectedFunctionSignature = () => void, Generic = false> {
	/**
	 * Fires the BindableEvent with any number of arguments
	 * @param args The arguments to pass into the connected functions
	 */
	Fire(...args: FunctionArguments<ConnectedFunctionSignature>): void;

	/**
	 * Connects a callback to BindableEvent.Event
	 * @param callback The function to connect to BindableEvent.Event
	 */
	Connect<O extends Array<unknown> = FunctionArguments<ConnectedFunctionSignature>>(
		callback: Generic extends true
			? (FunctionArguments<ConnectedFunctionSignature> extends Array<unknown>
					? (...args: O) => void
					: ConnectedFunctionSignature)
			: ConnectedFunctionSignature,
	): RBXScriptConnection;

	/**
	 * Yields the current thread until the thread is fired.
	 */
	Wait(): LuaTuple<FunctionArguments<ConnectedFunctionSignature>>;

	/**
	 * Destroys the Signal
	 */
	Destroy(): void;
}

declare const Signal: new <ConnectedFunctionSignature = () => void, Generic = false>() => Signal<
	ConnectedFunctionSignature,
	Generic
>;

export = Signal;
