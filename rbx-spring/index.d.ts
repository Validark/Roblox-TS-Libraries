/**
 * Simulates the motion of a critically damped spring
 * @original fractality
 * @editor Validark
 */

interface Spring<T> {
	// spring methods/properties
	dampingRatio: number;
	angularFrequency: number;
	goal: T;

	/**
	 * Use resetToPosition to set this value
	 */
	readonly position: T;
	readonly velocity: T;

	/**
	 * Sets the Spring position. Sets the Velocity to position * 0 to match the type
	 * @param position The position to set the Spring to. Sets the Velocity to position * 0 to match the type
	 */
	resetToPosition(position: T): this;

	/**
	 * The tick or stepping function for this spring.
	 * @param deltaTime the change in time since the last call
	 */
	update(deltaTime: number): this;
}

interface SpringConstructor {
	/**
	 * Creates a new critically damped spring.
	 * @param position The position to set the spring to
	 * @param angularFrequency The angular frequency of the spring
	 * @param goal The target of the Spring
	 * @param dampingRatio The damping ratio of the spring
	 */

	new <T>(position: T, angularFrequency?: number, goal?: T, dampingRatio?: number): Spring<T>;
}

declare const Spring: SpringConstructor;

export = Spring;
