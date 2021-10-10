type WritablePropertyNames<T> = {
	readonly [K in keyof T]-?: T[K] extends Callback
		? never
		: (<F>() => F extends { [Q in K]: T[K] } ? 1 : 2) extends <F>() => F extends {
				-readonly [Q in K]: T[K];
		  }
				? 1
				: 2
		? K
		: never;
}[keyof T];

type GetBindableToRBXScriptSignal<T> = {
	[key in ({ [K in keyof T]-?: T[K] extends RBXScriptSignal ? K : never })[keyof T]]: (T[key] extends RBXScriptSignal<
		infer R
	>
		? R
		: never)
};

/**
 * Returns a table wherein an object's writable properties can be specified,
 * while also allowing functions to be passed in which can be bound to a RBXScriptSignal.
 */
type GetPartialObjectWithBindableConnectSlots<T extends Instance> = Partial<
	Pick<T, WritablePropertyNames<T>> & GetBindableToRBXScriptSignal<T>
>;

/**
 * Instantiates a new Instance of `className` with given `settings`,
 * where `settings` is an object of the form { [K: propertyName]: value }.
 *
 * `settings.Children` is an array of child objects to be parented to the generated Instance.
 *
 * Events can be set to a callback function, which will be connected.
 *
 * `settings.Parent` is always set last.
 */
function Make<T extends keyof CreatableInstances, Q extends GetPartialObjectWithBindableConnectSlots<CreatableInstances[T]> & {
		/** The Children to place inside of this Instance. */
		Children?: ReadonlyArray<Instance>;
		Parent?: Instance | undefined;
	}>(
	className: T,
	settings: Q,
) {
	const { Children: children, Parent: parent } = settings;
	const instance = new Instance(className);

	for (const [setting, value] of pairs(settings as unknown as Map<never, never>)) {
		if (setting !== "Children" && setting !== "Parent") {
			const { [setting]: prop } = instance;

			if (typeIs(prop, "RBXScriptSignal")) {
				(prop as RBXScriptSignal).Connect(value);
			} else {
				instance[setting] = value;
			}
		}
	}

	if (children) {
		for (const child of children) {
			child.Parent = instance;
		}
	}
	instance.Parent = parent;
	return instance as CreatableInstances[T] &
		Reconstruct<{ [O in Extract<"Name", keyof Q>]: Q[O] } & { [G in "ClassName"]: T } &
			(Q["Children"] extends never ? never :
				{
					[K in Exclude<keyof Q["Children"], keyof ReadonlyArray<any> | "length">]:
						Q["Children"][K] extends infer A ? A extends { Name: string } ? string extends A["Name"] ? never : (k: { [P in A["Name"]]: A }) => void : never : never
				}[Exclude<keyof Q["Children"], keyof ReadonlyArray<any> | "length">] extends (k: infer U) => void ? U : never)>
}

export = Make;
