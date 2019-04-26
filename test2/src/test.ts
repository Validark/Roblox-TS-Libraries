class Signal<T = () => void, P = false> {
	private bindable: BindableEvent = new Instance("BindableEvent");
	/**
	 * Fires the BindableEvent with any number of arguments
	 * @param args
	 */
	public Fire(...args: FunctionArguments<T>): void {
		this.bindable.Fire(() => args);
	}

	/**
	 * Connects a callback to BindableEvent.Event
	 * @param callback The callback to connect to BindableEvent.Event
	 */
	public Connect<O extends Array<unknown> = FunctionArguments<T>>(
		callback: P extends true ? (FunctionArguments<T> extends Array<unknown> ? (...args: O) => void : T) : T,
	): RBXScriptConnection {
		return this.bindable.Event.Connect((getStack: unknown) => {
			callback(...(getStack as () => Array<unknown>)());
		});
	}

	/**
	 * Yields the current thread until the thread is fired.
	 */
	public Wait(): FunctionArguments<T> {
		return this.bindable.Event.Wait()();
	}

	/**
	 * Destroys the Signal
	 */
	public Destroy(): void {
		this.bindable.Destroy();
	}
}

type InternalCheckedSignal = Signal<(isChecked: boolean) => void, false>;
type CheckedSignal = Unpick<Signal<(isChecked: boolean) => void, false>, "Fire">;

class Checkbox {
	public Checked: CheckedSignal = new Signal<(isChecked: boolean) => void>();

	public SetChecked(checked: boolean) {
		(this.Checked as InternalCheckedSignal).Fire(true);
	}
}

new Checkbox().SetChecked(false);

function Make<T extends keyof Instance>(className: T, props: Optional<GetProperties<Instances[T]>>) {}

Make("TextLabel", {
	Text = "Attack",
});
