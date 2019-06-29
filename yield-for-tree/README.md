# yield-for-tree

Returns a yieldForTree function, which can be used like so:

## Demo

```ts
yieldForTree(game.GetService("Workspace"), {
	$className: "Workspace",

	SpawnLocation: {
		$className: "SpawnLocation",

		Decal: {
			$className: "Decal",

			Value: {
				$className: "IntValue",
				Folder: "Folder",
			},
		},
	},
} as const).then(workspace => {
	print(++workspace.SpawnLocation.Decal.Value.Value);
	const count = workspace.SpawnLocation.Decal.Value.Clone();
	count.Parent = workspace;

	// Members are preserved by the `Clone` method!
	print((count.Folder.Name = "Soup"), ++count.Value);
});
```

The first parameter must be an Instance (or extend from it). The second parameter must be an object tree similar to ones considered valid by Rojo. Every tree must have a `$className` member, and can have any number of keys which represent the name of a child instance, which should have a corresponding value which is this same kind of tree. There is also a shorthand syntax, seen above with `Folder: "Folder"`, which is equivalent to `Folder: { $className: "Folder" }`.

###### Note: Currently, the `as const` is necessary to preserve the true type of the object tree. Your code will not work if you do not use it.

This library also exports `EvaluateTree` if you want to use it for your own nefarious purposes.

###### Note: This library doesn't mutate/modify anything, it only yields until the tree is fully detected.
