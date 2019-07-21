# validate-tree

Validates a rojo-esque tree definition, like so:

## Demo

```ts
const projectTree = {
	$className: "Folder",
	NumItems: {
		$className: "IntValue",
		Data: "Folder", // This is a shorthand for { $className: "Folder" }
	},
} as const;

function g(o: EvaluateInstanceTree<typeof projectTree>) {
	return o.NumItems.Value++;
}

function f(o: Instance) {
	if (validateTree(o, projectTree)) {
		print(o.NumItems.Data.GetFullName()); // good
		g(o); // good!
	}
	o.NumItems.Data.GetFullName(); // error!
	g(o); // error!
}
```

The first parameter must be an Instance (or extend from it). The second parameter must be an object tree similar to ones considered valid by Rojo. Every tree must have a `$className` member, and can have any number of keys which represent the name of a child instance, which should have a corresponding value which is this same kind of tree. There is also a shorthand syntax, seen above with `Folder: "Folder"`, which is equivalent to `Folder: { $className: "Folder" }`.

###### Note: Currently, the `as const` may be necessary to preserve the true type of the object tree. Your types will not work if you do not use the tree object in-line or declare it with `as const` after it.

This library also exports `EvaluateInstanceTree` if you want to use it for your own nefarious purposes.

Also see [yield-for-tree](https://www.npmjs.com/package/@rbxts/yield-for-tree)
