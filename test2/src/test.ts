type InternalCheckedSignal = Signal<(isChecked: boolean) => void, false>;
type CheckedSignal = Unpick<Signal<(isChecked: boolean) => void, false>, "Fire">;

class Checkbox {
	public OnChecked: CheckedSignal = new Signal<(isChecked: boolean) => void>();

	public SetChecked(checked: boolean) {
		(this.OnChecked as InternalCheckedSignal).Fire(true);
	}
}

new Checkbox().SetChecked(false);
const checkbox = new Checkbox();
const [foo] = checkbox.OnChecked.Wait();
