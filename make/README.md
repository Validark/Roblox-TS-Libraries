# Make

A library providing sugar for declaring Instances. Mostly self-explanatory.

Usage:

Just pass in the ClassName of the Instance you want `Make` to generate with an object containing the properties it should have.

```ts
import Make from "make";

Make("Frame", {
	Active: false,
	Children: [
		Make("ImageLabel", {
			Image: "",
			BackgroundTransparency: 0,
			ImageTransparency: 0.5,
			Children: [Make("ImageButton", {})],
		}),
		Make("ImageButton", {
			MouseButton1Down: (x: number, y: number) => {
				print(x, y);
			},
		}),
	],
});
```

Additional Implementation details:

- `Children` is a whitelisted member. It expects an array of Instances to be parented to the generated instance.
- Setting an event member, e.g. `MouseButton1Down` in the above example, will `Connect` the expected callback to the event.

###### Note: The `Parent` property is always set last. This avoids ordering bugs/inefficiency
