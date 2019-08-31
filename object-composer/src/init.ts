type Param1<T extends (...args: any) => any> = FunctionArguments<T>["length"] extends 0
	? unknown
	: FunctionArguments<T>[0];

type ComposeReturn<S, R> = Partial<S> extends S ? (state?: S) => R : (state: S) => R;
type Collisions<A extends object, B extends object> = {
	[K in keyof A]: K extends keyof B ? K : never;
}[keyof A];

type Maker = (state?: any) => object;

/*
 * Composes an object constructor from a series of partial constructors.
 * Fully type-safe. Errors when there are scope conflicts.
 * Requires a state parameter in the constructor when there are more than 1 required state members.
 * (These were auto-generated)
 */
export function compose<A extends Maker>(a: A): ComposeReturn<Param1<A>, ReturnType<A>>;
export function compose<A extends Maker, B extends Maker>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
): ComposeReturn<Param1<A> & Param1<B>, ReturnType<A> & ReturnType<B>>;
export function compose<A extends Maker, B extends Maker, C extends Maker>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
): ComposeReturn<Param1<A> & Param1<B> & Param1<C>, ReturnType<A> & ReturnType<B> & ReturnType<C>>;
export function compose<A extends Maker, B extends Maker, C extends Maker, D extends Maker>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
): ComposeReturn<
	Param1<A> & Param1<B> & Param1<C> & Param1<D>,
	ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>
>;
export function compose<A extends Maker, B extends Maker, C extends Maker, D extends Maker, E extends Maker>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
): ComposeReturn<
	Param1<A> & Param1<B> & Param1<C> & Param1<D> & Param1<E>,
	ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>
>;
export function compose<
	A extends Maker,
	B extends Maker,
	C extends Maker,
	D extends Maker,
	E extends Maker,
	F extends Maker
>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
	f: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>,
		ReturnType<F>
	> extends never
		? F
		: never,
): ComposeReturn<
	Param1<A> & Param1<B> & Param1<C> & Param1<D> & Param1<E> & Param1<F>,
	ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F>
>;
export function compose<
	A extends Maker,
	B extends Maker,
	C extends Maker,
	D extends Maker,
	E extends Maker,
	F extends Maker,
	G extends Maker
>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
	f: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>,
		ReturnType<F>
	> extends never
		? F
		: never,
	g: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F>,
		ReturnType<G>
	> extends never
		? G
		: never,
): ComposeReturn<
	Param1<A> & Param1<B> & Param1<C> & Param1<D> & Param1<E> & Param1<F> & Param1<G>,
	ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F> & ReturnType<G>
>;
export function compose<
	A extends Maker,
	B extends Maker,
	C extends Maker,
	D extends Maker,
	E extends Maker,
	F extends Maker,
	G extends Maker,
	H extends Maker
>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
	f: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>,
		ReturnType<F>
	> extends never
		? F
		: never,
	g: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F>,
		ReturnType<G>
	> extends never
		? G
		: never,
	h: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F> & ReturnType<G>,
		ReturnType<H>
	> extends never
		? H
		: never,
): ComposeReturn<
	Param1<A> & Param1<B> & Param1<C> & Param1<D> & Param1<E> & Param1<F> & Param1<G> & Param1<H>,
	ReturnType<A> &
		ReturnType<B> &
		ReturnType<C> &
		ReturnType<D> &
		ReturnType<E> &
		ReturnType<F> &
		ReturnType<G> &
		ReturnType<H>
>;
export function compose<
	A extends Maker,
	B extends Maker,
	C extends Maker,
	D extends Maker,
	E extends Maker,
	F extends Maker,
	G extends Maker,
	H extends Maker,
	I extends Maker
>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
	f: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>,
		ReturnType<F>
	> extends never
		? F
		: never,
	g: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F>,
		ReturnType<G>
	> extends never
		? G
		: never,
	h: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F> & ReturnType<G>,
		ReturnType<H>
	> extends never
		? H
		: never,
	i: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H>,
		ReturnType<I>
	> extends never
		? I
		: never,
): ComposeReturn<
	Param1<A> & Param1<B> & Param1<C> & Param1<D> & Param1<E> & Param1<F> & Param1<G> & Param1<H> & Param1<I>,
	ReturnType<A> &
		ReturnType<B> &
		ReturnType<C> &
		ReturnType<D> &
		ReturnType<E> &
		ReturnType<F> &
		ReturnType<G> &
		ReturnType<H> &
		ReturnType<I>
>;
export function compose<
	A extends Maker,
	B extends Maker,
	C extends Maker,
	D extends Maker,
	E extends Maker,
	F extends Maker,
	G extends Maker,
	H extends Maker,
	I extends Maker,
	J extends Maker
>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
	f: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>,
		ReturnType<F>
	> extends never
		? F
		: never,
	g: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F>,
		ReturnType<G>
	> extends never
		? G
		: never,
	h: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F> & ReturnType<G>,
		ReturnType<H>
	> extends never
		? H
		: never,
	i: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H>,
		ReturnType<I>
	> extends never
		? I
		: never,
	j: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H> &
			ReturnType<I>,
		ReturnType<J>
	> extends never
		? J
		: never,
): ComposeReturn<
	Param1<A> &
		Param1<B> &
		Param1<C> &
		Param1<D> &
		Param1<E> &
		Param1<F> &
		Param1<G> &
		Param1<H> &
		Param1<I> &
		Param1<J>,
	ReturnType<A> &
		ReturnType<B> &
		ReturnType<C> &
		ReturnType<D> &
		ReturnType<E> &
		ReturnType<F> &
		ReturnType<G> &
		ReturnType<H> &
		ReturnType<I> &
		ReturnType<J>
>;
export function compose<
	A extends Maker,
	B extends Maker,
	C extends Maker,
	D extends Maker,
	E extends Maker,
	F extends Maker,
	G extends Maker,
	H extends Maker,
	I extends Maker,
	J extends Maker,
	K extends Maker
>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
	f: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>,
		ReturnType<F>
	> extends never
		? F
		: never,
	g: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F>,
		ReturnType<G>
	> extends never
		? G
		: never,
	h: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F> & ReturnType<G>,
		ReturnType<H>
	> extends never
		? H
		: never,
	i: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H>,
		ReturnType<I>
	> extends never
		? I
		: never,
	j: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H> &
			ReturnType<I>,
		ReturnType<J>
	> extends never
		? J
		: never,
	k: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H> &
			ReturnType<I> &
			ReturnType<J>,
		ReturnType<K>
	> extends never
		? K
		: never,
): ComposeReturn<
	Param1<A> &
		Param1<B> &
		Param1<C> &
		Param1<D> &
		Param1<E> &
		Param1<F> &
		Param1<G> &
		Param1<H> &
		Param1<I> &
		Param1<J> &
		Param1<K>,
	ReturnType<A> &
		ReturnType<B> &
		ReturnType<C> &
		ReturnType<D> &
		ReturnType<E> &
		ReturnType<F> &
		ReturnType<G> &
		ReturnType<H> &
		ReturnType<I> &
		ReturnType<J> &
		ReturnType<K>
>;
export function compose<
	A extends Maker,
	B extends Maker,
	C extends Maker,
	D extends Maker,
	E extends Maker,
	F extends Maker,
	G extends Maker,
	H extends Maker,
	I extends Maker,
	J extends Maker,
	K extends Maker,
	L extends Maker
>(
	a: A,
	b: Collisions<ReturnType<A>, ReturnType<B>> extends never ? B : never,
	c: Collisions<ReturnType<A> & ReturnType<B>, ReturnType<C>> extends never ? C : never,
	d: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C>, ReturnType<D>> extends never ? D : never,
	e: Collisions<ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D>, ReturnType<E>> extends never
		? E
		: never,
	f: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E>,
		ReturnType<F>
	> extends never
		? F
		: never,
	g: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F>,
		ReturnType<G>
	> extends never
		? G
		: never,
	h: Collisions<
		ReturnType<A> & ReturnType<B> & ReturnType<C> & ReturnType<D> & ReturnType<E> & ReturnType<F> & ReturnType<G>,
		ReturnType<H>
	> extends never
		? H
		: never,
	i: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H>,
		ReturnType<I>
	> extends never
		? I
		: never,
	j: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H> &
			ReturnType<I>,
		ReturnType<J>
	> extends never
		? J
		: never,
	k: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H> &
			ReturnType<I> &
			ReturnType<J>,
		ReturnType<K>
	> extends never
		? K
		: never,
	l: Collisions<
		ReturnType<A> &
			ReturnType<B> &
			ReturnType<C> &
			ReturnType<D> &
			ReturnType<E> &
			ReturnType<F> &
			ReturnType<G> &
			ReturnType<H> &
			ReturnType<I> &
			ReturnType<J> &
			ReturnType<K>,
		ReturnType<L>
	> extends never
		? L
		: never,
): ComposeReturn<
	Param1<A> &
		Param1<B> &
		Param1<C> &
		Param1<D> &
		Param1<E> &
		Param1<F> &
		Param1<G> &
		Param1<H> &
		Param1<I> &
		Param1<J> &
		Param1<K> &
		Param1<L>,
	ReturnType<A> &
		ReturnType<B> &
		ReturnType<C> &
		ReturnType<D> &
		ReturnType<E> &
		ReturnType<F> &
		ReturnType<G> &
		ReturnType<H> &
		ReturnType<I> &
		ReturnType<J> &
		ReturnType<K> &
		ReturnType<L>
>;

export function compose(...constructors: Array<Maker>) {
	return (state = {}) => {
		const x: { [s: string]: unknown } = {};

		for (const constructor of constructors)
			for (const [prop, value] of Object.entries(constructor(state)))
				if (prop in x) throw `Property collision at ${prop}!`;
				else x[prop] = value;

		return x;
	};
}

export default compose;
