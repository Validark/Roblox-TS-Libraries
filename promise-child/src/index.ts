export function promiseChildWhichIsA<T extends keyof Instances>(parent: Instance, className: T): Promise<Instances[T]> {
	const child = parent.FindFirstChildWhichIsA(className);
	if (child) return Promise.resolve(child);

	const warner = Promise.delay(5);

	warner.then(() =>
		warn(
			`[promiseChildWhichIsA] Infinite wait possible for a "${className}" to appear under ${parent.GetFullName()}`,
		),
	);

	let connection1: RBXScriptConnection;
	let connection2: RBXScriptConnection;

	const promise = new Promise<Instances[T]>((resolve, reject) => {
		connection1 = parent.ChildAdded.Connect((child) => child.IsA(className) && resolve(child));
		connection2 = parent.AncestryChanged.Connect(
			(_, newParent) => newParent || reject(`${parent.GetFullName()} had its root parent set to nil`),
		);
	});

	promise.finally(() => {
		warner.cancel();
		connection1.Disconnect();
		connection2.Disconnect();
	});

	return promise;
}

export function promiseChildOfClass<T extends keyof Instances>(parent: Instance, className: T): Promise<Instances[T]> {
	const child = parent.FindFirstChildOfClass(className);
	if (child) return Promise.resolve(child);

	const warner = Promise.delay(5);

	warner.then(() =>
		warn(
			`[promiseChildOfClass] Infinite wait possible for a "${className}" to appear under ${parent.GetFullName()}`,
		),
	);

	let connection1: RBXScriptConnection;
	let connection2: RBXScriptConnection;

	const promise = new Promise<Instances[T]>((resolve, reject) => {
		connection1 = parent.ChildAdded.Connect((child) => classIs(child, className) && resolve(child));
		connection2 = parent.AncestryChanged.Connect(
			(_, newParent) => newParent || reject(`${parent.GetFullName()} had its root parent set to nil`),
		);
	});

	promise.finally(() => {
		warner.cancel();
		connection1.Disconnect();
		connection2.Disconnect();
	});

	return promise;
}

export function promiseChild(parent: Instance, childName: string | number): Promise<Instance> {
	const child = parent.FindFirstChild(childName);
	if (child) return Promise.resolve(child);

	const connections = new Array<RBXScriptConnection>();
	const warner = Promise.delay(5);

	warner.then(() =>
		warn(`[promiseChild] Infinite wait possible for "${childName}" to appear under ${parent.GetFullName()}`),
	);

	const promise = new Promise<Instance>((resolve, reject) => {
		connections.push(
			parent.ChildAdded.Connect((child) => {
				if (child.Name === childName) resolve(child);
				else
					connections.push(
						child
							.GetPropertyChangedSignal("Name")
							.Connect(() => child.Name === childName && child.Parent === parent && resolve(child)),
					);
			}),
		);

		connections.push(
			parent.AncestryChanged.Connect(
				(_, newParent) => newParent || reject(`${parent.GetFullName()} had its root parent set to nil`),
			),
		);
	});

	promise.finally(() => {
		warner.cancel();
		for (const connection of connections) connection.Disconnect();
	});

	return promise;
}
