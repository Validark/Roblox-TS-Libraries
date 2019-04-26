namespace Foo {
	export namespace Goo {
		export let n = 0;
	}
}
function f(b: boolean, n: number) {
	do {
		print("Go!");
	} while (((b ? 1 : 0) === 1 ? "1" : "0") === tostring(++n) ? ++n : undefined);

	const bar = b ? 10 : 100;

	function g(c: boolean) {
		while (c ? (n > 10 ? "n" : "b") : false) {
			print("go");
		}

		let i = 0;

		print(
			i,
			++i,
			i,
			(() => {
				print(i);
				return i++;
			})(),
			++i,
		);

		while (
			(() => {
				print(i);
				return i++;
			})() === ++i
		)
			print(i);
	}

	switch ((b ? "1" : "0") === "1") {
		case true:
			print("soup");
			break;
		case false:
			print("nope");
			break;
		default:
			print("Oop");
	}
}

namespace Foo {
	export let j = [1, 2];
	export let k = [3, 4];
	for (const i of true ? j : k) print(i);
}

export let fee = [1, 2];
for (const i of fee) print(i);

// print((k = j = ++i) === 2 ? (i++ + i - ++i === 2 ? "1" : "2") : "3");

// print(i++ > 10 ? 1 : 0, (j = k = ++i), i++);

// let foo: number;
// print((foo = 1));
// const { floor, ceil } = math;
// const x = 1;

// for (let c = 1; c >= -1; c -= 2) {
// 	print(c);
// 	const a = floor(11 + x * (4 - 2 * c - 11));
// 	const d = c === 1 ? 15 : -4;
// }

// let numA = 0;
// let numB = 0;
// function d(bool: boolean) {
// 	return d ? numA++ : numB++;
// }

// const foo = {
// 	a: 0,
// };

// const and1 = ++numB;
// const and2 = numB++;
// // const noneya = foo.a++;

// namespace Foo {
// 	export namespace Doo {
// 		export let a = 1;
// 	}
// 	export const f = 1;
// }

// namespace Foo {
// 	print(Doo);
// 	namespace Q {
// 		print(Doo, f);
// 	}

// 	export namespace Doo {
// 		print(Doo);
// 	}
// }

// const f2 = ++numA;

// function f(bool: boolean, bool2: boolean = false) {
// 	return bool ? (bool2 ? numItems++ : 1) : bool2 ? 2 : 3;
// }

// function h(bool: boolean) {
// 	return bool ? numItems++ : numItems--;
// }
// const lel = (bool: boolean) => (bool ? 1 : 0);

// f(true);
// lel(true);

// let numItems = 0;
// numItems++;
// numItems--;
// --numItems;
// const xy = -++numItems;

// function g(a: number, b: number, c: number, d: number) {
// 	return a + b + c + d;
// }

// g(numItems++, numItems--, --numItems, ++numItems);
// let x: number;
// let y: number;
// let z: number = 1;
// x = y = z;

// let i = 0;
// print(i++, i === 10 ? i++ : ++i);
