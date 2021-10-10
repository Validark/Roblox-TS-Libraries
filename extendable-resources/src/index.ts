// @author Validark

const isServer = game.GetService("RunService").IsServer();

/**
 * Wraps a function which takes a single argument as a parameter, and makes it idempotent.
 * The new function will return the value in the cache, else it will call the wrapped function and cache the result
 * @param func The function to wrap
 */
function cacheSingleArgFunc<T, K>(func: (arg: T) => K) {
	const cache = new Map<T, K>();

	return (arg: T) => {
		let value = cache.get(arg);

		if (value === undefined) {
			value = func(arg);
			cache.set(arg, value);
		}

		return value;
	};
}

function constructManager<T extends keyof CreatableInstances>(
	folder: Instance,
	optionalInstanceType?: T,
): (instanceName: string) => CreatableInstances[T] {
	if (isServer) {
		return instanceName => {
			let target = folder.FindFirstChild(instanceName) as CreatableInstances[T] | undefined;

			if (target === undefined) {
				if (optionalInstanceType) {
					target = new Instance(optionalInstanceType);
					target.Name = instanceName;
					target.Parent = folder;
				} else {
					return error(`Failed to find ${instanceName} in ${folder.Name}`);
				}
			}

			return target;
		};
	} else {
		return instanceName => folder.WaitForChild(instanceName) as CreatableInstances[T];
	}
}

const getFolderGetter = cacheSingleArgFunc((folderParent: Instance) => constructManager(folderParent, "Folder"));

/**
 * Finds a folder called folderName in folderParent,
 * and returns a function which searches this folder for an instance with a given name.
 * If this instance does not exist on the client, the function will yield.
 * If it does not exist on the server, it will generate an instance of type optionalInstanceType or error.
 *
 * @param folderParent The parent to search for the folder in
 * @param folderName  The name of the folder to search for
 * @param optionalInstanceType The instance type which can be generated if the instance does not
 * exist and is on the server
 */
function makeFolderManager<T extends keyof CreatableInstances>(
	folderParent: Instance,
	folderName: string,
	optionalInstanceType?: T,
) {
	return constructManager(getFolderGetter(folderParent)(folderName), optionalInstanceType);
}

export = makeFolderManager;
