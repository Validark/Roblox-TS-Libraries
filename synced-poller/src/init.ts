/** The difference in seconds between os.time() and tick(), rounded to the nearest 15 minutes */
const timeDifferential = math.floor((tick() - os.time()) / 900 + 0.5) * 900;

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
	constructor(
		interval: number,
		callback: (timeElapsed: number, gameTime: number) => void,
		condition?: () => boolean,
	) {
		const recall = (timeElapsed: number, gameTime: number) => {
			if (condition) this.isRunning = condition();
			if (this.isRunning) {
				callback(timeElapsed, gameTime);
				delay(interval - ((tick() + timeDifferential) % interval), recall);
			}
		};

		delay(interval - ((tick() + timeDifferential) % interval), recall);
	}

	public cancel() {
		this.isRunning = false;
	}
}

export = SyncedPoller;
