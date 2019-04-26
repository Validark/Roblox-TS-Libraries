/// <reference types="rbx-types" />
declare class Signal<T = () => void, P = false> {
    private bindable;
    /**
     * Fires the BindableEvent with any number of arguments
     * @param args
     */
    Fire(...args: FunctionArguments<T>): void;
    /**
     * Connects a callback to BindableEvent.Event
     * @param callback The callback to connect to BindableEvent.Event
     */
    Connect<O extends Array<unknown> = FunctionArguments<T>>(callback: P extends true ? (FunctionArguments<T> extends Array<unknown> ? (...args: O) => void : T) : T): RBXScriptConnection;
    /**
     * Yields the current thread until the thread is fired.
     */
    Wait(): FunctionArguments<T>;
    /**
     * Destroys the Signal
     */
    Destroy(): void;
}
declare type InternalCheckedSignal = Signal<(isChecked: boolean) => void, false>;
declare type CheckedSignal = Unpick<Signal<(isChecked: boolean) => void, false>, "Fire">;
declare class Checkbox {
    Checked: CheckedSignal;
    SetChecked(checked: boolean): void;
}
declare function Make<T extends keyof Instance>(className: T, props: Optional<GetProperties<Instances[T]>>): void;
