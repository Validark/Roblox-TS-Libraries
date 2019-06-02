# EasingFunctions

A bunch of reuseable Easing Functions, including those from the Material Design specification ([Standard, Acceleration, and Deceleration](https://material.io/design/motion/speed.html#easing))

These are the available EasingFunctions:

|   Directionless  |     In    |     Out    |     InOut    |     OutIn    |
|:----------------:|:---------:|:----------:|:------------:|:------------:|
|      Linear      |   InQuad  |   OutQuad  |   InOutQuad  |   OutInQuad  |
|      Spring      |  InCubic  |  OutCubic  |  InOutCubic  |  OutInCubic  |
|    SoftSpring    |  InQuart  |  OutQuart  |  InOutQuart  |  OutInQuart  |
|      RevBack     |  InQuint  |  OutQuint  |  InOutQuint  |  OutInQuint  |
| RidiculousWiggle |   InSine  |   OutSine  |   InOutSine  |   OutInSine  |
|      Smooth      |   InExpo  |   OutExpo  |   InOutExpo  |   OutInExpo  |
|     Smoother     |   InCirc  |   OutCirc  |   InOutCirc  |   OutInCirc  |
|   Acceleration   | InElastic | OutElastic | InOutElastic | OutInElastic |
|   Deceleration   |   InBack  |   OutBack  |   InOutBack  |   OutInBack  |
|       Sharp      |  InBounce |  OutBounce |  InOutBounce |  OutInBounce |
|     Standard     |

Signature:

```ts
/**
 * Returns a value between [initialValue, initialValue + changeInValue] or [0, 1] that represents an in-between value
 * along a Bezier curve.
 * @param elapsedTime the time elapsed [0, d]
 * @param initialValue beginning value being interpolated (default = 0)
 * @param changeInValue change in value being interpolated (equivalent to: ending - beginning) (default = 1)
 * @param totalDuration duration interpolation is occurring over (default = 1)
 */
type BasicEasingFunction = (
	elapsedTime: number,
	initialValue: number,
	changeInValue: number,
	totalDuration: number,
) => number;
```

Some functions have an extra parameter or two. These will either be the amplitude and period or the overshoot.
