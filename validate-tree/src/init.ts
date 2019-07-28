type KeyExtendsPropertyName<T extends InstanceTree, K, V> = K extends "Changed"
	? true
	: (T extends {
			$className: keyof Instances;
	  }
			? (K extends keyof Instances[T["$className"]] ? (V extends Instances[T["$className"]][K] ? V : unknown) : V)
			: V);
/** Defines a Rojo-esque tree type which defines an abstract object tree. */
export interface InstanceTree {
	$className?: keyof Instances;
	[Key: string]: keyof Instances | undefined | InstanceTree;
}

/** Evaluates a Rojo-esque tree and transforms it into an indexable type. */
export declare type EvaluateInstanceTree<T extends InstanceTree, D = Instance> = (T extends {
	$className: keyof Instances;
}
	? Instances[T["$className"]]
	: D) &
	{
		[K in Exclude<keyof T, "$className">]: KeyExtendsPropertyName<
			T,
			K,
			T[K] extends keyof Instances
				? Instances[T[K]]
				: (T[K] extends {
						$className: keyof Instances;
				  }
						? EvaluateInstanceTree<T[K]>
						: never)
		>
	};

/** Returns whether a given Instance matches a particular Rojo-eque InstanceTree. */
export function validateTree<I extends Instance, T extends InstanceTree>(
	object: I,
	tree: T,
): object is I & EvaluateInstanceTree<T, I> {
	if (!("$className" in tree) || object.IsA(tree.$className as string)) {
		const whitelistedKeys = new Set(["$className"]);

		for (const child of object.GetChildren()) {
			const childName = child.Name;
			if (childName !== "$className") {
				const className = tree[childName] as string | InstanceTree | undefined;

				if (typeIs(className, "string") ? child.IsA(className) : className && validateTree(child, className)) {
					whitelistedKeys.add(childName);
				}
			}
		}

		for (const value of Object.keys(tree)) if (!whitelistedKeys.has(value as string)) return false;
		return true;
	} else return false;
}

/** Yields until a given tree of objects exists within an object.
 * @param tree Must be an object tree similar to ones considered valid by Rojo.
 * Every tree must have a `$className` member, and can have any number of keys which represent
 * the name of a child instance, which should have a corresponding value which is this same kind of tree.
 * There is also a shorthand syntax available, where setting a key equal to a className is equivalent
 * to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
 */
export async function yieldForTree<I extends Instance, T extends InstanceTree>(
	object: I,
	tree: T,
): Promise<I & EvaluateInstanceTree<T, I>> {
	if (validateTree(object, tree)) {
		return object as I & EvaluateInstanceTree<T, I>;
	} else {
		return await new Promise((resolve, reject) => {
			const connections = new Array<RBXScriptConnection>();

			const updateTreeForDescendant = () => {
				if (validateTree(object, tree)) {
					for (const connection of connections) connection.Disconnect();
					resolve(object as I & EvaluateInstanceTree<T, I>);
				}
			};

			const processDescendant = (descendant: Instance) => {
				connections.push(descendant.GetPropertyChangedSignal("Name").Connect(updateTreeForDescendant));
			};

			for (const descendant of object.GetDescendants()) processDescendant(descendant);

			connections.push(
				object.DescendantAdded.Connect(descendant => {
					processDescendant(descendant);
					updateTreeForDescendant();
				}),
			);
		});
	}
}

/*
We should establish a spec if people want this. Submit an issue if you have an opinion.

export function instantiateTree<
	I extends Instance,
	T extends {
		$className?: {
			[K in keyof Instances]: Instances[K] extends I ? (I extends Instances[K] ? K : never) : never
		}[keyof Instances];
		[Key: string]: keyof Instances | undefined | InstanceTree;
	}
>(parent: I, tree: T): I & EvaluateInstanceTree<T> {
	for (const [name, definition] of Object.entries(tree)) {
		let className: string;

		if (typeIs(definition, "string")) {
			className = definition;
			const instance = new Instance(className);
			instance.Name = name as string;
			instance.Parent = parent;
		} else {
			const instance = new Instance((definition as InstanceTree).$className) as Instances[keyof Instances];
			instance.Name = name as string;
			instance.Parent = parent;
			instantiateTree(instance, definition as InstanceTree);
		}
	}

	return parent as I & EvaluateInstanceTree<T>;
}
*/
