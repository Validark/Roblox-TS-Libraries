# schema

A powerful tree reconciler.

## usage
```ts
import { reconcileSchema } from "@rbxts/schema";

const Workspace = game.GetService("Workspace");

reconcileSchema(
	{
		// The ClassName we expect to match (doesn't use IsA)
		$className: "Folder",

		// A check to perform on this instance to determine validity
		$check: (f) => f.Name === "myFolder",

		// A callback to be called when all candidate instances are deemed invalid,
		// destroyed (but children preserved), and a new instance is instantiated.
		// The argument passed to this callback is the newly instantiated instance
		$instantiate: (f) => {
			f.Name = "myFolder";
			f.Parent = Workspace;
		},

		// A table with the valid children of this object indexed by their name
		$children: {
			isAwesome: "BoolValue", // shorthand for { $className: "BoolValue" }

			color: {
				$className: "Color3Value",

				// If we need to create a new Color3Value for this schema, set Value to white
				// If we don't need to create a new Color3Value, this won't be called
				$instantiate: (c3) => {
					c3.Value = Color3.fromRGB(255, 255, 255);
				},
			},
		},
	},
	// If `reconcileSchema` is passed `undefined` here, it will instantiate the entire tree
	// Otherwise, it will try to reconcile the above definition with the instance passed in.
	Workspace.FindFirstChild("myFolder"),
);
```

`reconcileSchema` reconciles an InstanceSchema against an Instance, while trying to preserve child instances where possible (to save instance properties). Instances are validated by their `ClassName` property and the optional `$check` callback. Child instances are made into candidates for the aforementioned check by their `Name` being a key in the `$children` table. If multiple candidates exist, this will take the first one that matches (otherwise instantiate a new object) and re-parent the children of the other candidates before continuing to the next reconcile.
