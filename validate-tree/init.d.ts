/// <reference types="@rbxts/types" />
/** Evaluates a Rojo-esque tree and transforms it into an indexable type. */
export declare type EvaluateTree<T extends {
    $className: keyof Instances;
}> = (Instances[T["$className"]]) & {
    [K in Exclude<keyof T, "$className">]: (T[K] extends keyof Instances ? Instances[T[K]] : (T[K] extends {
        $className: string;
    } ? T[K] extends {
        $className: keyof Instances;
    } ? EvaluateTree<T[K]> : never : never));
};
interface InstanceTreeDefinition {
    [Key: string]: keyof Instances | InstanceTree;
}
export declare type InstanceTree = {
    $className: keyof Instances;
} & InstanceTreeDefinition;
export declare function validateTree<Q extends InstanceTree>(object: Instance, tree: Q): object is EvaluateTree<Q>;
/** Yields until a given tree of objects exists within an object.
 * @param tree Must be an object tree similar to ones considered valid by Rojo.
 * Every tree must have a `$className` member, and can have any number of keys which represent
 * the name of a child instance, which should have a corresponding value which is this same kind of tree.
 * There is also a shorthand syntax available, where setting a key equal to a className is equivalent
 * to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
 */
export declare function yieldForTree<T extends Instance, Q extends InstanceTree>(object: T, tree: Q): Promise<T & EvaluateTree<Q>>;
export {};
