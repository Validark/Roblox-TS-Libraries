/**
 * Simulates the motion of a critically damped spring
 */
declare class Spring {
  constructor(
    dampingRatio: number,
    frequency: number,
    position: number | Vector3
  );
}
