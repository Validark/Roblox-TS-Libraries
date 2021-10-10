/** A polling class that continually calls a callback in sync with os.time.
 * If a condition is provided, it will call the callback on each poll, and cancel if it returns false
 */
declare class SyncedPoller {
    isRunning: boolean;
    /**
     * @param interval How often to call the callback.
     * @param callback The callback to call.
     * @param condition If provided, will call this on every poll, and will cancel the synced-poller if it returns false.
     */
    constructor(interval: number, callback: () => void, condition?: () => boolean);
    cancel(): void;
}
export = SyncedPoller;
