# ObjectStack

A Stack data structure which is formed by creating a singly linked-list on already existing objects. All you need to do is add a `previousNode?: T` field to your object you wish to use in the Stack.

See the [index.d.ts file](https://github.com/Validark/Roblox-TS-Libraries/blob/master/object-stack/init.d.ts) for documentation on each member and method.

Demo:

```ts
import ObjectStack from "rbx-object-stack";

interface Token {
	type: "a" | "b" | "c";
	previousNode?: Token;
}

const objectStack = new ObjectStack<Token>();

objectStack.push({ type: "b" });
objectStack.push({ type: "a" });
objectStack.push({ type: "c" });

objectStack.pop(); // { type: "c" }
objectStack.isEmpty(); // false

// iterates through the stack, from top to bottom
for (let token = objectStack.top; token; token = token.previousNode) {
	const x = token.type;
}
```
