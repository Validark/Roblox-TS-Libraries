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
declare function makeFolderManager<T extends keyof CreatableInstances>(folderParent: Instance, folderName: string, optionalInstanceType?: T): (instanceName: string) => CreatableInstances[T];
export = makeFolderManager;
