A post-Signal custom event library, optimized for speed. The implementation is very straightforward, thus I recommend looking at the source.

Here is the documentation:

```ts
declare class Cue {
	/**
	 * Fires all bound functions and resumes all yielding threads
	 * @param args The arguments to pass into bound functions
	 */
	public go(...args: Array<any>): void;

	/**
	 * Yields the current thread until this event fires
	 * @returns arguments from fire
	 */
	public waitFor(): any;

	/**
	 * Runs a function on cue
	 * @param Callback The function which should be called when the event fires
	 */
	public bind(Callback: () => any): void;

	/**
	 * Unbinds a function from this event
	 * @param Callback The function which, if bound, will be unbound from the event
	 */
	public unbind(Callback: () => any): void;

	/**
	 * Unbinds all functions from this event in preparation for garbage-collection
	 */
	public destroy(): void;
}
```

These all could map to older `Signal` implementations.

```ts
Lua -> TS
Signal:Fire() -> Cue.go()
Signal:Wait() -> Cue.waitFor()
Signal:Connect() -> Cue.bind()
SignalConnection:Disconnect() -> Cue.unbind()
```

This implementation cuts out separate objects being returned for the purpose of disconnecting functions, and instead expects the programmer to pass in the callback they wish to `unbind`.

One should not that while using coroutine.resume/coroutine.yield is faster than using BindableEvents, there are limitations of using coroutine.yield.

From evaera:

> Any C-side code that invokes user code then "waits" for the user code to yield back to the C-side code will be broken, because of the way Roblox models this idea: continuations. Continuations are essentially a set of instructions that travels along with the thread and instructs the C-functions what to do when they're done running. C-side yield functions have special machinery to pass along these continuations when they are invoked. However, `coroutine.resume` has no concept of continuations, so when you use it to resume a thread, the continuations are effectively discarded. This means that any pending jobs that were meant to run when the user thread finishes running will never actually run, thus potentially leaving those dependent threads stuck in a yielded state forever.

> For an example of this behavior in action, consider the `require` function. It is a yield function and when it invokes the module thread it passes along a continuation task that asks that thread to resume the requiring script when it's done. This all happens behind the scenes and you probably wouldn't realize any of this happens, because if you have a `wait(2); return nil` in that module, it waits for two seconds and then you get `nil` back from `require` in the requiring module.

> But if you instead use `coroutine.yield()` to yield the module thread and then resume it later with `coroutine.resume`, since that function has effectively discarded any pending continuations that the thread had, the `require` call from the requiring script will never return a value and that script will be stuck forever in a yielded state.

> This behavior isn't just isolated to `require`, though. Any time any C-side code invokes user code and waits for it, these caveats will apply. The advantage of using `BindableEvent:Wait` is that it supports continuations, whereas the coroutine library does not.
