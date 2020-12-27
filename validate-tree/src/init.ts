type KeyExtendsPropertyName<T extends InstanceTree, K, V> = K extends "Changed"
	? true
	: T extends {
			$className: keyof Instances;
	  }
	? K extends keyof Instances[T["$className"]]
		? unknown
		: V
	: V;

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
				: T[K] extends InstanceTree
				? EvaluateInstanceTree<T[K]>
				: never
		>;
	};

function getService(serviceName: string) {
	// @ts-expect-error
	return game.GetService(serviceName);
}

/** Returns whether a given Instance matches a particular Rojo-esque InstanceTree.
 * @param object The object which needs validation
 * @param tree The tree to validate
 * @param violators
 */
export function validateTree<I extends Instance, T extends InstanceTree>(
	object: I,
	tree: T,
	violators?: Array<string>,
): object is I & EvaluateInstanceTree<T, I>;

export function validateTree<T extends InstanceTree>(object: Instance, tree: T, violators?: Array<string>) {
	if ("$className" in tree && !object.IsA(tree.$className!)) return false;
	let matches = true;

	if (classIs(object, "DataModel")) {
		for (const [serviceName, classOrTree] of pairs(tree as unknown as Map<string, keyof Instances | InstanceTree>)) {
			if (serviceName !== "$className") {
				const result = pcall(getService, serviceName);

				if (!result[0]) {
					if (violators) {
						matches = false;
						violators.push(`game.GetService("${serviceName}")`);
					}
					return false;
				}

				const [, value] = result;

				if (value && (typeIs(classOrTree, "string") || validateTree(value, classOrTree, violators))) {
					if (value.Name !== serviceName) value.Name = serviceName;
				} else {
					if (violators) {
						matches = false;
						violators.push(`game.GetService("${serviceName}")`);
					} else return false;
				}
			}
		}
	} else {
		const whitelistedKeys = new Set(["$className"]);

		for (const child of object.GetChildren()) {
			const childName = child.Name;
			if (childName !== "$className") {
				const classOrTree = tree[childName];

				if (
					typeIs(classOrTree, "string")
						? child.IsA(classOrTree)
						: classOrTree && validateTree(child, classOrTree, violators)
				) {
					whitelistedKeys.add(childName);
				}
			}
		}

		for (const [key] of pairs(tree as unknown as Map<string, keyof Instances | InstanceTree>)) {
			if (!whitelistedKeys.has(key)) {
				if (violators) {
					matches = false;
					violators.push(object.GetFullName() + "." + key);
				} else return false;
			}
		}
	}

	return matches;
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
		return await new Promise((resolve, _, onCancel) => {
			const connections = new Array<RBXScriptConnection>();
			const warner = Promise.delay(5)

			function cleanup() {
				for (const connection of connections) connection.Disconnect();
				warner.cancel();
			}

			onCancel(cleanup)

			function updateTreeForDescendant(violators?: Array<string>) {
				if (validateTree(object, tree, violators)) {
					cleanup()
					resolve(object as I & EvaluateInstanceTree<T, I>);
					return true;
				}
			};

			for (const descendant of object.GetDescendants())
				connections.push(descendant.GetPropertyChangedSignal("Name").Connect(updateTreeForDescendant));

			connections.push(
				object.DescendantAdded.Connect(descendant => {
					connections.push(descendant.GetPropertyChangedSignal("Name").Connect(updateTreeForDescendant));
					updateTreeForDescendant();
				}),
			);

			warner.then(() => {
				const violators = new Array<string>();
				if (!updateTreeForDescendant(violators))
					warn(`[yieldForTree] Infinite yield possible. Waiting for: ${violators.join(", ")}`);
			})
		});
	}
}
