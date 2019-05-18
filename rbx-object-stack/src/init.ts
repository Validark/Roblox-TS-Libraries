/** A Stack data structure which is formed by creating a singly linked-list on already existing objects.
 *
 * Simply allow a `previousNode` field in the Object type which can point to another object of the same type.
 */
class ObjectStack<
	T extends {
		previousNode?: T;
	}
> {
	/** The number of objects in the stack */
	public size: number = 0;

	/** The object at the top of the Stack */
	public top?: T;

	/** Pushes a given element to the top of the stack.
	 * Writes to its `previousNode` property the object which was on top of the stack beforehand.
	 */
	public push(item: T) {
		this.size++;
		item.previousNode = this.top;
		this.top = item;
	}

	/** Removes the top element from the stack, and if it exists, returns it. */
	public pop() {
		const { top } = this;

		if (top) {
			this.size--;
			this.top = top.previousNode;
			return top;
		}
	}

	/** Returns whether the Stack is empty. */
	public isEmpty() {
		return this.top ? false : true;
	}

	/** Returns an iterator which iterates through the stack from top to bottom.
	 *
	 * For optimal use, one can copy and paste the for loop contained in this function.
	 */
	public *iterate() {
		for (let current = this.top; current; current = current.previousNode) yield current;
	}
}

export = ObjectStack;
