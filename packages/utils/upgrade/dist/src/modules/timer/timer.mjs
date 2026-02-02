class Timer {
    get elapsedMs() {
        const { start, end } = this.interval;
        return end ? end - start : Date.now() - start;
    }
    get end() {
        return this.interval.end;
    }
    get start() {
        return this.interval.start;
    }
    stop() {
        this.interval.end = Date.now();
        return this.elapsedMs;
    }
    reset() {
        this.interval = {
            start: Date.now(),
            end: null
        };
        return this;
    }
    constructor(){
        this.reset();
    }
}
const timerFactory = ()=>new Timer();

export { Timer, timerFactory };
//# sourceMappingURL=timer.mjs.map
