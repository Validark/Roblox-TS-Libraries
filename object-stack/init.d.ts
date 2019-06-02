/** A Stack data structure which is formed by creating a singly linked-list on already existing objects.
 *
 * Simply allow a `previousNode` field in the Object type which can point to another object of the same type.
 */
declare class ObjectStack<
	T extends {
		previousNode?: T;
	}
> {
	/** The number of objects in the stack */
	public readonly size: number;

	/** The object at the top of the Stack */
	public readonly top?: T;

	/** Pushes a given element to the top of the stack.
	 * Writes to its `previousNode` property the object which was on top of the stack beforehand.
	 */
	public push(item: T): void;

	/** Removes the top element from the stack, and if it exists, returns it. */
	public pop(): T | undefined;

	/** Returns whether the Stack is empty. */
	public isEmpty(): boolean;

	/** Returns an iterator which iterates through the stack from top to bottom.
	 *
	 * For optimal use, one can copy and paste this for loop:
	 *
	 * ```ts
for (let current = this.top; current; current = current.previousNode)
```
	 */
	public iterate(): IterableIterator<T>;
}

export = ObjectStack;
