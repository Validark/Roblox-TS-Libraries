/// <reference types="@rbxts/types" />
interface NestedInstanceTree {
    $className: keyof Instances;
    [Key: string]: keyof Instances | NestedInstanceTree;
}
declare type NestedKeyExtendsPropertyName<T extends NestedInstanceTree, K> = K extends "Changed" ? true : K extends keyof Instances[T["$className"]] ? true : false;
declare type EvaluateNestedInstanceTree<T extends NestedInstanceTree> = (Instances[T["$className"]]) & {
    [K in Exclude<keyof T, "$className">]: NestedKeyExtendsPropertyName<T, K> extends true ? unknown : (T[K] extends keyof Instances ? Instances[T[K]] : (T[K] extends {
        $className: keyof Instances;
    } ? EvaluateNestedInstanceTree<T[K]> : never));
};
declare type KeyExtendsPropertyName<T extends InstanceTree, K> = K extends "Changed" ? true : (T extends {
    $className: keyof Instances;
} ? (K extends keyof Instances[T["$className"]] ? true : false) : false);
/** Defines a Rojo-esque tree type which defines an abstract object tree. */
export interface InstanceTree {
    $className?: keyof Instances;
    [Key: string]: keyof Instances | undefined | NestedInstanceTree;
}
/** Evaluates a Rojo-esque tree and transforms it into an indexable type. */
export declare type EvaluateInstanceTree<T extends InstanceTree> = (T extends {
    $className: keyof Instances;
} ? Instances[T["$className"]] : unknown) & {
    [K in Exclude<keyof T, "$className">]: KeyExtendsPropertyName<T, K> extends true ? unknown : (T[K] extends keyof Instances ? Instances[T[K]] : (T[K] extends {
        $className: keyof Instances;
    } ? EvaluateNestedInstanceTree<T[K]> : never));
};
declare type CoerceInstanceIntoTree<I extends Instance, T extends InstanceTree> = T extends {
    $className: keyof Instances;
} ? (T["$className"] extends I["ClassName"] ? (EvaluateNestedInstanceTree<T> extends I ? EvaluateNestedInstanceTree<T> : I & EvaluateNestedInstanceTree<T>) : never) : I & EvaluateInstanceTree<T>;
export declare function validateTree<I extends Instance, T extends InstanceTree>(object: I, tree: T): object is CoerceInstanceIntoTree<I, T>;
/** Yields until a given tree of objects exists within an object.
 * @param tree Must be an object tree similar to ones considered valid by Rojo.
 * Every tree must have a `$className` member, and can have any number of keys which represent
 * the name of a child instance, which should have a corresponding value which is this same kind of tree.
 * There is also a shorthand syntax available, where setting a key equal to a className is equivalent
 * to an object with `$className` defined. Hence `Things: "Folder"` is equivalent to `Things: { $className: "Folder" }`
 */
export declare function yieldForTree<I extends Instance, T extends {
    $className?: {
        [K in keyof Instances]: Instances[K] extends I ? (I extends Instances[K] ? K : never) : never;
    }[keyof Instances];
    [Key: string]: keyof Instances | undefined | NestedInstanceTree;
}>(object: I, tree: T): Promise<CoerceInstanceIntoTree<I, T>>;
export {};
