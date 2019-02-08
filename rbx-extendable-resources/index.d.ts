/**
 * Retrieves objects inside ReplicatedStorage/Resources/FOLDER_NAME
 * Where FOLDER_NAME is what follows "get" followed by "s"
 * On the server, it will create instances which do not exist if instantiable, else error
 * If on the client, it will yield until instances exist
 */
declare namespace Resources {
  function getRemoteEvent(instanceName: string): RemoteEvent;
  function getRemoteFunction(instanceName: string): RemoteFunction;
  function getLocalTable(tableName: any): Table;
}

export = Resources;
