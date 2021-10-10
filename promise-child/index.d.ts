/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
export declare function promiseChildWhichIsA<T extends keyof Instances>(instance: Instance, className: T): Promise<Instances[T]>;
export declare function promiseChildOfClass<T extends keyof Instances>(instance: Instance, className: T): Promise<Instances[T]>;
export declare function promiseChild(instance: Instance, childName: string | number): Promise<Instance>;
