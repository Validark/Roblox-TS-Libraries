/** Defines a Rojo-esque tree type which defines an abstract object tree. */
export interface InstanceTree {
	$className?: keyof Instances;
	[Key: string]: keyof Instances | undefined | InstanceTree;
}

type MoreSpecificType<U, D> = U extends D ? U : D extends U ? D : U & D;
type AllKeys<T> = T extends any ? keyof T : never;

/** Evaluates a Rojo-esque tree and transforms it into an indexable type. */
export declare type EvaluateInstanceTree<T, D = Instance> =
	(T extends { $className: keyof Instances } ? Instances[T["$className"]] : D) extends infer U
		? MoreSpecificType<U, D> & {
			[K in Exclude<keyof T, "$className" | AllKeys<MoreSpecificType<U, D>>>]:
				T[K] extends keyof Instances ? Instances[T[K]] : EvaluateInstanceTree<T[K]>
			}
		: never;

function getService(serviceName: string) {
	return game.GetService(serviceName as keyof Services);
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
): object is EvaluateInstanceTree<T, I> {
	if ("$className" in tree && !object.IsA(tree.$className!)) return false;
	let matches = true;

	if (classIs(object, "DataModel")) {
		for (const [serviceName, classOrTree] of (tree as unknown as Map<string, keyof Instances | InstanceTree>)) {
			if (serviceName !== "$className") {
				const [success, value] = pcall(getService, serviceName);

				if (!success) {
					if (violators !== undefined) violators.push(`game.GetService("${serviceName}")`);
					return false;
				}

				if (value && (typeIs(classOrTree, "string") || validateTree(value, classOrTree, violators))) {
					if (value.Name !== serviceName) value.Name = serviceName;
				} else {
					if (violators === undefined) return false;
					matches = false;
					violators.push(`game.GetService("${serviceName}")`);
				}
			}
		}
	} else {
		const whitelistedKeys = new Set(["$className"]);

		for (const child of object.GetChildren()) {
			const childName = child.Name;
			if (childName !== "$className") {
				const classOrTree = tree[childName];

				if (typeIs(classOrTree, "string") ? child.IsA(classOrTree) : classOrTree && validateTree(child, classOrTree, violators))
					whitelistedKeys.add(childName);
			}
		}

		for (const [key] of (tree as unknown as Map<string, keyof Instances | InstanceTree>)) {
			if (!whitelistedKeys.has(key)) {
				if (violators === undefined) return false;
				matches = false;
				violators.push(object.GetFullName() + "." + key);
			}
		}
	}

	return matches;
}

/** Promises a given tree of objects exists within an object.
 * @param tree Must be an object tree similar to ones considered valid by Rojo.
 * Every tree must have a `$className` member, and can have any number of keys which represent
 * the name of a child instance, which should have a corresponding value which is this same kind of tree.
 * There is also a shorthand syntax available, where setting a key equal to a className is equivalent
 * to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
 */
export function promiseTree<I extends Instance, T extends InstanceTree>(
	object: I,
	tree: T,
): Promise<EvaluateInstanceTree<T, I>> {
	if (validateTree(object, tree)) {
		return Promise.resolve(object as I & EvaluateInstanceTree<T, I>);
	}

	const connections = new Array<RBXScriptConnection>()
	const warner = Promise.delay(5)

	warner.then(() => {
		const violators = new Array<string>()
		if (!validateTree(object, tree, violators))
			warn(`[promiseTree] Infinite wait possible. Waiting for: ${violators.join(", ")}`)
	})

	const promise = new Promise<I & EvaluateInstanceTree<T, I>>((resolve) => {
		function updateTree(violators?: Array<string>) {
			if (validateTree(object, tree, violators))
				resolve(object as I & EvaluateInstanceTree<T, I>)
		}

		for (const d of object.GetDescendants())
			connections.push(d.GetPropertyChangedSignal("Name").Connect(updateTree))

		connections.push(
			object.DescendantAdded.Connect(descendant => {
				connections.push(descendant.GetPropertyChangedSignal("Name").Connect(updateTree))
				updateTree()
			}),
		)
	})

	promise.finally(() => {
		for (const connection of connections) connection.Disconnect()
		warner.cancel()
	})

	return promise
}
