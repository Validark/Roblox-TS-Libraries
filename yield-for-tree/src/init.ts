/** Evaluates a Rojo-esque tree and transforms it into an indexable type. */
export type EvaluateTree<T extends { $className: keyof Instances }> = (Instances[T["$className"]]) &
	{
		[K in Exclude<keyof T, "$className" | "$properties" | "$path">]: (T[K] extends keyof Instances
			? Instances[T[K]]
			: (T[K] extends { $className: string }
					? T[K] extends { $className: keyof Instances }
						? EvaluateTree<T[K]>
						: never
					: never))
	};

interface InstanceTreeDefinition {
	[Key: string]: keyof Instances | InstanceTree;
}

type InstanceTree = { $className: keyof Instances } & InstanceTreeDefinition;

function yieldForTreeHelper<T extends Instance, Q extends InstanceTree>(o: T, myTree: Q): Q | undefined {
	for (const child of o.GetChildren()) {
		const { Name: childName } = child;
		const className = myTree[childName] as string | InstanceTree | undefined;

		if (typeIs(className, "string")) {
			if (child.IsA(className)) {
				myTree[childName as keyof Q] = undefined!;
			}
		} else if (className) {
			const rawClassName = className.$className as keyof Instances;

			if (child.IsA(rawClassName)) {
				className.$className = undefined!;
				yieldForTreeHelper(child, className);

				if (Object.isEmpty(className)) {
					myTree[childName as keyof Q] = undefined!;
				} else {
					className.$className = rawClassName;
				}
			}
		}
	}

	return Object.isEmpty(myTree) ? undefined : myTree;
}

// I am lying about the types just for simplicity
declare function next<T extends object>(o: T, i?: true): true | undefined;

/** Yields until a given tree of objects exists within an object.
 * @param tree Must be an object tree similar to ones considered valid by Rojo.
 * Every tree must have a `$className` member, and can have any number of keys which represent
 * the name of a child instance, which should have a corresponding value which is this same kind of tree.
 * There is also a shorthand syntax available, where setting a key equal to a className is equivalent
 * to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
 */
export async function yieldForTree<T extends Instance, Q extends InstanceTree>(
	object: T,
	tree: Q,
): Promise<T & EvaluateTree<Q>> {
	let subTree: InstanceTree | undefined = yieldForTreeHelper(object, tree);

	while (subTree && next(subTree, next(subTree)) !== undefined) {
		subTree = tree;
		const [descendant] = object.DescendantAdded.Wait();
		const parents: Array<Instance> = [descendant];
		let current: Instance | undefined = descendant.Parent;

		while (current && current !== object) {
			parents.push(current);
			current = current.Parent;
		}

		const subTrees: Array<InstanceTree> = [subTree];

		for (let [i, child] of parents.entries().reverse()) {
			const currentTree = subTree![child.Name] as string | InstanceTree | undefined;

			if (i === 0) {
				if (typeIs(currentTree, "string")) {
					if (child.IsA(currentTree)) {
						subTree![child.Name] = undefined!;
						child = child.Parent!;
						subTree = subTrees.pop();
					} else break;
				} else if (currentTree === undefined || !child.IsA(currentTree.$className)) break;

				let target = subTree && subTree[child.Name];

				while (target && next(target as InstanceTree, next(target as InstanceTree)) === undefined) {
					subTree![child.Name] = undefined!;
					child = child.Parent!;
					subTree = subTrees.pop();
					target = subTree && subTree[child.Name];
				}
			} else {
				if (currentTree !== undefined && !typeIs(currentTree, "string") && child.IsA(currentTree.$className)) {
					subTrees.push(subTree!);
					subTree = currentTree;
				} else break;
			}
		}
	}

	return object as T & EvaluateTree<Q>;
}

export default yieldForTree;
