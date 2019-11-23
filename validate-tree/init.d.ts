/// <reference types="@rbxts/types" />
declare type KeyExtendsPropertyName<T extends InstanceTree, K, V> = K extends "Changed" ? true : T extends {
    $className: keyof Instances;
} ? K extends keyof Instances[T["$className"]] ? unknown : V : V;
/** Defines a Rojo-esque tree type which defines an abstract object tree. */
export interface InstanceTree {
    $className?: keyof Instances;
    [Key: string]: keyof Instances | undefined | InstanceTree;
}
/** Evaluates a Rojo-esque tree and transforms it into an indexable type. */
export declare type EvaluateInstanceTree<T extends InstanceTree, D = Instance> = (T extends {
    $className: keyof Instances;
} ? Instances[T["$className"]] : D) & {
    [K in Exclude<keyof T, "$className">]: KeyExtendsPropertyName<T, K, T[K] extends keyof Instances ? Instances[T[K]] : T[K] extends {
        $className: keyof Instances;
    } ? EvaluateInstanceTree<T[K]> : never>;
};
/** Returns whether a given Instance matches a particular Rojo-eque InstanceTree. */
export declare function validateTree<I extends Instance, T extends InstanceTree>(object: I, tree: T, violators?: Array<string>): object is I & EvaluateInstanceTree<T, I>;
/** Yields until a given tree of objects exists within an object.
 * @param tree Must be an object tree similar to ones considered valid by Rojo.
 * Every tree must have a `$className` member, and can have any number of keys which represent
 * the name of a child instance, which should have a corresponding value which is this same kind of tree.
 * There is also a shorthand syntax available, where setting a key equal to a className is equivalent
 * to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
 */
export declare function yieldForTree<I extends Instance, T extends InstanceTree>(object: I, tree: T): Promise<I & EvaluateInstanceTree<T, I>>;
export {};
