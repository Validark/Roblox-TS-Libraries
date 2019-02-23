# Signal
BindableEvent wrapper. Passes arguments by reference rather than value.

```ts
const signal = new Signal();
const strings = new Array<string>();

signal.Connect((a: unknown) => print(a))

print(strings) // table: 2BC04578
signal.Fire(strings) // table: 2BC04578
```
