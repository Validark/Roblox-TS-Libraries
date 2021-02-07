# yield-for-child-of-class

Yield until a child of a given className appears within an Instance.

```ts
// (the generic constraint is simplified slightly)
export declare function yieldForChildOfClass<T extends keyof Instances>(instance: Instance, className: T): Promise<Instances[T]>;
```

Pretty straightforward.

Example:

```ts
import { yieldForChildOfClass } from "@rbxts/yield-for-child-of-class";

game.GetService("Players").PlayerAdded.Connect((plr) => {
	plr.CharacterAdded.Connect(async (char) => {
		const humanoid = await yieldForChildOfClass(char, "Humanoid");
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
const skyGetter = yieldForChildOfClass(Lighting, "Sky");
// if skyGetter doesn't resolve within 5 seconds, cancel it
const skyTimeout = Promise.delay(5).then(() => skyGetter.cancel());

const sunRaysGetter = yieldForChildOfClass(Lighting, "SunRaysEffect");
sunRaysGetter.now().then(() => print("We got our SunRaysEffect synchronously!"));
Promise.race<SunRaysEffect | void>([sunRaysGetter, skyTimeout]);
```
