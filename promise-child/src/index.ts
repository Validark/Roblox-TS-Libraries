export async function promiseChildWhichIsA<T extends keyof Instances>(
	instance: Instance,
	className: T,
): Promise<Instances[T]> {
	const child = instance.FindFirstChildWhichIsA(className);
	if (child) return child;

	let connection1: RBXScriptConnection;
	let connection2: RBXScriptConnection;

	const promise = new Promise<Instances[T]>((resolve, reject) => {
		connection1 = instance.ChildAdded.Connect((child) => child.IsA(className) && resolve(child));
		connection2 = instance.AncestryChanged.Connect(
			(_, parent) => parent || reject(`${instance.GetFullName()} had its root parent set to nil`),
		);
	});

	promise.finally(() => {
		connection1.Disconnect();
		connection1 = undefined!;
		connection2.Disconnect();
		connection2 = undefined!;
	});

	return await promise;
}

export async function promiseChildOfClass<T extends keyof Instances>(
	instance: Instance,
	className: T,
): Promise<Instances[T]> {
	const child = instance.FindFirstChildOfClass(className);
	if (child) return child;

	let connection1: RBXScriptConnection;
	let connection2: RBXScriptConnection;

	const promise = new Promise<Instances[T]>((resolve, reject) => {
		connection1 = instance.ChildAdded.Connect((child) => classIs(child, className) && resolve(child));
		connection2 = instance.AncestryChanged.Connect(
			(_, parent) => parent || reject(`${instance.GetFullName()} had its root parent set to nil`),
		);
	});

	promise.finally(() => {
		connection1.Disconnect();
		connection1 = undefined!;
		connection2.Disconnect();
		connection2 = undefined!;
	});

	return await promise;
}

export async function promiseChild(instance: Instance, childName: string | number): Promise<Instance> {
	return instance.WaitForChild(childName);
}
