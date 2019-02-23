# Extendable Resources
A library for defining resources so it can be easily imported by other modules.

The main function is called `makeFolderManager`. Its documentation is as follows:

##### Finds a folder called folderName in folderParent, and returns a function which searches this folder for an instance with a given name. If this instance does not exist on the client, the function will yield. If it does not exist on the server, it will generate an instance of type optionalInstanceType or error.

###### @param folderParent — The parent to search for the folder in
###### @param folderName — The name of the folder to search for
###### @param optionalInstanceType - The instance type which can be generated if the instance does not exist and is on the server

Usage:

```ts
import { ReplicatedStorage } from "rbx-services";
import makeFolderManager from "rbx-extendable-resources";

// creates/finds a folder named "RemoteEvents" in ReplicatedStorage
// if it can't find a particular object, it will instantiate a RemoteEvent with the proper name
const getRemoteEvent = makeFolderManager(ReplicatedStorage, "RemoteEvents", "RemoteEvent");

export const Chatted = getRemoteEvent("Chatted");
export const Cleanup = getRemoteEvent("Cleanup");

// or in another library

// Not necessary to specify "Model", but it will force returned values to be a Model type
const getMap = makeFolderManager<"Model">(ReplicatedStorage, "Maps");

export const SFOTH = getMap("SFOTH");
export const City = getMap("City");
```

Then you can easily import the needed resources into another library:

```ts
import { Chatted, Cleanup } from "ReplicatedStorage/RemoteEventDefinitions";
```
