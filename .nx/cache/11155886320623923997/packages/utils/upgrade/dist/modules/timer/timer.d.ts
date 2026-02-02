import type { Timer as TimerInterface } from './types';
export declare class Timer implements TimerInterface {
    private interval;
    constructor();
    get elapsedMs(): number;
    get end(): number | null;
    get start(): number;
    stop(): number;
    reset(): this;
}
export declare const timerFactory: () => Timer;
//# sourceMappingURL=timer.d.ts.map