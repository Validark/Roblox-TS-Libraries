declare type RandomPicker<T> = () => T;

/**
 * Creates a function which returns a random element from options when called.
 * @param options The elements which can be selected by the function
 * @param relativeWeights An array which corresponds to each element in options, with each element being the relative probability of each corresponding option.
 */
declare const RandomPicker: new <T>(options: Array<T>, relativeWeights?: Array<number>) => RandomPicker<T>;

export = RandomPicker;
