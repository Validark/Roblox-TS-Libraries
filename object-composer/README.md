## object-composer

object-composer ships a single `compose` function, which combines a series of callbacks which each return an object, into a single function which returns the combination of all returned objects. Each callback function can optionally take a single `state` parameter, with the defined properties that one should be able to (or need to) pass into the callback during  object construction. Property-Collisions error at compile-time and run-time. If TypeScript underlines one of your object constructors and says it isn't assignable to `never`, that's because there is a property/method collision.

Here is a demo, taking inspiration from this video: https://youtu.be/wfMtDGfHWpA

```ts
export {};
import compose from "@rbxts/object-composer";

const Pooper = () => ({
	poops: 0,
	poop() {
		this.poops++;
	},
});

const Barker = ({ name }: { name: string }) => ({
	bark() {
		print(`Woof, I am ${name}`);
	},
});

const Driver = ({ position: _position = 0, speed: _speed = 0 }) => ({
	/** @private */
	_position,
	/** @private */
	_speed,
	drive() {
		return (this._position += this._speed);
	},
});

const Killer = () => ({
	kills: 0,
	kill<T extends { kills: number }>(this: T, target: { TakeDamage(amount: number): void }) {
		target.TakeDamage(1 / 0);
		this.kills++;
		return this; // returns the full `this`, not just the `Killer` this
	},
});

type CleaningRobot = ReturnType<typeof CleaningRobot>;
const CleaningRobot = compose(
	Driver,
	() => ({
		clean() {},
	}),
);

type MurderousRobot = ReturnType<typeof MurderousRobot>;
const MurderousRobot = compose(
	Driver,
	Killer,
);

type Dog = ReturnType<typeof Dog>;
const Dog = compose(
	Pooper,
	Barker,
);

type MurderousRobotDog = ReturnType<typeof MurderousRobotDog>;
const MurderousRobotDog = compose(
	Barker,
	Driver,
	Killer,
);

// We don't need a state argument for this construction, since there are defaults for every property in Driver and Killer
const robot = MurderousRobot();

// Error! We need a state argument here, since `name` is required
const dog = Dog();

// Good!
const dog2 = Dog({ name: "pup" });
dog2.bark();

MurderousRobotDog({
	position: 10,
	speed: 30,
	name: "Mr. Wolf",
});

MurderousRobotDog({
	name: "Hello", // We don't need speed or position arguments, since those have defaults
});

// With the above pattern, you can use `Dog` as a type
function f(o: Dog) {
	o.bark();
}
```

A cool feature of TypeScript is that you can define the `this` property to make compile-time checks on the call site. For example, if you wanted to define a method that should only work if called on an object with a particular property, you can do that as well. With proper object composition you shouldn't need to do this, but I thought it was cool regardless.

```ts
export {};
import compose from "@rbxts/object-composer";

const ToStringHaver = () => ({
	toString(): string {
		let result = "{\n";
		for (const [prop, value] of Object.entries(this)) result += `\t${prop}: ${value},\n`;
		return result + "\n}";
	},
});

const ThemeHaver = ({ theme: _theme = "Light" }: { theme?: "Light" | "Dark" }) => ({
	/** @private */
	_theme,

	/** Get the theme. */
	getTheme() {
		return this._theme;
	},

	/** Set the theme. */
	setTheme<T extends { _theme: NonNullable<typeof _theme> }>(this: T, theme: NonNullable<typeof _theme>) {
		this._theme = theme;
		return this;
	},
});

const SizeHaver = ({ size: _size = new Vector3() }) => ({
	/** @private */
	_size,

	/** Get the size property. */
	getSize() {
		return this._size;
	},

	/** Set the size property. */
	setSize<T extends { _size: Vector3 }>(this: T, size: Vector3) {
		this._size = size;
		return this;
	},

	/** Gets the TextSize, if it exists */
	getTextSize<T extends { _size: Vector3; _text: string }>(this: T) {
		const { X, Y } = this._size;
		return new Vector2(this._text.size() * X, Y);
	},
});

const TextHaver = ({ text: _text = "" }) => ({
	/** @private */
	_text,

	/** Get the text property. */
	getText() {
		return this._text;
	},

	/** Set the text property. */
	setText<T extends { _text: string }>(this: T, text: string) {
		this._text = text;
		return this;
	},
});

const TextObject = compose(
	ToStringHaver,
	ThemeHaver,
	SizeHaver,
	TextHaver,
);

const text = TextObject();

// By typing `this` as the full call location on each `set` function, we can chain!
text.setSize(new Vector3())
	.setText("Hello")
	.setTheme("Dark");

text.getTextSize();

const SizedTheme = compose(
	SizeHaver,
	ThemeHaver,
);
const sizedTheme = SizedTheme();

// error! sizedTheme does not have a `_text` property!
sizedTheme.getTextSize();
```

###### Note: Index signatures are not unsupported, but they aren't "supported" either. TypeScript may only error at run-time if you use index signatures (and why would you do that? Just use a Map)
