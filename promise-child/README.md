# promise-child

Promises a child appears within an Instance. Comes with 3 functions:

```ts
export declare function promiseChild(instance: Instance, childName: string | number): Promise<Instance>;

export declare function promiseChildOfClass<T extends keyof Instances>(instance: Instance, className: T): Promise<Instances[T]>;

export declare function promiseChildWhichIsA<T extends keyof Instances>(instance: Instance, className: T): Promise<Instances[T]>;
```

Pretty straightforward. The `promiseChild` function returns a promise that resolves when a given `childName` appears inside an instance. `promiseChildOfClass` looks for a given ClassName, and `promiseChildWhichIsA` looks for an instance which `IsA(class)`

Example:

```ts
import { promiseChildOfClass } from "@rbxts/promise-child";

game.GetService("Players").PlayerAdded.Connect((plr) => {
	plr.CharacterAdded.Connect(async (char) => {
		const humanoid = await promiseChildOfClass(char, "Humanoid");
		switch (humanoid.RigType.Name) {
			case "R6": {
				makeR6Ragdoll(char);
				break;
			}
			case "R15": {
				makeR15Ragdoll(char);
				break;
			}
			default:
				error("A player spawned with an unsupported RigType");
		}
	});
});

```

It will error (and will need to be caught) if its parent or one of its ancestors has its `Parent` property set to `nil` (the error will be a string).

Since it is implemented using Promises, these are cancellable requests!

```ts
const Lighting = game.GetService("Lighting");
const skyGetter = promiseChildOfClass(Lighting, "Sky");
// if skyGetter didn't already resolve at the end of 5 seconds, cancel it
const skyTimeout = Promise.delay(5).then(() => skyGetter.cancel());

const sunRaysGetter = promiseChildOfClass(Lighting, "SunRaysEffect");
sunRaysGetter.now()
	.then(() => print("We got our SunRaysEffect synchronously!"));
	.catch(() => print("We're going to have to wait for it to show up!"))
```
