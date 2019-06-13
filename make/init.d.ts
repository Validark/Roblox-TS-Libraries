/// <reference types="@rbxts/types" />
declare type GetBindableToRBXScriptSignal<T> = {
    [key in ({
        [k in keyof T]-?: T[k] extends RBXScriptSignal ? k : never;
    })[keyof T]]: (T[key] extends RBXScriptSignal<infer R> ? R : never);
};
/**
 * Returns a table wherein an object's writable properties can be specified,
 * while also allowing functions to be passed in which can be bound to a Cue.
 */
declare type GetPartialObjectWithBindableConnectSlots<T extends Instance> = Partial<Pick<T, GetProperties<T>> & GetBindableToRBXScriptSignal<T>>;
declare function Make<T extends keyof CreatableInstances>(className: T, settings: GetPartialObjectWithBindableConnectSlots<CreatableInstances[T]> & {
    Children?: Array<Instance>;
    Parent?: Instance | undefined;
}): StrictInstances[T];
