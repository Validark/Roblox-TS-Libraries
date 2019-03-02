# Bezier

Used to create Bezier functions.

## API
```ts
import Bezier from "rbx-cubic-bezier";

const EasingFunc = new Bezier(0.17, 0.67, 0.83, 0.67);

EasingFunc(0) // 0
EasingFunc(0.5) // something in between
EasingFunc(1) // 1
```
Test and generate Bezier curves here at [cubic-bezier.com](http://cubic-bezier.com/) or at [greweb.me](http://greweb.me/bezier-easing-editor/example/)
Credit: Math borrowed from [here](https://github.com/gre/bezier-easing).
