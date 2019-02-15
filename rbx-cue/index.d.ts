declare class Cue {
  /**
   * Fires all bound functions and resumes all yielding threads
   * @param args The arguments to pass into bound functions
   */
  public go(...args: Array<any>): void;

  /**
   * Yields the current thread until this event fires
   * @returns arguments from fire
   */
  public waitFor(): any;

  /**
   * Runs a function on cue
   * @param Callback The function which should be called when the event fires
   */
  public bind(Callback: () => any): void;

  /**
   * Unbinds a function from this event
   * @param Callback The function which, if bound, will be unbound from the event
   */
  public unbind(Callback: () => any): void;

  /**
   * Unbinds all functions from this event in preparation for garbage-collection
   */
  public destroy(): void;
}

export = Cue;
