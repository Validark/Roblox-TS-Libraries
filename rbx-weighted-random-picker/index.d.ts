/**
 * Creates a function which returns a random element from options when called.
 * @param options The elements which can be selected by the function
 * @param relativeWeights An array which corresponds to each element in options, with each element being the relative probability of each corresponding option.
 */
declare function RandomPicker<T>(
  options: T[],
  relativeWeights?: number[]
): () => T;

export = RandomPicker;
