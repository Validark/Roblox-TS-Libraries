interface IsACheckableTypes extends CheckableTypes, Instances {}

/**
 * Matches a given value to a given string type.
 * @param type A string which will match to a typeof call, or will match an Object's ClassName
 * @param value The value to match to a given type
 */
export declare function is<T extends keyof IsACheckableTypes>(type: T, value: any): value is IsACheckableTypes[T];

/**
 * Matches a given value to a given string type.
 * @param type A string which will match to a typeof call, or will match an Object's ClassName
 * @param value The value to match to a given type
 */
export declare function is(type: string, value: any): boolean;

/**
 * Matches a given value to a given string type.
 * @param type A string which will match to a typeof call, or will match an Object:IsA(type) call
 * @param value The value to match to a given type
 */
export declare function isA<T extends keyof IsACheckableTypes>(type: T, value: any): value is IsACheckableTypes[T];

/**
 * Matches a given value to a given string type.
 * @param type A string which will match to a typeof call, or will match an Object:IsA(type) call
 * @param value The value to match to a given type
 */
export declare function isA(type: string, value: any): boolean;

export default is;
