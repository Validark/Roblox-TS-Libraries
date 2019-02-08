/**
 * Simulates the motion of a critically damped spring
 * @author fractality
 */
declare class Spring<T> {
  constructor(
    position: T,
    goal?: T,
    dampingRatio?: number,
    angularFrequency?: number
  );

  public dampingRatio: number;
  public angularFrequency: number;
  public goal: T;
  public readonly position: T;
  public readonly velocity: T;

  public reset(position: T): this;
  public update(deltaTime: number): this;
}

export = Spring;
