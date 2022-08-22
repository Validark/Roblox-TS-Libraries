/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
/** Defines a Rojo-esque tree type which defines an abstract object tree. */
export interface InstanceTree {
    $className?: keyof Instances;
    [Key: string]: keyof Instances | undefined | InstanceTree;
}
declare type MoreSpecificType<U, D> = U extends D ? U : D extends U ? D : U & D;
declare type AllKeys<T> = T extends any ? keyof T : never;
/** Evaluates a Rojo-esque tree and transforms it into an indexable type. */
export declare type EvaluateInstanceTree<T, D = Instance> = (T extends {
    $className: keyof Instances;
} ? Instances[T["$className"]] : D) extends infer U ? MoreSpecificType<U, D> & {
    [K in Exclude<keyof T, "$className" | AllKeys<MoreSpecificType<U, D>>>]: T[K] extends keyof Instances ? Instances[T[K]] : EvaluateInstanceTree<T[K]>;
} : never;
/** Returns whether a given Instance matches a particular Rojo-esque InstanceTree.
 * @param object The object which needs validation
 * @param tree The tree to validate
 * @param violators
 */
export declare function validateTree<I extends Instance, T extends InstanceTree>(object: I, tree: T, violators?: Array<string>): object is EvaluateInstanceTree<T, I>;
/** Promises a given tree of objects exists within an object.
 * @param tree Must be an object tree similar to ones considered valid by Rojo.
 * Every tree must have a `$className` member, and can have any number of keys which represent
 * the name of a child instance, which should have a corresponding value which is this same kind of tree.
 * There is also a shorthand syntax available, where setting a key equal to a className is equivalent
 * to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
 */
export declare function promiseTree<I extends Instance, T extends InstanceTree>(object: I, tree: T): Promise<EvaluateInstanceTree<T, I>>;
export {};
