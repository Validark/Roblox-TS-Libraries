"use strict";
function* arrayIterator(arr) {
    for (const v of arr)
        yield v;
}
const array4 = [10, 20, undefined, 30];
const it4 = arrayIterator(array4);
console.log(...it4);
for (const i of it4)
    console.log(i);
