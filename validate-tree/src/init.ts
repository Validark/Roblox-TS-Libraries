type KeyExtendsPropertyName<T extends InstanceTree, K, V> = K extends "Changed"
	? true
	: (T extends {
			$className: keyof Instances;
	  }
			? (K extends keyof Instances[T["$className"]] ? unknown : V)
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
	violators?: Array<string>,
): object is I & EvaluateInstanceTree<T, I> {
	if (!("$className" in tree) || object.IsA(tree.$className as string) || violators) {
		const whitelistedKeys = new Set(["$className"]);

		function getChild(object: I, search: string): Instance | undefined {
			if ((object as Instance) === game) {
				return game.GetService(search);
			} else {
				return object.FindFirstChild(search);
			}
		}

		for (const [className, childClass] of tree as unknown as Map<string, string | InstanceTree>) {
			if (className !== "$className") {
				const child = getChild(object, className);
				if (!child) {
					// Tree invalid, early quit
					return false;
				}

				if (
					typeIs(childClass, "string")
						? child.IsA(childClass)
						: className && validateTree(child, childClass, violators)
				) {
					whitelistedKeys.add(className);
				}
			}
		}

		let matches = true;

		for (const value of Object.keys(tree)) {
			if (!whitelistedKeys.has(value as string)) {
				if (violators) {
					const fullName = object.GetFullName();
					violators.push(fullName + "." + value);
					matches = false;
				} else return false;
			}
		}

		return matches;
	} else {
		return false;
	}
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
			let resolved = false;
			const connections = new Array<RBXScriptConnection>();

			const updateTreeForDescendant = () => {
				if (!resolved && validateTree(object, tree)) {
					resolved = true;
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

			delay(5, () => {
				if (!resolved) {
					const violators = new Array<string>();
					if (validateTree(object, tree, violators)) {
						resolved = true;
						for (const connection of connections) connection.Disconnect();
						resolve(object as I & EvaluateInstanceTree<T, I>);
					} else {
						warn(`[yieldForTree] Infinite yield possible. Waiting for: ${violators.join(", ")}`);
					}
				}
			});
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
