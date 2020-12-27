/// <reference types="@rbxts/types" />
export type InstanceSchema = {
	[K in keyof CreatableInstances]: {
		/** The name of an instances ClassName. Matched via IsA() */
		$className: K;

		/** An optional condition which instances must pass in order to validate. No yielding or errors (unless you want the error to cancel the check) */
		$check?: (instance: CreatableInstances[K]) => boolean | undefined;

		/** All the children inside this object. */
		$children?: { [K: string]: keyof CreatableInstances | InstanceSchema | undefined };

		/** Called when reconciling a schema and instantiating this instance */
		$instantiate?: (instance: CreatableInstances[K]) => void;

		/** If true, won't delete unknown instances. */
		// $ignoreUnknownInstances?: boolean;
		// TODO: add this functionality
	};
}[keyof CreatableInstances];

/** A generic version of InstanceSchema which is easier to work with internally.
 * Specifically, $check and $instantiate take `Instance` as a parameter, instead of `never`
 * (`never` is derived from the intersection of all CreatableInstances, but we don't want that)
 */
interface GenericInstanceSchema {
	/** The name of an instances ClassName. Matched via IsA() */
	$className: keyof CreatableInstances;

	/** An optional condition which instances must pass in order to validate. No yielding or errors (unless you want the error to cancel the check) */
	$check?: (instance: Instance) => boolean | undefined;

	/** All the children inside this object. */
	$children?: { [K: string]: keyof CreatableInstances | InstanceSchema | undefined };

	/** Called when reconciling a schema and instantiating this instance */
	$instantiate?: (instance: Instance) => void;

	/** If true, won't delete unknown instances. */
	// $ignoreUnknownInstances?: boolean;
	// TODO: add this functionality
}

function instantiateChild(
	parent: Instance | undefined,
	name: string | number,
	schema: keyof CreatableInstances | InstanceSchema,
	instanceChildren: Array<Instance> | undefined | false,
): Instance {
	if (typeIs(schema, "string")) {
		const newInstance = new Instance(schema);
		newInstance.Name = name as string; // implicit conversion
		newInstance.Parent = parent;
		return newInstance;
	} else {
		const {
			$className: className,
			$instantiate: instantiate,
			$children: children,
		} = schema as GenericInstanceSchema;

		const newInstance = instantiateChild(parent, name, className, undefined);

		if (instanceChildren) {
			for (const child of instanceChildren) {
				child.Parent = newInstance;
			}
		}

		if (instantiate) {
			instantiate(newInstance); // this can change the children of `newInstance`
			instanceChildren = newInstance.GetChildren();
		}

		// The reason we pass around instanceChildren arrays is to avoid doing the same work twice
		reconcileChildren(newInstance, children, instanceChildren);
		return newInstance;
	}
}

function checkChildInMap(
	schema: keyof CreatableInstances | InstanceSchema,
	instance: Instance,
	childrenToBeReparented: Array<Instance> | undefined,
) {
	if (typeIs(schema, "string")) {
		if (instance.ClassName === schema) {
			// this will delete everything in childrenToBeReparented and any children Instance may have.
			reconcileChildren(instance, undefined, childrenToBeReparented);
			return true
		}
	} else {
		const { $className: className, $check: check, $children: children } = schema as GenericInstanceSchema;
		if (className === instance.ClassName && (check === undefined || check(instance))) {

			// if children is undefined don't bother re-parenting since reconcileChildren will Destroy childrenToBeReparented
			// else child is defined and childrenToBeReparented, move those over to `instance` to let the reconciler use them
			//	 as potential candidates.
			if (children && childrenToBeReparented) {
				for (const grandchild of childrenToBeReparented) {
					grandchild.Parent = instance;
				}
			}
			reconcileChildren(instance, children, childrenToBeReparented || instance.GetChildren());
			return true;
		}
	}
	return false;
}

function aggregateChildren(instances: Array<Instance>) {
	const children = new Array<Instance>();
	for (const instance of instances) {
		for (const grandchild of instance.GetChildren()) {
			children.push(grandchild)
		}
	}
	return children;
}

function reconcileChildren(
	parent: Instance | undefined,
	children: GenericInstanceSchema["$children"],
	instanceChildren: Array<Instance> | undefined | false,
) {
	if (children) {
		if (instanceChildren) {
			// A mapping of children by name.
			// If multiple children of the same exist, they'll be inside an array.
			const childMap = new Map<string | number, Instance | Array<Instance>>();

			// we are reconciling `instanceChildren` (Array<Instance>)
			// against `children` { [K: string | number]: ClassName | Schema }

			for (const child of instanceChildren) {
				const { Name } = child;
				const previous = childMap.get(Name);
				if (previous)
					if (typeIs(previous, "Instance")) childMap.set(Name, [previous, child]);
					else previous.push(child);
				else childMap.set(Name, child);
			}

			for (const [name, schema] of pairs(children as unknown as Map<string | number, keyof CreatableInstances | InstanceSchema>)) {
				let child: Instance | Array<Instance> | undefined;

				if (typeIs(name, "number")) {
					// if `name` is a number, move childMap[tostring(name)] to childMap[name] (and delete)
					// we do this because `children` could extend { 0: "Fire" } but Instance["Name"] is always string (0 vs "0")

					const strName = `${name}`;
					child = childMap.get(strName);
					if (child) {
						childMap.set(name, child);
						childMap.delete(strName);
					}
				} else {
					child = childMap.get(name);
				}

				if (child === undefined) {
					instantiateChild(parent, name, schema, undefined);
				} else {
					if (typeIs(child, "Instance")) {
						if (checkChildInMap(schema, child, undefined)) {
							childMap.delete(name);
						}
					} else {
						const allChildren = aggregateChildren(child);
						let validated = false;
						for (const individual of child) {
							if (!validated && checkChildInMap(schema, individual, allChildren)) {
								childMap.delete(name);
								validated = true;
							} else {
								for (const holy of individual.GetChildren()) {
									holy.Parent = undefined; // preserve the holy from being Destroyed
								}
								individual.Destroy();
							}
						}
						if (!validated) for (const evil of allChildren) evil.Destroy();
					}
				}
			}

			for (const [name, child] of childMap) {
				const schema = children[name];
				if (schema !== undefined) {
					instantiateChild(
						parent,
						name,
						schema,
						!typeIs(schema, "string") &&
							(typeIs(child, "Instance") ? child.GetChildren() : aggregateChildren(child)),
					);
				}

				if (typeIs(child, "Instance")) child.Destroy();
				else for (const evil of child) evil.Destroy();
			}
		} else {
			for (const [name, childSchema] of pairs(children as unknown as Map<string | number, keyof CreatableInstances | InstanceSchema>)) {
				instantiateChild(parent, name, childSchema, undefined);
			}
		}
	} else {
		if (instanceChildren) {
			for (const child of instanceChildren) {
				child.Destroy();
			}
		}
		if (parent) parent.ClearAllChildren();
	}
}
/*
{
	A: Folder & { B: Folder & { C: Folder }}
	 & { B: Folder & { C: Folder } }
}
*/

/** Reconciles an InstanceSchema against an Instance.
 * This implementation tries to preserve instances where possible.
 * Instances are validated by their `ClassName` property and the optional `$check` callback.
 * Child Instances are made into candidates for the aforementioned check by their `Name`.
 * If multiple candidates exist, this will take the first one that matches (else instantiate a new object) and
 * 	re-parent the children of the other candidates before continuing to the next reconcile.
 * @returns Instance guaranteed to match the InstanceSchema.
 */
export function reconcileSchema<T extends InstanceSchema>(schema: T, instance?: Instance): EvaluateSchema<T> {
	const { $className: className, $check: check, $children: children } = schema as GenericInstanceSchema;

	if (instance) {
		if (className === instance.ClassName && (check === undefined || check(instance))) {
			reconcileChildren(instance, children, instance.GetChildren());
			return instance as EvaluateSchema<T>;
		} else {
			const newInstance = instantiateChild(instance.Parent, instance.Name, schema, instance.GetChildren());
			instance.Destroy();
			return newInstance as EvaluateSchema<T>;
		}
	} else {
		return instantiateChild(undefined, className, schema, undefined) as EvaluateSchema<T>;
	}
}

export type EvaluateSchema<
	T extends InstanceSchema
> = Instances[T["$className"]] extends infer B
	? (T["$check"] extends (a: unknown) => a is infer A ? (A extends B ? A : A & B) : B) &
			(T["$children"] extends object
				? {
						[K in keyof T["$children"]]: T["$children"][K] extends infer U
							? U extends InstanceSchema
								? EvaluateSchema<U>
								: U extends keyof Instances
								? Instances[U]
								: never
							: never;
				  }
				: unknown)
	: never;
