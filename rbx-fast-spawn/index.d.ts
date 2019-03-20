/**
 * Runs a function on a new thread without yielding a frame (like spawn) and works within Roblox's thread scheduler.
 * If passed arguments, they will be passed by reference.
 *
 * Internally, FastSpawn fires a BindableEvent and runs the given function with its given arguments
 * on the thread Roblox creates for the BindableEvent's connected function.
 * @param callback The function to spawn on a new thread
 * @param args The arguments to pass into the function
 */
declare function FastSpawn<T>(callback: T, ...args: FunctionArguments<T>): void;

export = FastSpawn;
