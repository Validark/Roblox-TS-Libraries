# Signal
BindableEvent wrapper. Passes arguments by reference rather than value.

```ts
import Signal from "@rbxts/signal";

const signal = new Signal<(tab: Array<string>) => void>();
const strings = new Array<string>();

signal.Connect(a => print(a))

print(strings) // table: 2BC04578
signal.Fire(strings) // table: 2BC04578
```

Corresponding Lua equivalent:

```lua
local Signal = require(TS.getModule("signal", script.Parent));
local signal = Signal.new();
local strings = {};
signal:Connect(function(a)
	return print(a);
end);
print(strings);
signal:Fire(strings);
```
