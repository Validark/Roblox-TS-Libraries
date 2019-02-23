# Weighted Random Picker

Generates option-picker functions from relative probabilities:

```ts
// When relative probabilities are not provided, it gives equal weight to each option
const CoinFlip = RandomPicker(["Heads", "Tails"])

print(CoinFlip()) // "Heads"
print(CoinFlip()) // "Tails"

const DiceRoll = RandomPicker([1, 2, 3, 4, 5, 6])

const CoinFlipOrDiceRoll = RandomPicker(
	// calls CoinFlip over DiceRoll at a 3:1 ratio
	// in other words, CoinFlip gets set to 0.75, DiceRoll becomes 0.25
	[CoinFlip, DiceRoll],
	[       3,        1]
)

CoinFlipOrDiceRoll()() // 1
CoinFlipOrDiceRoll()() // Heads
CoinFlipOrDiceRoll()() // 5
```
