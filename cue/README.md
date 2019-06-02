# Cue
A lightweight custom event library, optimized for speed. The implementation is very straightforward, thus I recommend looking at [the source](https://github.com/Validark/Roblox-TS-Libraries/blob/master/rbx-cue/init.lua).

View the type definitions with [documentation here](https://github.com/Validark/Roblox-TS-Libraries/blob/master/rbx-cue/index.d.ts)

All functions of `Cue` could map to older `Signal` implementations.

```ts
Lua -> TS
Signal:Fire(args) -> Cue.go(args)
Signal:Connect(func) -> Cue.bind(func)
SignalConnection:Disconnect() -> Cue.unbind(func)
Signal:Destroy() -> Cue.unbindAll()
```

This implementation cuts out separate objects being returned for the purpose of disconnecting functions, and instead expects the programmer to pass in the callback they wish to `unbind`.

# Demo
```ts
// Imports the module rbx-cue as `Cue`
import Cue from "rbx-cue";

// Instantiates a new Cue:
const cue = new Cue<(bool: boolean, count: number) => void>();

// Makes a new function we are going to bind to the cue
const printArgs = (bool: boolean) => print(bool);

// Binds the printArgs function to this cue
cue.bind(printArgs);

// Runs all bound functions for this cue
cue.go(true, 5); // --> prints true

// Unbinds the printArgs function from this cue
cue.unbind(printArgs);
```
Corresponding Lua equivalent:
```lua
-- Imports the module rbx-cue as `Cue`
local Cue = require(TS.getModule("rbx-cue", script.Parent));

-- Instantiates a new Cue:
local cue = Cue.new();

-- Makes a new function we are going to bind to the cue
local printArgs = function(bool)
	return print(bool);
end;

-- Binds the printArgs function to this cue
cue:bind(printArgs);

-- Runs all bound functions for this cue
cue:go(true, 5); --> prints true

-- Unbinds the printArgs function from this cue
cue:unbind(printArgs);
```

## Rationale

This library prioritizes being extraordinarily light-weight, and reflects that.

##### Due to limitations of using coroutine.yield, this library removes any kind of `:Wait()` method which could lead to unexpected problems for the developer. Here is my source on that, from evaera:
> ###### Any C-side code that invokes user code then "waits" for the user code to yield back to the C-side code will be broken, because of the way Roblox models this idea: continuations. Continuations are essentially a set of instructions that travels along with the thread and instructs the C-functions what to do when they're done running. C-side yield functions have special machinery to pass along these continuations when they are invoked. However, `coroutine.resume` has no concept of continuations, so when you use it to resume a thread, the continuations are effectively discarded. This means that any pending jobs that were meant to run when the user thread finishes running will never actually run, thus potentially leaving those dependent threads stuck in a yielded state forever.
> ###### For an example of this behavior in action, consider the `require` function. It is a yield function and when it invokes the module thread it passes along a continuation task that asks that thread to resume the requiring script when it's done. This all happens behind the scenes and you probably wouldn't realize any of this happens, because if you have a `wait(2); return nil` in that module, it waits for two seconds and then you get `nil` back from `require` in the requiring module.
> ###### But if you instead use `coroutine.yield()` to yield the module thread and then resume it later with `coroutine.resume`, since that function has effectively discarded any pending continuations that the thread had, the `require` call from the requiring script will never return a value and that script will be stuck forever in a yielded state.
> ###### This behavior isn't just isolated to `require`, though. Any time any C-side code invokes user code and waits for it, these caveats will apply. The advantage of using `BindableEvent:Wait` is that it supports continuations, whereas the coroutine library does not.
