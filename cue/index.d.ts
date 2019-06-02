/** A lightweight custom event library */
interface Cue<BoundFunctionSignature = () => void, Generic = false> {
	/**
	 * Gives a cue to fire all bound functions.
	 * @param args The arguments to pass into bound functions
	 */
	go(...args: FunctionArguments<BoundFunctionSignature>): void;

	/**
	 * Binds a function to be run on cue.
	 * @param callback The function which should be called when the event fires
	 */
	bind<O extends Array<unknown> = FunctionArguments<BoundFunctionSignature>>(
		callback?: Generic extends true
			? (FunctionArguments<BoundFunctionSignature> extends Array<unknown>
					? (...args: O) => void
					: BoundFunctionSignature)
			: BoundFunctionSignature,
	): void;

	/**
	 * Unbinds a function from being run on cue.
	 * @param callback The function which, if bound, will be unbound from the event
	 */
	unbind<O extends Array<unknown> = FunctionArguments<BoundFunctionSignature>>(
		callback?: Generic extends true
			? (FunctionArguments<BoundFunctionSignature> extends Array<unknown>
					? (...args: O) => void
					: BoundFunctionSignature)
			: BoundFunctionSignature,
	): void;

	/**
	 * Unbinds all functions from this event, especially in preparation for garbage-collection.
	 */
	unbindAll(): void;
}

declare const Cue: new <BoundFunctionSignature = () => void, Generic = false>() => Cue<BoundFunctionSignature, Generic>;
export = Cue;
