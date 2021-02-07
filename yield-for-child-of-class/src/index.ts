type InstantiableInstances = Exclude<keyof Instances, keyof AbstractInstances | keyof Services>;

export async function yieldForChildOfClass<T extends InstantiableInstances>(
	instance: Instance,
	className: T,
): Promise<Instances[T]> {
	for (const child of instance.GetChildren()) {
		if (child.ClassName === className) {
			return child as never;
		}
	}

	let connection1: RBXScriptConnection;
	let connection2: RBXScriptConnection;

	const promise = new Promise<Instances[T]>((resolve, reject) => {
		connection1 = instance.ChildAdded.Connect((child) => child.ClassName === className && resolve(child as never));
		connection2 = instance.AncestryChanged.Connect(
			(_, parent) => parent || reject(`${instance.GetFullName()} had its root parent set to \`nil\``),
		);
	});

	promise.finally(() => {
		connection1.Disconnect();
		connection2.Disconnect();
	});

	return await promise;
}
