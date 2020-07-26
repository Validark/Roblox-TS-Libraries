/// <reference types="@rbxts/types" />
export declare type InstanceSchema = {
    [K in keyof CreatableInstances]: {
        /** The name of an instances ClassName. Matched via IsA() */
        $className: K;
        /** An optional condition which instances must pass in order to validate. No yielding or errors (unless you want the error to cancel the check) */
        $check?: (instance: CreatableInstances[K]) => boolean | undefined;
        /** All the children inside this object. */
        $children?: {
            [K: string]: keyof CreatableInstances | InstanceSchema | undefined;
        };
        /** Called when reconciling a schema and instantiating this instance */
        $instantiate?: (instance: CreatableInstances[K]) => void;
    };
}[keyof CreatableInstances];
/** Reconciles an InstanceSchema against an Instance.
 * This implementation tries to preserve instances where possible.
 * Instances are validated by their `ClassName` property and the optional `$check` callback.
 * Child Instances are made into candidates for the aforementioned check by their `Name`.
 * If multiple candidates exist, this will take the first one that matches (else instantiate a new object) and
 * 	re-parent the children of the other candidates before continuing to the next reconcile.
 * @returns Instance guaranteed to match the InstanceSchema.
 */
export declare function reconcileSchema<T extends InstanceSchema>(schema: T, instance?: Instance): EvaluateSchema<T>;
export declare type EvaluateSchema<T extends InstanceSchema> = Instances[T["$className"]] extends infer B ? (T["$check"] extends (a: unknown) => a is infer A ? (A extends B ? A : A & B) : B) & (T["$children"] extends object ? {
    [K in keyof T["$children"]]: T["$children"][K] extends infer U ? U extends InstanceSchema ? EvaluateSchema<U> : U extends keyof Instances ? Instances[U] : never : never;
} : unknown) : never;
export {};
