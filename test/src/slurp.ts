function* arrayIterator<T>(arr: Array<T>): IterableIterator<T> {
	for (const v of arr) yield v;
}

const array4 = [10, 20, undefined, 30];
const it4 = arrayIterator(array4);
console.log(...it4);

const lel = it4.next();
if (lel.done) {
	const v = lel.value;
} else {
	const v = lel.value;
}

for (const i of it4) console.log(i);
