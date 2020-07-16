import { delay as delayed } from "@rbxts/delay-spawn-wait";

/** The difference in seconds between os.time() and os.clock().
 * With this, we can use `os.clock() + timeDifferential` as a more precise os.time()
 */
let timeDifferential: number;

{
	const targetTime = os.time() + 1;
	while (os.time() !== targetTime);
	timeDifferential = targetTime - os.clock();
}

/** A polling class that continually calls a callback in sync with os.time.
 * If a condition is provided, it will call the callback on each poll, and cancel if it returns false
 */
class SyncedPoller {
	public isRunning = true;

	/**
	 * @param interval How often to call the callback.
	 * @param callback The callback to call.
	 * @param condition If provided, will call this on every poll, and will cancel the synced-poller if it returns false.
	 */
	constructor(interval: number, callback: (timeElapsed: number) => void, condition?: () => boolean) {
		const recall = (timeElapsed: number) => {
			if (this.isRunning) {
				if (condition === undefined || condition()) {
					callback(timeElapsed);
					delayed(interval - ((os.clock() + timeDifferential) % interval), recall);
				} else {
					this.isRunning = false;
				}
			}
		};

		delayed(interval - ((os.clock() + timeDifferential) % interval), recall);
	}

	public cancel() {
		this.isRunning = false;
	}
}

export = SyncedPoller;
