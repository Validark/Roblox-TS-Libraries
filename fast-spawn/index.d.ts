/**
 * Spawns a function on a new thread, but begins running it immediately
 * instead of being deferred. This is sometimes known as a "fast spawn".
  * @param callback The function to call. Any further arguments are passed as parameters.
 */
declare const FastSpawn: PromiseConstructor["spawn"];
export = FastSpawn;
