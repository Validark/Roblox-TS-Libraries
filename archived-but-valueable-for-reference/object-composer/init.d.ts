/// <reference types="@rbxts/types" />
type _<T> = T;
type Merge<T> = _<{ [K in keyof T]: T[K] }>;
declare type Maker = (state: any) => object;
type UnionToIntersection<U> = (U extends any ? (u: U) => void : never) extends (u: infer I) => void ? I : never;
type ComposeReturn<S, R> = {} extends S ? () => R : Partial<S> extends S ? (state?: S) => R : (state: S) => R;

export type ComposeTuple<T extends Array<Maker>> = ComposeReturn<
	Merge<
		UnionToIntersection<
			{ [K in keyof T]: T[K] extends (state: infer R) => void ? (unknown extends R ? never : R) : never }[Exclude<
				keyof T,
				keyof Array<any> | "length"
			>]
		>
	>,
	UnionToIntersection<
		{ [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never }[Exclude<
			keyof T,
			keyof Array<any> | "length"
		>]
	>
>;

export declare function compose<T extends Array<Maker>>(...args: T): ComposeTuple<T>;
export default compose;
