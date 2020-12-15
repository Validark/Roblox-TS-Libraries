type GetBindableToRBXScriptSignal<T> = {
	[key in ({ [k in keyof T]-?: T[k] extends RBXScriptSignal ? k : never })[keyof T]]: (T[key] extends RBXScriptSignal<
		infer R
	>
		? R
		: never)
};

/**
 * Returns a table wherein an object's writable properties can be specified,
 * while also allowing functions to be passed in which can be bound to a Cue.
 */
type GetPartialObjectWithBindableConnectSlots<T extends Instance> = Partial<
	Pick<T, InstanceProperties<T>> & GetBindableToRBXScriptSignal<T>
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
function Make<T extends keyof CreatableInstances>(
	className: T,
	settings: GetPartialObjectWithBindableConnectSlots<CreatableInstances[T]> & {
		/** The Children to place inside of this Instance. */
		Children?: Array<Instance>;
		Parent?: Instance | undefined;
	},
) {
	const { Children: children, Parent: parent } = settings;

	settings.Children = undefined;
	settings.Parent = undefined;

	const instance = new Instance(className);

	for (const [setting, value] of pairs(settings) as IterableFunction<
		LuaTuple<[WritableInstanceProperties<Instance>, unknown]>
	>) {
		const { [setting]: prop } = instance;

		if (typeIs(prop, "RBXScriptSignal")) {
			prop.Connect(value as () => void);
		} else {
			instance[setting] = value as never;
		}
	}

	if (children) {
		for (const child of children) {
			child.Parent = instance;
		}
	}
	instance.Parent = parent;
	return instance;
}

export = Make;
