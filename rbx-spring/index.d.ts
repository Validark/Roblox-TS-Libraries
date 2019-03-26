/**
 * Simulates the motion of a critically damped spring
 * @original fractality
 * @editor Validark
 */

interface Spring<T> {
	// spring methods/properties
	dampingRatio: number;
	angularFrequency: number;

	/** The value the spring makes its way towards */
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
	 * @returns position
	 */
	update(deltaTime: number): T;
}

/**
 * Creates a new critically damped spring.
 * @param position The position to set the spring to
 * @param angularFrequency The angular frequency of the spring
 * @param goal The target of the Spring
 * @param dampingRatio The damping ratio of the spring
 */
declare const Spring: new <T>(position: T, angularFrequency?: number, goal?: T, dampingRatio?: number) => Spring<T>;

export = Spring;
